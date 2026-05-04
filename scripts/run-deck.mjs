import { existsSync, readdirSync, mkdirSync, cpSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import process from 'node:process'

const repoRoot = path.resolve(import.meta.dirname, '..')
const presentationsDir = path.join(repoRoot, 'presentations')
const templateDir = path.join(presentationsDir, 'template')

function getDecks() {
  return readdirSync(presentationsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(path.join(presentationsDir, name, 'package.json')))
    .sort()
}

function printUsage() {
  console.error('Usage: pnpm run deck:<command> -- <deck-name> [-- <extra args>]')
  console.error('Commands: list, new, dev, build, export')
  console.error(`Available decks: ${getDecks().join(', ')}`)
}

function newDeck(deckName) {
  if (!deckName) {
    console.error('Usage: pnpm run deck:new -- <deck-name>')
    console.error('Example: pnpm run deck:new -- mijn-presentatie-2026')
    process.exit(1)
  }

  if (!/^[a-z0-9][a-z0-9-]*$/.test(deckName)) {
    console.error(`Invalid deck name: "${deckName}"`)
    console.error('Use lowercase letters, numbers and hyphens only (e.g. mijn-presentatie-2026)')
    process.exit(1)
  }

  const destDir = path.join(presentationsDir, deckName)

  if (existsSync(destDir)) {
    console.error(`Deck already exists: ${deckName}`)
    process.exit(1)
  }

  cpSync(templateDir, destDir, { recursive: true, filter: (src) => !src.includes('node_modules') })

  const pkgPath = path.join(destDir, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  pkg.name = `${deckName}-slides`
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8')

  console.log(`Created presentations/${deckName}/`)
  console.log(`Next steps:`)
  console.log(`  1. Edit presentations/${deckName}/slides.md — update title, date, speaker`)
  console.log(`  2. pnpm install`)
  console.log(`  3. pnpm run deck:dev -- ${deckName} -- --remote --bind 0.0.0.0 -p 3030`)
}

const [, , command, ...rawArgs] = process.argv
const filteredArgs = rawArgs.filter((a) => a !== '--')
const [deckName, ...extraArgs] = filteredArgs

if (!command) {
  printUsage()
  process.exit(1)
}

if (command === 'list') {
  for (const deck of getDecks()) {
    console.log(deck)
  }
  process.exit(0)
}

if (command === 'new') {
  newDeck(deckName)
  process.exit(0)
}

if (!['dev', 'build', 'export'].includes(command)) {
  printUsage()
  process.exit(1)
}

if (!deckName) {
  printUsage()
  process.exit(1)
}

const deckDir = path.join(presentationsDir, deckName)

if (!existsSync(path.join(deckDir, 'package.json'))) {
  console.error(`Unknown deck: ${deckName}`)
  console.error(`Available decks: ${getDecks().join(', ')}`)
  process.exit(1)
}

const result = spawnSync(
  'pnpm',
  ['--dir', deckDir, 'run', command, ...extraArgs],
  {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  },
)

if (typeof result.status === 'number') {
  process.exit(result.status)
}

process.exit(1)