import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import process from 'node:process'

const repoRoot = path.resolve(import.meta.dirname, '..')
const presentationsDir = path.join(repoRoot, 'presentations')

function getDecks() {
  return readdirSync(presentationsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(path.join(presentationsDir, name, 'package.json')))
    .sort()
}

function printUsage() {
  console.error('Usage: pnpm run deck:<command> -- <deck-name> [-- <extra args>]')
  console.error('Commands: list, dev, build, export')
  console.error(`Available decks: ${getDecks().join(', ')}`)
}

const [, , command, deckName, ...extraArgs] = process.argv

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