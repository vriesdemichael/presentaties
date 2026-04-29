/**
 * gemma-describe.js
 * Processes every image embedded in the re-crawled markdown pages.
 * For each target image, sends a sliding window of ±WINDOW_RADIUS neighboring
 * images as visual context alongside the page markdown to Gemma 4 via LM Studio.
 * Writes > [!visual] descriptions back inline into the markdown files.
 *
 * Designed to run overnight: fully resumable, retries, graceful shutdown.
 *
 * Prerequisites:
 *   - LM Studio running with google/gemma-4-26b-a4b loaded
 *   - Run recrawl-with-images.js first
 *
 * Usage:
 *   node gemma-describe.js
 *   LMS_URL=http://localhost:1234 node gemma-describe.js
 */

const fs   = require('fs');
const path = require('path');
const http = require('http');

const PAGES_DIR     = 'C:\\Users\\vries\\Documents\\huisstijl-reference\\pages';
const IMAGES_DIR    = 'C:\\Users\\vries\\Documents\\huisstijl-reference\\images';
const PROGRESS_FILE = 'C:\\Users\\vries\\Documents\\huisstijl-reference\\gemma-progress.json';
const LOG_FILE      = 'C:\\Users\\vries\\Documents\\huisstijl-reference\\gemma-describe.log';
const BROKEN_DESCRIPTION_RE = /<unused\d+>|<\|channel\>thought/i;

const LMS_URL      = process.env.LMS_URL    || 'http://localhost:1234';
const LMS_MODEL    = process.env.LMS_MODEL  || 'unsloth/gemma-4-26b-a4b-it';
const JOB_LIMIT    = Number(process.env.JOB_LIMIT || 0);
const PAGE_FILTER  = (process.env.PAGE_FILTER || '').trim();
const SHUFFLE_JOBS  = /^(1|true|yes)$/i.test(process.env.SHUFFLE_JOBS || '');
const SHUFFLE_SEED  = Number(process.env.SHUFFLE_SEED || 1337);
const WINDOW_RADIUS = 2;    // images before+after the target (total window = 2R+1 = 5)
const MAX_RETRIES   = 3;
const RETRY_DELAY   = 8000;  // ms between retries
const CALL_DELAY    = 1000;  // ms between successful calls
const TIMEOUT_MS    = 240000; // 4 min per image (generous for local GPU)
const MARKDOWN_CAP  = 12000;  // chars of local markdown context to include in prompt
const CONTEXT_LINES = 40;     // lines before/after target image for local section context

const SYSTEM_PROMPT = `Je bent een assistent die afbeeldingen beschrijft voor AI-taakmodellen die geen afbeeldingen kunnen zien.

Je krijgt een lokale markdownsectie van een pagina uit de Belastingdienst huisstijlgids, plus een reeks opeenvolgende afbeeldingen van die pagina. Eén afbeelding is aangemerkt als DOELAFBEELDING.

Redeneer eerst intern over wat de sectie probeert duidelijk te maken aan de lezer, welke rol de DOELAFBEELDING daarin speelt, en welke visuele informatie verloren zou gaan als een later model alleen jouw beschrijving leest. Gebruik de context-afbeeldingen en markdown om de plaats van de DOELAFBEELDING in het verhaal te begrijpen, maar baseer visuele claims alleen op wat echt zichtbaar is.

Focus op:
- Wat de afbeelding functioneel toevoegt aan de omliggende tekst of sectie
- Zichtbare specificaties: kleuren, verhoudingen, marges, groottes, uitlijning, compositie, hiërarchie
- Of dit een correct voorbeeld, incorrect voorbeeld, of een do/don't-vergelijking is
- Visuele patronen, stijlkeuzes of regels die een agent nodig heeft om hetzelfde resultaat te produceren
- Tekst die zichtbaar is in de afbeelding maar niet in de markdown
- Details die een model opnieuw zou moeten zien als jij ze niet expliciet beschrijft

Regels:
- Beschrijf eerst letterlijk wat zichtbaar is, daarna pas wat dat betekent voor de richtlijn
- Trek geen conclusie over verhoudingen, kleuren of intentie als die niet duidelijk zichtbaar is
- Als de afbeelding een kleine teaser, thumbnail of lage-resolutie weergave is, zeg dat expliciet en claim geen details die niet leesbaar zijn
- Behandel thumbnails en teaserbeelden als previews van een onderwerp, niet als bewijs voor specifieke ontwerpregels die je niet letterlijk kunt zien
- Koppel een thumbnail eerst aan de huidige sectiekop, niet aan naburige secties
- Als de afbeelding abstract of layout-gericht is, beschrijf dan eerst de geometrie: aantal vlakken, relatieve grootte, positie op het vlak, uitlijning, marges en negatieve ruimte
- Benoem een sectienaam of ontwerpelement pas nadat je de zichtbare compositie hebt beschreven, en alleen als die koppeling door de huidige sectie of beeldinhoud wordt ondersteund
- Als de afbeelding te abstract, te klein of te sterk ingezoomd is om het ontwerpelement zeker te herkennen, zeg dat expliciet
- Herhaal de markdown niet; benoem alleen wat de afbeelding extra duidelijk maakt
- Als de DOELAFBEELDING puur decoratief is of al volledig door de omliggende tekst wordt uitgelegd: antwoord alleen met null

Geef uitsluitend de beschrijving (of null). Geen inleiding, geen bullets, geen uitleg over je werkwijze. Maximaal 4 zinnen.`;

