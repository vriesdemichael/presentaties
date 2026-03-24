import { defineConfig } from '@playwright/test';
import { getDeckConfig } from './playwright.visual.decks.mjs';

const deckName = process.env.SLIDEV_DECK;

if (!deckName) {
  throw new Error('SLIDEV_DECK must be set before running visual tests.');
}

getDeckConfig(deckName);

export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list']],
  snapshotPathTemplate: '{testDir}/__screenshots__/{projectName}/{arg}{ext}',
  use: {
    baseURL: 'http://localhost:3030',
    viewport: { width: 1366, height: 768 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  },
  projects: [
    {
      name: deckName,
    },
  ],
});