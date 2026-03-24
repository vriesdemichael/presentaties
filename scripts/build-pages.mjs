import { spawnSync } from 'node:child_process';
import { access, cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const presentationsDir = path.join(repoRoot, 'presentations');
const distDir = path.join(repoRoot, 'dist');

function parseArgs(argv) {
  const parsed = {
    base: '/',
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--base') {
      parsed.base = argv[index + 1] ?? '/';
      index += 1;
    }
  }

  return parsed;
}

function normalizeBase(base) {
  if (!base || base === '/') {
    return '/';
  }

  const trimmed = base.trim().replace(/^\/+|\/+$/g, '');

  return trimmed ? `/${trimmed}/` : '/';
}

function buildDeckBase(base, slug) {
  const normalizedBase = normalizeBase(base);

  if (normalizedBase === '/') {
    return `/${slug}/`;
  }

  return `${normalizedBase}${slug}/`;
}

function quoteWindowsArg(value) {
  if (!value || /[\s"]/u.test(value)) {
    return `"${String(value).replace(/"/g, '\\"')}"`;
  }

  return value;
}

function getDeckBuildCommand(deck, outDir, base) {
  const args = ['pnpm', '--dir', deck.dir, 'exec', 'slidev', 'build', '--base', base, '--out', outDir];

  if (process.platform === 'win32') {
    const commandLine = ['corepack', ...args].map(quoteWindowsArg).join(' ');

    return {
      command: 'cmd.exe',
      args: ['/d', '/s', '/c', commandLine],
    };
  }

  return {
    command: 'corepack',
    args,
  };
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getDecks() {
  const entries = await readdir(presentationsDir, { withFileTypes: true });
  const decks = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const deckDir = path.join(presentationsDir, entry.name);
    const slidesPath = path.join(deckDir, 'slides.md');
    const packageJsonPath = path.join(deckDir, 'package.json');

    if (!(await exists(slidesPath)) || !(await exists(packageJsonPath))) {
      continue;
    }

    decks.push({
      slug: entry.name,
      dir: deckDir,
      slidesPath,
    });
  }

  decks.sort((left, right) => left.slug.localeCompare(right.slug));
  return decks;
}

async function readDeckTitle(slidesPath, slug) {
  const source = await readFile(slidesPath, 'utf8');
  const frontmatterMatch = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);

  if (!frontmatterMatch) {
    return slug;
  }

  const titleMatch = frontmatterMatch[1].match(/^title:\s*(.+)$/m);

  if (!titleMatch) {
    return slug;
  }

  return titleMatch[1].trim().replace(/^['"]|['"]$/g, '');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildIndexHtml(decks) {
  const deckCards = decks
    .map(
      (deck) => `
        <li>
          <a href="./${encodeURIComponent(deck.slug)}/">
            <strong>${escapeHtml(deck.title)}</strong>
            <span>${escapeHtml(deck.slug)}</span>
          </a>
        </li>`,
    )
    .join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Presentations</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f6f8fb;
        --card: #ffffff;
        --line: #d5dce5;
        --text: #17243b;
        --muted: #52627a;
        --accent: #0a58ca;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        font-family: "Segoe UI", sans-serif;
        background: linear-gradient(180deg, #eef3f8 0%, var(--bg) 100%);
        color: var(--text);
      }

      main {
        width: min(960px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 48px 0 64px;
      }

      h1 {
        margin: 0 0 8px;
        font-size: clamp(2rem, 4vw, 3rem);
      }

      p {
        margin: 0 0 32px;
        max-width: 60ch;
        color: var(--muted);
        line-height: 1.6;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 16px;
      }

      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 20px 24px;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: var(--card);
        text-decoration: none;
        color: inherit;
        box-shadow: 0 10px 30px rgba(23, 36, 59, 0.06);
      }

      a:hover,
      a:focus-visible {
        border-color: var(--accent);
        transform: translateY(-1px);
      }

      strong {
        font-size: 1.05rem;
      }

      span {
        color: var(--muted);
        white-space: nowrap;
      }

      @media (max-width: 640px) {
        a {
          flex-direction: column;
          align-items: flex-start;
        }

        span {
          white-space: normal;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Presentations</h1>
      <p>Static Slidev builds published from the presentations workspace. Select a deck to open its hosted version.</p>
      <ul>${deckCards}
      </ul>
    </main>
  </body>
</html>`;
}

function runDeckBuild(deck, outDir, base) {
  const command = getDeckBuildCommand(deck, outDir, base);
  const result = spawnSync(
    command.command,
    command.args,
    {
      cwd: repoRoot,
      stdio: 'inherit',
    },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`Build failed for ${deck.slug}.`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const decks = await getDecks();

  if (decks.length === 0) {
    throw new Error('No Slidev presentations with both slides.md and package.json were found under presentations/.');
  }

  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  const deckMetadata = [];

  for (const deck of decks) {
    const base = buildDeckBase(args.base, deck.slug);
    const outDir = path.join(distDir, deck.slug);
    const tempOutDir = path.join(deck.dir, '.pages-dist');
    const title = await readDeckTitle(deck.slidesPath, deck.slug);

    console.log(`\n[build-pages] Building ${deck.slug} -> ${base}`);
    await rm(tempOutDir, { recursive: true, force: true });
    runDeckBuild(deck, tempOutDir, base);
    await cp(tempOutDir, outDir, { recursive: true });
    await rm(tempOutDir, { recursive: true, force: true });
    deckMetadata.push({ ...deck, title });
  }

  await writeFile(path.join(distDir, 'index.html'), buildIndexHtml(deckMetadata));
  await writeFile(path.join(distDir, '.nojekyll'), '');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});