// ─── Utilities ────────────────────────────────────────────────────────────────

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  }
  return {};
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf8');
}

function cleanDescriptionOutput(description) {
  return description
    .replace(/\n+/g, ' ')
    .replace(/^> \[!visual\]\s*/i, '')
    .trim();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  return { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
           '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml' }[ext] || 'image/jpeg';
}

function toDataUrl(filename) {
  const buf = fs.readFileSync(path.join(IMAGES_DIR, filename));
  return `data:${mimeType(filename)};base64,${buf.toString('base64')}`;
}

function extractLocalMarkdownContext(pageFile, lineIndex) {
  const lines = fs.readFileSync(path.join(PAGES_DIR, pageFile), 'utf8').split('\n');
  const start = Math.max(0, lineIndex - CONTEXT_LINES);
  const end = Math.min(lines.length - 1, lineIndex + CONTEXT_LINES);
  const header = lines.slice(0, 4).filter(Boolean).join('\n');
  const localSection = lines
    .slice(start, end + 1)
    .filter(line => !line.startsWith('> [!visual]'))
    .join('\n')
    .trim();

  return `${header}\n\nLokale sectie rond de doelafbeelding:\n\n${localSection}`.slice(0, MARKDOWN_CAP);
}

function extractSectionHeading(pageFile, lineIndex) {
  const lines = fs.readFileSync(path.join(PAGES_DIR, pageFile), 'utf8').split('\n');
  for (let i = lineIndex; i >= 0; i--) {
    const line = lines[i].replace(/\r$/, '');
    const match = line.match(/^#{1,6}\s+(.+)$/);
    if (match) return match[1].trim();
  }
  return '';
}

function classifyImageType(job, sectionHeading) {
  const name = `${job.filename} ${sectionHeading || ''}`.toLowerCase();
  if (/thumb/.test(name)) return 'thumbnail';
  if (/infographic|schema|diagram|stappenplan|flowchart|pie|grafiek/.test(name)) return 'diagram';
  if (/kleur|staal|swatch|palette|tint|kleurgebruik/.test(name)) return 'swatch';
  if (/merktegel|vlakverdeling|layout|grid|compositie/.test(name)) return 'abstract-layout';
  return 'detail';
}

function getWindowRadiusForJob(job) {
  return /thumb/i.test(job.filename) ? 0 : WINDOW_RADIUS;
}

function createSeededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function shuffleArray(items, seed) {
  const random = createSeededRandom(seed);
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ─── Build page image index from markdown ─────────────────────────────────────

/**
 * For a given markdown file, returns all image entries in DOM order:
 *   [{ filename, lineIndex, hasVisual }]
 */
function getPageImages(lines) {
  const images = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].replace(/\r$/, '');
    const nextLine = (lines[i + 1] || '').replace(/\r$/, '');
    const match = line.match(/^!\[([^\]]*)\]\(\.\.\/images\/([^)]+)\)$/);
    if (!match) continue;
    const filename = match[2];
    if (!fs.existsSync(path.join(IMAGES_DIR, filename))) continue;
    images.push({ filename, lineIndex: i, hasVisual: nextLine.startsWith('> [!visual]') });
  }
  return images;
}

