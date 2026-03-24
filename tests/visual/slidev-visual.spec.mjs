import { test, expect } from '@playwright/test';
import { getDeckConfig } from '../../playwright.visual.decks.mjs';

const deckName = process.env.SLIDEV_DECK;

if (!deckName) {
  throw new Error('SLIDEV_DECK must be set before running tests.');
}

const deck = getDeckConfig(deckName);

async function stabilizeSlide(page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({
    content: [
      '*, *::before, *::after {',
      '  animation: none !important;',
      '  transition: none !important;',
      '  caret-color: transparent !important;',
      '}',
    ].join('\n'),
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForTimeout(300);
}

for (const slide of deck.slides) {
  test(`${deckName} slide ${slide.no} ${slide.name}`, async ({ page }) => {
    await page.goto(`/${slide.no}`, { waitUntil: 'networkidle' });
    const slideLayout = page.locator('.slidev-layout').filter({
      has: page.getByText(slide.readyText, { exact: false }).first(),
    }).first();

    await expect(slideLayout).toBeVisible();
    await stabilizeSlide(page);
    await expect(slideLayout).toHaveScreenshot(`${deckName}-slide-${String(slide.no).padStart(2, '0')}-${slide.name}.png`, {
      animations: 'disabled',
      caret: 'hide',
    });
  });
}