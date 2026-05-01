/**
 * recrawl-with-images.js
 * Re-crawls all pages from the index, extracts text + images in DOM order,
 * and rewrites the markdown files with embedded image references.
 *
 * Usage: node recrawl-with-images.js
 */

const { firefox } = require('playwright');
const fs = require('fs');
const path = require('path');

const PAGES_DIR   = 'C:\\Users\\vries\\Documents\\huisstijl-reference\\pages';
const IMAGES_DIR  = 'C:\\Users\\vries\\Documents\\huisstijl-reference\\images';
const COOKIES_FILE = 'C:\\Users\\vries\\AppData\\Local\\Temp\\all-cookies.json';
const BASE_URL    = 'https://huisstijl.belastingdienst.nl';
const LOG_FILE    = 'C:\\Users\\vries\\Documents\\huisstijl-reference\\recrawl.log';
const PAGE_FILTER = (process.env.PAGE_FILTER || '').trim();
const DRY_RUN     = /^(1|true|yes)$/i.test(process.env.DRY_RUN || '');
const LOCAL_IMAGE_FILES = new Set(fs.readdirSync(IMAGES_DIR));

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

/** Same formula used by the downloader so we can match filenames. */
function imageUrlToFilename(url) {
  try {
    const ext = path.extname(new URL(url).pathname) || '.jpg';
    return url.replace(/[^a-z0-9.]/gi, '_').slice(-80) + ext;
  } catch {
    return null;
  }
}

function parseVariantDimensions(url) {
  try {
    const pathname = new URL(url).pathname;
    const match = pathname.match(/(?:-|_)(\d{2,4})x(\d{2,4})(?=\.[a-z0-9]+$)/i);
    if (!match) return null;
    const width = Number(match[1]);
    const height = Number(match[2]);
    return { width, height, area: width * height };
  } catch {
    return null;
  }
}

function scoreImageCandidate(url) {
  const dims = parseVariantDimensions(url);
  let score = dims ? dims.area : 1_000_000_000;

  if (/\/wp-content\/uploads\//i.test(url)) score += 5_000;
  if (/[-_](scaled|rotated)(?=\.[a-z0-9]+$)/i.test(url)) score -= 500;
  if (/[-_]\d{2,4}x\d{2,4}(?=\.[a-z0-9]+$)/i.test(url)) score -= 50;

  return score;
}

function isAssetUrl(url) {
  return /\/wp-content\/uploads\/.+\.(png|jpe?g|gif|webp|svg|pdf|zip)(?:\?.*)?$/i.test(url);
}

function chooseBestLocalImageFilename(urls) {
  const candidates = [];
  const seen = new Set();

  for (const url of urls || []) {
    if (!url || seen.has(url)) continue;
    seen.add(url);

    const filename = imageUrlToFilename(url);
    if (!filename || !LOCAL_IMAGE_FILES.has(filename)) continue;

    candidates.push({ url, filename, score: scoreImageCandidate(url) });
  }

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => b.score - a.score || a.url.length - b.url.length);
  return candidates[0].filename;
}