/**
 * Returns array of jobs across all pages.
 * Each job carries the full image list for its page (needed for sliding window).
 */
function buildJobQueue() {
  const jobs = [];
  const files = fs.readdirSync(PAGES_DIR)
    .filter(f => f.endsWith('.md') && !f.startsWith('_'))
    .filter(f => !PAGE_FILTER || f.includes(PAGE_FILTER))
    .sort();

  for (const file of files) {
    const filePath = path.join(PAGES_DIR, file);
    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    const pageImages = getPageImages(lines);

    for (let idx = 0; idx < pageImages.length; idx++) {
      const img = pageImages[idx];
      if (img.hasVisual) continue; // already described

      jobs.push({
        pageFile: file,
        filename: img.filename,
        lineIndex: img.lineIndex,
        pageImageIndex: idx,       // position within this page's image list
        pageImageCount: pageImages.length,
        pageImages,                // full ordered list for sliding window
        jobKey: `${file}::${idx}::${img.filename}`,
      });
    }
  }

  return jobs;
}

// ─── LM Studio API (OpenAI-compatible) ────────────────────────────────────────

function lmstudioChat(systemPrompt, contentParts) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: LMS_MODEL,
      stream: false,
      temperature: 0.2,
      max_tokens: 4096, // allow thinking + concise answer; brevity is enforced via system prompt
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: contentParts },
      ],
    });

    const url = new URL('/v1/chat/completions', LMS_URL);
    const options = {
      hostname: url.hostname,
      port: url.port || 1234,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = http.request(options, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          // Gemma 4 in thinking mode: final answer in content, reasoning in reasoning_content.
          // If content is empty (thinking exhausted tokens before answer), fall back to reasoning_content.
          const content = (parsed?.choices?.[0]?.message?.content?.trim()
            || parsed?.choices?.[0]?.message?.reasoning_content?.trim()
            || '');
          if (!content && parsed?.error) reject(new Error(parsed.error.message || JSON.stringify(parsed.error)));
          else resolve(content);
        } catch (e) {
          reject(new Error(`JSON parse failed: ${data.slice(0, 300)}`));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(TIMEOUT_MS, () => {
      req.destroy();
      reject(new Error('LM Studio request timed out'));
    });

    req.write(body);
    req.end();
  });
}

// ─── Process a single image with sliding window ────────────────────────────────

