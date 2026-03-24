import { spawnSync } from 'node:child_process';
import http from 'node:http';

const args = process.argv.slice(2);
const updateSnapshots = args.includes('--update');
const deckArgIndex = args.indexOf('--deck');
const positionalArgs = args.filter((arg, index) => {
  if (arg === '--update' || arg === '--') {
    return false;
  }

  if (deckArgIndex >= 0 && (index === deckArgIndex || index === deckArgIndex + 1)) {
    return false;
  }

  return !arg.startsWith('--');
});
const deck = deckArgIndex >= 0 ? args[deckArgIndex + 1] : positionalArgs[0] || '';
const passthroughIndex = args.indexOf('--');
const passthroughArgs = passthroughIndex >= 0 ? args.slice(passthroughIndex + 1) : [];

function checkSlidevServer() {
  return new Promise((resolve) => {
    const request = http.get('http://localhost:3030', (response) => {
      response.resume();
      resolve(response.statusCode && response.statusCode < 500);
    });

    request.setTimeout(1500, () => {
      request.destroy();
      resolve(false);
    });

    request.on('error', () => resolve(false));
  });
}

if (!deck) {
  console.error('Missing required deck argument.');
  console.error('Available decks: zeepkist-agentic-coding, sprint-review-product-104-temporal');
  process.exit(1);
}

const slidevServerReady = await checkSlidevServer();

if (!slidevServerReady) {
  console.error('No Slidev server detected on http://localhost:3030.');
  console.error(`Start the deck first using the background VS Code task for "${deck}" and rerun the visual test.`);
  process.exit(1);
}

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const commandArgs = ['playwright', 'test', '--config=playwright.visual.config.mjs'];

if (updateSnapshots) {
  commandArgs.push('--update-snapshots');
}

commandArgs.push(...passthroughArgs);

const result = spawnSync(command, commandArgs, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: {
    ...process.env,
    SLIDEV_DECK: deck,
  },
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);