import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { spawnSync } from 'node:child_process'

const repoRoot = path.resolve(import.meta.dirname, '..')
const presentationsDir = path.join(repoRoot, 'presentations')
const outputDir = path.join(repoRoot, '.pages-dist')

function getDecks() {
  return readdirSync(presentationsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(path.join(presentationsDir, name, 'package.json')))
    .sort()
}

function getRepositoryName() {
  if (process.env.PAGES_BASE_PATH) {
    return process.env.PAGES_BASE_PATH.replace(/^\/+|\/+$/g, '')
  }

  if (process.env.GITHUB_REPOSITORY) {
    const [, repoName] = process.env.GITHUB_REPOSITORY.split('/')
    if (repoName) {
      return repoName
    }
  }

  if (process.argv[2]) {
    return process.argv[2].replace(/^\/+|\/+$/g, '')
  }

  return 'presentaties'
}

function humanizeDeckName(deckName) {
  return deckName
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function parseHeadmatter(deckName) {
  const slidesPath = path.join(presentationsDir, deckName, 'slides.md')

  if (!existsSync(slidesPath)) {
    return { title: humanizeDeckName(deckName) }
  }

  const source = readFileSync(slidesPath, 'utf8')
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)

  if (!match) {
    return { title: humanizeDeckName(deckName) }
  }

  const meta = {}
  let blockKey = null

  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trimEnd()

    if (blockKey) {
      if (/^\s/.test(rawLine)) {
        continue
      }
      blockKey = null
    }

    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!pair) {
      continue
    }

    const [, key, value] = pair
    if (value === '|' || value === '>') {
      blockKey = key
      continue
    }

    meta[key] = value.replace(/^['"]|['"]$/g, '')
  }

  return {
    title: meta.title || meta.coverTitle || humanizeDeckName(deckName),
    subtitle: meta.subtitle || '',
    date: meta.date || '',
    meeting: meta.meeting || '',
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildDeck(deckName, repoName) {
  const deckDir = path.join(presentationsDir, deckName)
  const outDir = path.join(outputDir, deckName)
  const basePath = `/${repoName}/${deckName}/`

  console.log(`Building ${deckName} -> ${basePath}`)

  const result = spawnSync(
    'pnpm',
    ['--dir', deckDir, 'run', 'build', '--', '--base', basePath, '--out', outDir],
    {
      stdio: 'inherit',
      shell: process.platform === 'win32',
    },
  )

  if (typeof result.status !== 'number' || result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

function writeLandingPage(decks, repoName) {
  const deckItems = decks
    .map((deck) => {
      const meta = parseHeadmatter(deck)
      const details = [meta.subtitle, meta.date, meta.meeting].filter(Boolean).join(' · ')

      return `
        <a class="deck-card" href="./${deck}/">
          <div class="deck-card__title">${escapeHtml(meta.title)}</div>
          <div class="deck-card__slug">${escapeHtml(deck)}</div>
          ${details ? `<div class="deck-card__meta">${escapeHtml(details)}</div>` : ''}
        </a>`
    })
    .join('')

  const html = `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Presentaties</title>
    <style>
      :root {
        color-scheme: light;
        --bd-blue: #154273;
        --bd-blue-soft: #ddeff8;
        --bd-blue-mid: #8fcae7;
        --bd-text: #14324d;
        --bd-border: rgba(21, 66, 115, 0.16);
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        font-family: "RijksoverheidSansWebText", "Segoe UI", Arial, sans-serif;
        color: var(--bd-text);
        background:
          linear-gradient(180deg, rgba(221, 239, 248, 0.82) 0%, rgba(255, 255, 255, 1) 44%),
          #ffffff;
      }

      main {
        width: min(72rem, calc(100vw - 3rem));
        margin: 0 auto;
        padding: 4rem 0 5rem;
      }

      .hero {
        margin-bottom: 2rem;
        padding-left: 1.2rem;
        border-left: 0.45rem solid var(--bd-blue);
      }

      .hero__kicker {
        margin: 0 0 0.45rem;
        font-size: 0.9rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #5a7d98;
      }

      .hero__title {
        margin: 0;
        font-size: clamp(2.2rem, 4vw, 3.8rem);
        line-height: 1.02;
        color: var(--bd-blue);
      }

      .hero__text {
        max-width: 42rem;
        margin: 0.9rem 0 0;
        font-size: 1rem;
        line-height: 1.55;
      }

      .deck-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
        gap: 1rem;
      }

      .deck-card {
        display: block;
        min-height: 10rem;
        padding: 1.2rem;
        text-decoration: none;
        color: inherit;
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid var(--bd-border);
        box-shadow: 0 0.55rem 1.6rem rgba(21, 66, 115, 0.08);
        transition: transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease;
      }

      .deck-card:hover,
      .deck-card:focus-visible {
        transform: translateY(-2px);
        border-color: rgba(21, 66, 115, 0.28);
        box-shadow: 0 0.8rem 2rem rgba(21, 66, 115, 0.14);
        outline: none;
      }

      .deck-card__title {
        margin-bottom: 0.6rem;
        font-size: 1.2rem;
        font-weight: 700;
        line-height: 1.2;
        color: var(--bd-blue);
      }

      .deck-card__slug {
        font-family: Consolas, "Courier New", monospace;
        font-size: 0.85rem;
        color: #45657f;
      }

      .deck-card__meta {
        margin-top: 1rem;
        font-size: 0.92rem;
        line-height: 1.45;
      }

      .footer {
        margin-top: 2rem;
        font-size: 0.92rem;
        color: #5a7d98;
      }

      code {
        font-family: Consolas, "Courier New", monospace;
      }
    </style>
  </head>
  <body>
    <main>
      <section class="hero">
        <p class="hero__kicker">GitHub Pages</p>
        <h1 class="hero__title">Presentaties</h1>
        <p class="hero__text">
          Deze site wordt automatisch opgebouwd uit alle decks in <code>presentations/</code>.
          Elke presentatie krijgt een eigen subpad onder <code>/${escapeHtml(repoName)}/&lt;deck&gt;/</code>.
        </p>
      </section>
      <section class="deck-grid">${deckItems}
      </section>
      <p class="footer">Automatisch gepubliceerd vanaf de <code>main</code>-branch.</p>
    </main>
  </body>
</html>
`

  writeFileSync(path.join(outputDir, 'index.html'), html)
}

function writeSpaFallback(repoName) {
  const html = `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="utf-8">
    <title>Presentatie omleiden</title>
  </head>
  <body>
    <script>
      (function() {
        var repoName = ${JSON.stringify(repoName)};
        var path = window.location.pathname;
        var prefix = '/' + repoName + '/';

        if (!path.startsWith(prefix)) {
          window.location.replace(prefix);
          return;
        }

        var remainder = path.slice(prefix.length);
        var segments = remainder.split('/').filter(Boolean);

        if (segments.length >= 2 && !segments[segments.length - 1].includes('.')) {
          var deckName = segments[0];
          var slidePath = segments.slice(1).join('/');
          var target = prefix + deckName + '/#/' + slidePath + window.location.search;
          window.location.replace(target);
          return;
        }

        window.location.replace(prefix);
      })();
    </script>
  </body>
</html>
`

  writeFileSync(path.join(outputDir, '404.html'), html)
}

const decks = getDecks()
const repoName = getRepositoryName()

if (decks.length === 0) {
  console.error('No decks found in presentations/.')
  process.exit(1)
}

rmSync(outputDir, { recursive: true, force: true })
mkdirSync(outputDir, { recursive: true })

for (const deck of decks) {
  buildDeck(deck, repoName)
}

writeLandingPage(decks, repoName)
writeSpaFallback(repoName)
writeFileSync(path.join(outputDir, '.nojekyll'), '')

console.log(`Pages artifact written to ${outputDir}`)