async function describeImage(job, pageContext, sectionHeading) {
  const { pageImages, pageImageIndex } = job;
  const windowRadius = getWindowRadiusForJob(job);
  const imageType = classifyImageType(job, sectionHeading);

  // Build sliding window: up to WINDOW_RADIUS images before and after the target
  const windowStart = Math.max(0, pageImageIndex - windowRadius);
  const windowEnd   = Math.min(pageImages.length - 1, pageImageIndex + windowRadius);
  const window      = pageImages.slice(windowStart, windowEnd + 1);
  const targetInWindow = pageImageIndex - windowStart; // 0-based index of target within window

  // Build the multimodal content array for the user message.
  // The target image comes first to maximize focus; context images follow.
  const contentParts = [];

  contentParts.push({
    type: 'text',
    text:
      `DOELAFBEELDING: focus primair op de eerstvolgende afbeelding.\n` +
      `Gebruik de andere afbeeldingen alleen als context om te bepalen hoe deze afbeelding in de reeks en in de richtlijn past.\n` +
      `Beeldtype-inschatting: ${imageType}.`,
  });

  contentParts.push({
    type: 'image_url',
    image_url: { url: toDataUrl(pageImages[pageImageIndex].filename) },
  });

  // Add context images around the target in reading order, excluding the target itself.
  for (let i = 0; i < window.length; i++) {
    if (i === targetInWindow) continue;
    contentParts.push({
      type: 'text',
      text: `Contextafbeelding ${i + 1} van ${window.length} (${window[i].filename}):`,
    });
    contentParts.push({
      type: 'image_url',
      image_url: { url: toDataUrl(window[i].filename) },
    });
  }

  contentParts.push({
    type: 'text',
    text:
      (sectionHeading
        ? `De DOELAFBEELDING hoort bij de sectie "${sectionHeading}". Gebruik die sectie als primaire interpretatie van de preview.\n`
        : '') +
      `Gedraag je passend bij het beeldtype "${imageType}":\n` +
      `- thumbnail: beschrijf zichtbare preview, geen stellige ontwerpclaim\n` +
      `- abstract-layout: beschrijf geometrie, verhoudingen, positie, marges en negatieve ruimte\n` +
      `- swatch: beschrijf de kleurstaal en eventuele zichtbare labels\n` +
      `- diagram/detail: beschrijf zichtbare structuur, labels en relaties zo concreet mogelijk\n\n` +
      `Verwijs niet naar andere secties tenzij die relatie letterlijk zichtbaar is in de afbeelding zelf.\n\n` +
      `Lokale markdowncontext:\n\n---\n${pageContext}\n---\n\n` +
      `De DOELAFBEELDING is de eerste bijgevoegde afbeelding in dit bericht. ` +
      `De overige ${window.length - 1} afbeeldingen zijn alleen context uit dezelfde reeks. ` +
      `In de oorspronkelijke leesvolgorde stond de doelafbeelding op positie ${targetInWindow + 1} van ${window.length}.`,
  });

  contentParts.push({
    type: 'text',
    text:
      'Beschrijf nu alleen de DOELAFBEELDING. Benoem wat een later model opnieuw zou moeten zien als deze beschrijving ontbreekt. ' +
      'Als details niet leesbaar of niet zeker zijn, zeg dat expliciet. Antwoord anders alleen met null als de afbeelding decoratief of volledig redundant is.',
  });

  return lmstudioChat(SYSTEM_PROMPT, contentParts);
}

// ─── Backport description into markdown file ───────────────────────────────────