/** Extract page content as ordered items: {type:'text'|'img', ...} */
async function extractItems(page) {
  return page.evaluate(() => {
    function addAbsoluteUrl(set, rawUrl) {
      if (!rawUrl) return;
      const trimmed = rawUrl.trim();
      if (!trimmed || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) return;

      try {
        const absolute = new URL(trimmed, document.baseURI).href;
        if (
          absolute.includes('/wp-content/uploads/') ||
          absolute.includes('belastingdienst.nl') ||
          absolute.includes('rijkshuisstijl.nl')
        ) {
          set.add(absolute);
        }
      } catch {
        // Ignore invalid URLs from partial attributes
      }
    }

    function addSrcsetUrls(set, srcset) {
      if (!srcset) return;
      for (const part of srcset.split(',')) {
        const candidate = part.trim().split(/\s+/)[0];
        addAbsoluteUrl(set, candidate);
      }
    }

    function getBackgroundImageUrls(el) {
      const urls = new Set();
      const styles = [
        el.getAttribute('style') || '',
        window.getComputedStyle(el).backgroundImage || '',
      ];

      for (const styleText of styles) {
        for (const match of styleText.matchAll(/url\((['"]?)(.*?)\1\)/g)) {
          addAbsoluteUrl(urls, match[2]);
        }
      }

      return [...urls];
    }

    function getImageUrls(img) {
      const urls = new Set();

      addAbsoluteUrl(urls, img.currentSrc || '');

      const attrs = [
        'src',
        'data-src',
        'data-lazy-src',
        'data-lazyload',
        'data-orig-file',
        'data-medium-file',
        'data-large-file',
      ];

      for (const attr of attrs) {
        addAbsoluteUrl(urls, img.getAttribute(attr) || '');
      }

      const srcsetAttrs = ['srcset', 'data-srcset', 'data-lazy-srcset'];
      for (const attr of srcsetAttrs) {
        addSrcsetUrls(urls, img.getAttribute(attr) || '');
      }

      const picture = img.closest('picture');
      if (picture) {
        picture.querySelectorAll('source').forEach(source => {
          addSrcsetUrls(urls, source.getAttribute('srcset') || '');
          addSrcsetUrls(urls, source.getAttribute('data-srcset') || '');
          addAbsoluteUrl(urls, source.getAttribute('src') || '');
        });
      }

      return [...urls];
    }

    // Remove chrome noise
    document.querySelectorAll(
      'script,style,noscript,svg,nav,header,footer,.menu,.sidebar,#sidebar,#header,#footer,.wp-block-navigation'
    ).forEach(el => el.remove());

    const main =
      document.querySelector('main,[role="main"],.main-content,article,#content,.entry-content,.page-content') ||
      document.body;

    const items = [];

    function visit(el) {
      if (!el || el.nodeType !== Node.ELEMENT_NODE) return;
      const tag = el.tagName.toLowerCase();

      // Skip noise tags
      if (['script','style','noscript','svg','nav','header','footer','button','form'].includes(tag)) return;

      if (tag === 'img') {
        const urls = getImageUrls(el);
        if (urls.length) {
          items.push({ type: 'img', urls, alt: el.getAttribute('alt') || '' });
        }
        return;
      }

      if (['h1','h2','h3','h4','h5','h6'].includes(tag)) {
        const text = el.innerText?.trim();
        if (text && text.length > 1) {
          items.push({ type: 'heading', level: parseInt(tag[1]), text });
        }
        return; // don't recurse — text already captured
      }

      if (tag === 'p') {
        // Capture images inside <p> first (e.g. <p><img></p>)
        el.querySelectorAll('img').forEach(img => {
          const urls = getImageUrls(img);
          if (urls.length) {
            items.push({ type: 'img', urls, alt: img.getAttribute('alt') || '' });
          }
        });
        const text = el.innerText?.trim();
        if (text && text.length > 2) items.push({ type: 'para', text });
        return;
      }

      if (tag === 'li') {
        el.querySelectorAll('img').forEach(img => {
          const urls = getImageUrls(img);
          if (urls.length) {
            items.push({ type: 'img', urls, alt: img.getAttribute('alt') || '' });
          }
        });
        const text = el.innerText?.trim();
        if (text && text.length > 2) items.push({ type: 'li', text });
        return;
      }

      if (['td','th','figcaption','blockquote','caption'].includes(tag)) {
        const text = el.innerText?.trim();
        if (text && text.length > 2) items.push({ type: 'para', text });
        return;
      }

      const backgroundUrls = getBackgroundImageUrls(el);
      if (backgroundUrls.length) {
        const rect = el.getBoundingClientRect();
        if (rect.width >= 40 && rect.height >= 40) {
          items.push({ type: 'img', urls: backgroundUrls, alt: el.getAttribute('aria-label') || '' });
        }
      }

      // Containers: recurse into children
      Array.from(el.children).forEach(visit);
    }

    Array.from(main.children).forEach(visit);
    return items;
  });
}

function itemsToMarkdown(items, pageTitle, pageUrl) {
  const lines = [`# ${pageTitle}`, ``, `URL: ${pageUrl}`, ``, `---`, ``];
  let lastWasImg = false;
  let lastImageFilename = '';
  let embeddedImages = 0;
  const embeddedFilenames = [];

  for (const item of items) {
    if (item.type === 'heading') {
      const prefix = '#'.repeat(Math.min(item.level + 1, 5));
      lines.push('', `${prefix} ${item.text}`, '');
      lastWasImg = false;
      lastImageFilename = '';
    } else if (item.type === 'img') {
      const filename = chooseBestLocalImageFilename(item.urls);
      if (filename) {
        if (filename !== lastImageFilename) {
          lines.push(`![${item.alt}](../images/${filename})`);
          lastWasImg = true;
          lastImageFilename = filename;
          embeddedImages++;
          embeddedFilenames.push(filename);
        }
      }
      // Skip images we didn't download
    } else if (item.type === 'para') {
      if (lastWasImg) lines.push(''); // spacing after image
      lines.push(item.text, '');
      lastWasImg = false;
      lastImageFilename = '';
    } else if (item.type === 'li') {
      lines.push(`- ${item.text}`);
      lastWasImg = false;
      lastImageFilename = '';
    }
  }

  return {
    markdown: lines.join('\n').replace(/\n{4,}/g, '\n\n\n').trim() + '\n',
    embeddedImages,
    embeddedFilenames,
  };
}

async function main() {
  const indexPath = path.join(PAGES_DIR, '_index.json');
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  const pageCandidates = PAGE_FILTER
    ? index.pages.filter(pageInfo => pageInfo.slug.includes(PAGE_FILTER) || pageInfo.url.includes(PAGE_FILTER))
    : index.pages;
  const pages = pageCandidates.filter(pageInfo => !isAssetUrl(pageInfo.url));
  const skippedAssets = pageCandidates.length - pages.length;

  log(`Starting re-crawl of ${pages.length} pages${DRY_RUN ? ' (dry run)' : ''}${skippedAssets ? `; skipped ${skippedAssets} asset URLs from index` : ''}`);

  const cookies = JSON.parse(fs.readFileSync(COOKIES_FILE, 'utf8'));

  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:136.0) Gecko/20100101 Firefox/136.0',
  });
  await context.addCookies(cookies);
  const page = await context.newPage();
  page.setDefaultTimeout(25000);

  let done = 0, skipped = 0, failed = 0;
  let totalEmbeddedImages = 0;
  const uniqueEmbeddedFilenames = new Set();

  for (const pageInfo of pages) {
    const outPath = path.join(PAGES_DIR, pageInfo.slug + '.md');

    try {
      await page.goto(pageInfo.url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      const finalUrl = page.url();
      if (!finalUrl.startsWith(BASE_URL)) {
        log(`[SKIP-REDIRECT] ${pageInfo.url}`);
        skipped++;
        continue;
      }

      const title = await page.title();
      const items = await extractItems(page);
      const candidateCount = items.filter(i => i.type === 'img').length;
      const { markdown, embeddedImages, embeddedFilenames } = itemsToMarkdown(items, title, finalUrl);

      if (!DRY_RUN) {
        fs.writeFileSync(outPath, markdown, 'utf8');
      }
      totalEmbeddedImages += embeddedImages;
      for (const filename of embeddedFilenames) uniqueEmbeddedFilenames.add(filename);
      done++;
      log(`[${done}/${pages.length}] ${pageInfo.slug}.md — ${candidateCount} image candidates, ${embeddedImages} embedded`);

    } catch (err) {
      log(`[FAIL] ${pageInfo.url} — ${err.message.split('\n')[0].slice(0, 100)}`);
      failed++;
    }
  }

  await browser.close();
  log(`Done: ${done} ok, ${skipped} skipped, ${failed} failed, ${totalEmbeddedImages} embedded refs, ${uniqueEmbeddedFilenames.size} unique image files`);
}

main().catch(err => { log(`FATAL: ${err}`); process.exit(1); });