function writeDescription(job, description) {
  const filePath = path.join(PAGES_DIR, job.pageFile);
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');

  // Re-find the target line by filename (robust to prior insertions shifting indices)
  let insertions = 0;
  let targetLine = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].replace(/\r$/, '');
    const nextLine = (lines[i + 1] || '').replace(/\r$/, '');
    const match = line.match(/^!\[([^\]]*)\]\(\.\.\/images\/([^)]+)\)$/);
    if (!match || match[2] !== job.filename) continue;
    if (!nextLine.startsWith('> [!visual]')) {
      // This occurrence not yet described
      if (insertions === 0) { targetLine = i; break; }
      insertions--;
    }
  }

  if (targetLine === -1) {
    log(`  [WARN] Could not find insertion point for ${job.filename} in ${job.pageFile}`);
    return false;
  }

  lines.splice(targetLine + 1, 0, `> [!visual] ${description}`);
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  return true;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  log('=== gemma-describe.js starting ===');
  log(`Model: ${LMS_MODEL} @ ${LMS_URL}`);
  log(`Sliding window: ±${WINDOW_RADIUS} images around target`);
  if (JOB_LIMIT > 0) log(`Job limit: ${JOB_LIMIT}`);
  if (PAGE_FILTER) log(`Page filter: ${PAGE_FILTER}`);
  if (SHUFFLE_JOBS) log(`Shuffle jobs: enabled (seed ${SHUFFLE_SEED})`);

  // Verify LM Studio is reachable with a minimal text-only ping
  try {
    const result = await lmstudioChat('Reply with: ok', [{ type: 'text', text: 'ping' }]);
    log(`LM Studio reachable ✓ (response: "${result.slice(0, 30)}")`);
  } catch (err) {
    log(`ERROR: Cannot reach LM Studio — ${err.message}`);
    log('Make sure LM Studio is running with the model loaded.');
    process.exit(1);
  }

  const progress = loadProgress();
  log(`Loaded progress: ${Object.keys(progress).length} previously processed jobs`);

  log('Building job queue from markdown files...');
  const allJobs = buildJobQueue();

  // The markdown corpus is the source of truth: if an image still has no
  // visual block, rerun it unless it was explicitly classified as decorative.
  const pendingAll = allJobs.filter(j => {
    const p = progress[j.jobKey];
    return p !== 'skipped';
  });
  const pendingPool = SHUFFLE_JOBS ? shuffleArray(pendingAll, SHUFFLE_SEED) : pendingAll;
  const pending = JOB_LIMIT > 0 ? pendingPool.slice(0, JOB_LIMIT) : pendingPool;
  const alreadyDone = allJobs.length - pendingAll.length;

  log(`Total images needing description: ${allJobs.length}`);
  log(`Already processed: ${alreadyDone}`);
  log(`Pending total: ${pendingAll.length}`);
  log(`Pending this run: ${pending.length}`);

  if (pending.length === 0) {
    log('Nothing to do. All images have descriptions.');
    return;
  }

  let done = 0, skipped = 0, errors = 0;
  let shuttingDown = false;

  // ETA tracking: rolling window of recent per-image durations (last 20)
  const recentDurations = [];
  const ETA_WINDOW = 20;
  const runStart = Date.now();

  function logProgress(elapsed, jobIndex) {
    const processed = done + skipped + errors;
    recentDurations.push(elapsed);
    if (recentDurations.length > ETA_WINDOW) recentDurations.shift();

    const avgSec = recentDurations.reduce((a, b) => a + b, 0) / recentDurations.length;
    const remaining = pending.length - processed;
    const etaSec = remaining * avgSec;
    const etaStr = etaSec < 3600
      ? `${Math.round(etaSec / 60)}m`
      : `${(etaSec / 3600).toFixed(1)}h`;
    const totalElapsed = ((Date.now() - runStart) / 1000 / 60).toFixed(1);

    return `[${processed}/${pending.length}] ${elapsed.toFixed(1)}s (avg ${avgSec.toFixed(0)}s/img, eta ~${etaStr}, elapsed ${totalElapsed}m)`;
  }
  process.on('SIGINT', () => {
    log('\nSIGINT received — finishing current job then exiting...');
    shuttingDown = true;
  });

  for (const job of pending) {
    if (shuttingDown) break;

    const pageContext = extractLocalMarkdownContext(job.pageFile, job.lineIndex);
    const sectionHeading = extractSectionHeading(job.pageFile, job.lineIndex);

    let success = false;
    let lastError = '';

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const t0 = Date.now();
        const description = await describeImage(job, pageContext, sectionHeading);
        const elapsed = (Date.now() - t0) / 1000;

        const clean = cleanDescriptionOutput(description || '');

        if (!clean || clean.toLowerCase() === 'null') {
          log(`[DECORATIVE] ${logProgress(elapsed, done + skipped + errors)} — ${job.pageFile} img#${job.pageImageIndex}`);
          progress[job.jobKey] = 'skipped';
          skipped++;
          success = true;
          break;
        }

        if (BROKEN_DESCRIPTION_RE.test(clean)) {
          throw new Error('Model returned placeholder or thinking tokens instead of a usable description');
        }

        const written = writeDescription(job, clean);

        if (written) {
          done++;
          const windowRadius = getWindowRadiusForJob(job);
          log(`[OK] ${logProgress(elapsed, done + skipped + errors)} — ${job.pageFile} img#${job.pageImageIndex} (win ${Math.max(0, job.pageImageIndex - windowRadius)}-${Math.min(job.pageImageCount - 1, job.pageImageIndex + windowRadius)})`);
          progress[job.jobKey] = 'done';
        } else {
          progress[job.jobKey] = 'write-failed';
        }
        success = true;
        break;

      } catch (err) {
        lastError = err.message.split('\n')[0].slice(0, 120);
        log(`[ATTEMPT ${attempt}/${MAX_RETRIES}] ${job.jobKey}: ${lastError}`);
        if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY * attempt);
      }
    }

    if (!success) {
      log(`[FAIL] ${job.jobKey}: ${lastError}`);
      progress[job.jobKey] = 'error';
      errors++;
    }

    saveProgress(progress);
    if (!shuttingDown) await sleep(CALL_DELAY);
  }

  saveProgress(progress);
  log(`=== Done: ${done} described, ${skipped} decorative, ${errors} errors ===`);
}

main().catch(err => {
  log(`FATAL: ${err}`);
  process.exit(1);
});
