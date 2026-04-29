<script setup>
import logoTileSvg from '../../../theme/assets/beeldmerk-rijksoverheid.svg?raw'
import lintAlsMeetlintPng from '../assets/lint-als-meetlint.png'
import webLayoutRatiosPng from '../assets/web-layout-ratios.png'

const logoTileUrl = `data:image/svg+xml,${encodeURIComponent(logoTileSvg)}`

defineProps({
  clicks: { type: Number, default: 0 },
})
</script>

<template>
  <div class="bd-text-heavy-measurement">
    <div
      class="bd-text-heavy-measurement-stage"
      :class="{
        'bd-text-heavy-measurement-stage--focus': clicks >= 1 && clicks < 3,
        'bd-text-heavy-measurement-stage--zoom-example': clicks >= 3,
      }"
    >
      <div class="bd-text-heavy-measurement-main">
        <div class="bd-text-heavy-measurement-canvas">
          <div class="bd-text-heavy-measurement-canvas-label">slidevlak</div>
          <div class="bd-text-heavy-measurement-ribbon">
            <img :src="logoTileUrl" alt="" />
          </div>
          <!-- Stack: RIGHT of ribbon, shows the 2X ribbon height as two 1X cubes -->
          <div class="bd-text-heavy-measurement-stack">
            <div class="bd-text-heavy-measurement-marker bd-text-heavy-measurement-marker--x" />
            <div class="bd-text-heavy-measurement-marker bd-text-heavy-measurement-marker--x" />
            <span>2X</span>
          </div>
          <!-- Top-margin: ½X cube centered directly below ribbon -->
          <div class="bd-text-heavy-measurement-top-block">
            <div class="bd-text-heavy-measurement-marker bd-text-heavy-measurement-marker--half" />
            <span>½X</span>
          </div>
          <!-- Corners: 1X cube at bottom-left and bottom-right, label on top -->
          <div class="bd-text-heavy-measurement-corner bd-text-heavy-measurement-corner--left">
            <span>1X</span>
            <div class="bd-text-heavy-measurement-marker bd-text-heavy-measurement-marker--x" />
          </div>
          <div class="bd-text-heavy-measurement-corner bd-text-heavy-measurement-corner--right">
            <span>1X</span>
            <div class="bd-text-heavy-measurement-marker bd-text-heavy-measurement-marker--x" />
          </div>
          <div class="bd-text-heavy-measurement-safe-area">
            <div class="bd-text-heavy-measurement-safe-area-label">contentgrens (na 1X padding)</div>
            <div class="bd-text-heavy-measurement-split">
              <div class="bd-text-heavy-measurement-panel bd-text-heavy-measurement-panel--text">
                <div class="bd-text-heavy-measurement-title">tekstvlak</div>
                <div class="bd-text-heavy-measurement-text-content">
                  <!-- fake heading -->
                  <div class="bd-text-heavy-measurement-fake-heading">
                    <span style="width:76%" />
                    <span style="width:52%" />
                  </div>
                  <!-- paragraph 1 -->
                  <div class="bd-text-heavy-measurement-lines">
                    <span style="width:100%" /><span style="width:93%" /><span style="width:97%" />
                    <span style="width:88%" /><span style="width:100%" /><span style="width:82%" /><span style="width:71%" />
                  </div>
                  <!-- paragraph 2 -->
                  <div class="bd-text-heavy-measurement-lines">
                    <span style="width:100%" /><span style="width:91%" /><span style="width:95%" />
                    <span style="width:85%" /><span style="width:100%" /><span style="width:66%" />
                  </div>
                  <!-- paragraph 3 -->
                  <div class="bd-text-heavy-measurement-lines">
                    <span style="width:100%" /><span style="width:89%" /><span style="width:94%" />
                    <span style="width:78%" /><span style="width:100%" /><span style="width:91%" /><span style="width:58%" />
                  </div>
                  <!-- paragraph 4 -->
                  <div class="bd-text-heavy-measurement-lines">
                    <span style="width:100%" /><span style="width:87%" /><span style="width:93%" />
                    <span style="width:75%" /><span style="width:62%" />
                  </div>
                </div>
              </div>
              <div class="bd-text-heavy-measurement-panel bd-text-heavy-measurement-panel--image">
                <div class="bd-text-heavy-measurement-image-frame">
                  <svg viewBox="0 0 100 70" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <!-- sky -->
                    <rect width="100" height="70" fill="rgba(21,66,115,0.04)" />
                    <!-- sun (cx=72 keeps it inside the ~14–86 visible X range when frame is portrait) -->
                    <circle cx="72" cy="12" r="7" fill="rgba(21,66,115,0.13)" />
                    <!-- back mountain -->
                    <polygon points="18,70 44,24 70,70" fill="rgba(21,66,115,0.07)" />
                    <!-- front mountains -->
                    <polygon points="-2,70 26,36 54,70" fill="rgba(21,66,115,0.14)" />
                    <polygon points="50,70 75,30 102,70" fill="rgba(21,66,115,0.14)" />
                    <!-- ground -->
                    <rect y="63" width="100" height="7" fill="rgba(21,66,115,0.09)" />
                  </svg>
                </div>
                <div class="bd-text-heavy-measurement-image-lines">
                  <span style="width:72%" />
                  <span style="width:55%" />
                </div>
              </div>
            </div>
          </div>
          <div class="bd-text-heavy-measurement-gap-block bd-text-heavy-measurement-gap-block--split">
            <div class="bd-text-heavy-measurement-marker bd-text-heavy-measurement-marker--x" />
            <div class="bd-text-heavy-measurement-marker bd-text-heavy-measurement-marker--x" />
            <span>2X</span>
          </div>
        </div>
      </div>
      <div class="bd-text-heavy-measurement-legend">
        <span><i class="bd-text-heavy-measurement-swatch bd-text-heavy-measurement-swatch--x" /> 1X = lint-breedte = maat voor alle afstanden op de slide</span>
        <span><i class="bd-text-heavy-measurement-swatch bd-text-heavy-measurement-swatch--half" /> ½X = helft van X (marge per helft, gap onder lint)</span>
      </div>
    </div>

    <div class="bd-text-heavy-measurement-reference-strip">
      <figure class="bd-text-heavy-measurement-reference-card bd-text-heavy-measurement-reference-card--lint">
        <img :src="lintAlsMeetlintPng" alt="Lint als meetlint met de X-maatvoering op het beeldmerk." />
        <figcaption>Lint = maat <strong>X</strong></figcaption>
      </figure>
      <figure class="bd-text-heavy-measurement-reference-card bd-text-heavy-measurement-reference-card--web">
        <img :src="webLayoutRatiosPng" alt="Weblayout met zichtbaar raster en X-verhoudingen." />
        <figcaption>Zelfde rasterprincipe</figcaption>
      </figure>
    </div>

    <div v-if="clicks === 1" class="bd-text-heavy-measurement-overlay">
      <figure class="bd-text-heavy-measurement-overlay-card bd-text-heavy-measurement-overlay-card--lint">
        <div class="bd-text-heavy-measurement-overlay-kicker">Referentie 1</div>
        <img :src="lintAlsMeetlintPng" alt="Lint als meetlint met de X-maatvoering op het beeldmerk." />
        <figcaption>Het lint levert de basiseenheid <strong>X</strong> voor de slide-opbouw.</figcaption>
      </figure>
    </div>

    <div v-if="clicks === 2" class="bd-text-heavy-measurement-overlay">
      <figure class="bd-text-heavy-measurement-overlay-card bd-text-heavy-measurement-overlay-card--web">
        <div class="bd-text-heavy-measurement-overlay-kicker">Referentie 2</div>
        <img :src="webLayoutRatiosPng" alt="Weblayout met zichtbaar raster en X-verhoudingen." />
        <figcaption>Hetzelfde rasterprincipe vertaalt zich naar padding, gutters en contentgrenzen.</figcaption>
      </figure>
    </div>
  </div>
</template>

<style scoped>
.bd-text-heavy-measurement {
  position: relative;
  width: 100%;
  min-height: 100%;
  color: var(--bd-contrastkleur-lintblauw);
  font-family: var(--bd-font-regular-stack);
  overflow: hidden;
}

.bd-text-heavy-measurement-stage {
  position: relative;
  display: grid;
  gap: 0.55rem;
  transition: opacity 0.28s ease, transform 0.35s ease;
}

.bd-text-heavy-measurement-stage--focus {
  opacity: 0.18;
}

.bd-text-heavy-measurement-stage--zoom-example {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.2rem 3.8rem 2.4rem;
  background: #edf4f8;
  opacity: 1;
}

.bd-text-heavy-measurement-main {
  display: grid;
  gap: 0.55rem;
  transition: transform 0.35s ease;
  transform-origin: top center;
}

.bd-text-heavy-measurement-stage--zoom-example .bd-text-heavy-measurement-main {
  width: min(88vw, 82rem);
  max-width: 100%;
  gap: 0;
  transform: none;
}

.bd-text-heavy-measurement-stage--zoom-example .bd-text-heavy-measurement-canvas {
  width: 100%;
}

.bd-text-heavy-measurement-stage--zoom-example .bd-text-heavy-measurement-legend,
.bd-text-heavy-measurement-stage--zoom-example + .bd-text-heavy-measurement-reference-strip {
  display: none;
}

/*
 * The Ribbon has z-index:5 as a direct child of .bd-split-surface.
 * The secondary pane (our container) is z-index:3, so any z-index we set on
 * the stage inside it is trapped within that stacking context.
 * Raise the secondary pane above the Ribbon (z>5) when zoom is active so the
 * full-cover stage actually covers it.
 */
:global(.bd-split-surface:has(.bd-text-heavy-measurement-stage--zoom-example) .bd-split-surface-secondary) {
  z-index: 6;
}

.bd-text-heavy-measurement-reference-strip {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.42rem;
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.bd-text-heavy-measurement-reference-card {
  margin: 0;
  padding: 0.2rem;
  border: 1px solid rgba(21, 66, 115, 0.14);
  background: #f7fbfd;
}

.bd-text-heavy-measurement-reference-card img {
  display: block;
  width: 100%;
  height: 2.55rem;
  object-fit: cover;
  object-position: top center;
}

.bd-text-heavy-measurement-reference-card--lint img {
  object-fit: contain;
  background: #4a4a4a;
}

.bd-text-heavy-measurement-reference-card figcaption {
  margin-top: 0.12rem;
  font-size: 6.9pt;
  line-height: 1.2;
  color: rgba(21, 66, 115, 0.86);
}

.bd-text-heavy-measurement-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0.4rem;
  background: rgba(237, 244, 248, 0.92);
}

.bd-text-heavy-measurement-overlay-card {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0.36rem;
  border: 1px solid rgba(21, 66, 115, 0.14);
  background: #ffffff;
  box-shadow: 0 0.55rem 1.2rem rgba(21, 66, 115, 0.12);
}

.bd-text-heavy-measurement-overlay-card img {
  display: block;
  width: 100%;
  height: 11.8rem;
  object-fit: contain;
  object-position: center;
}

.bd-text-heavy-measurement-overlay-card--web img {
  object-fit: cover;
  object-position: top center;
}

.bd-text-heavy-measurement-overlay-kicker {
  margin-bottom: 0.22rem;
  font-family: var(--bd-font-bold-stack);
  font-size: 8.2pt;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba(21, 66, 115, 0.66);
}

.bd-text-heavy-measurement-overlay-card figcaption {
  margin-top: 0.24rem;
  font-size: 8.8pt;
  line-height: 1.3;
  color: rgba(21, 66, 115, 0.88);
}

.bd-text-heavy-measurement-canvas {
  /*
   * container-type: inline-size lets us use cqw so --bd-measurement-x scales
   * proportionally to the canvas width. The real ribbon is ~4% of the 980px
   * slide width, so 4cqw matches that proportion in this miniature diagram.
   */
  container-type: inline-size;
  --bd-measurement-x: 4cqw;
  --bd-measurement-half-x: calc(var(--bd-measurement-x) / 2);
  --bd-measurement-violet: var(--bd-accentkleur-violet, #a90061);
  --bd-measurement-oranje: var(--bd-signaalkleur-oranje, #e17000);
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #ffffff;
  border: 1.5px solid rgba(21, 66, 115, 0.22);
  box-sizing: border-box;
  overflow: hidden;
}

.bd-text-heavy-measurement-canvas-label {
  position: absolute;
  top: 3px;
  left: 4px;
  font-size: 1.5cqw;
  color: rgba(21, 66, 115, 0.38);
  letter-spacing: 0.02em;
  line-height: 1;
}

/* Ribbon: the logo tile at top-center, 1X wide × 2X tall */
.bd-text-heavy-measurement-ribbon {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: var(--bd-measurement-x);
  height: calc(var(--bd-measurement-x) * 2);
  background: var(--bd-contrastkleur-lintblauw, #154273);
  display: flex;
  align-items: center;
  justify-content: center;
}

.bd-text-heavy-measurement-ribbon img {
  display: block;
  width: 75%;
  height: auto;
}

/* Stack: annotation RIGHT of ribbon, shows the 2X ribbon height */
.bd-text-heavy-measurement-stack {
  position: absolute;
  top: 0;
  left: calc(50% + var(--bd-measurement-x) / 2 + 2px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.bd-text-heavy-measurement-stack > span {
  font-size: 1.5cqw;
  color: var(--bd-measurement-violet);
  line-height: 1.15;
  margin-top: 1px;
}

/* Top-margin block: ½X cube centered directly below the ribbon */
.bd-text-heavy-measurement-top-block {
  position: absolute;
  top: calc(var(--bd-measurement-x) * 2);
  left: calc(50% - var(--bd-measurement-x) / 4);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bd-text-heavy-measurement-top-block > span {
  font-size: 1.5cqw;
  color: var(--bd-measurement-violet);
  line-height: 1.15;
  margin-top: 1px;
}

/* Corners: 1X cube at bottom-left and bottom-right, label above the cube */
.bd-text-heavy-measurement-corner {
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.bd-text-heavy-measurement-corner--left {
  left: 0;
  width: var(--bd-measurement-x);
}

.bd-text-heavy-measurement-corner--right {
  right: 0;
  width: var(--bd-measurement-x);
}

.bd-text-heavy-measurement-corner > span {
  font-size: 1.5cqw;
  color: var(--bd-measurement-violet);
  line-height: 1.15;
  margin-bottom: 1px;
}

/* Safe area: outer solid orange boundary of both content panels */
.bd-text-heavy-measurement-safe-area {
  position: absolute;
  top: calc(var(--bd-measurement-x) * 2 + var(--bd-measurement-half-x));
  left: var(--bd-measurement-x);
  right: var(--bd-measurement-x);
  bottom: var(--bd-measurement-x);
  border: 1.5px solid var(--bd-measurement-oranje);
  box-sizing: border-box;
}

.bd-text-heavy-measurement-safe-area-label {
  position: absolute;
  top: 0;
  left: 2px;
  transform: translateY(calc(-100% - 2px));
  font-size: 1.5cqw;
  color: var(--bd-measurement-oranje);
  line-height: 1.1;
  white-space: nowrap;
}

/* Split: two content panels side by side, gap = 2X */
.bd-text-heavy-measurement-split {
  position: absolute;
  inset: 0;
  display: flex;
  gap: calc(var(--bd-measurement-x) * 2);
}

/* Each panel: dotted orange border */
.bd-text-heavy-measurement-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  outline: 1px dashed var(--bd-measurement-oranje);
  outline-offset: -1px;
  box-sizing: border-box;
  padding: 0;
}

.bd-text-heavy-measurement-panel--text {
  /* title pins to top; wrapper distributes the rest */
}

.bd-text-heavy-measurement-text-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2cqw;
  margin-top: 0.25cqw;
  padding: 0;
}

.bd-text-heavy-measurement-title {
  font-size: 1.4cqw;
  font-weight: bold;
  color: rgba(21, 66, 115, 0.55);
  line-height: 1.1;
  padding: 0;
}

.bd-text-heavy-measurement-lines {
  display: flex;
  flex-direction: column;
  gap: 0.45cqw;
}

.bd-text-heavy-measurement-lines > span {
  display: block;
  height: 0.6cqw;
  background: rgba(21, 66, 115, 0.18);
  border-radius: 0.2cqw;
}

.bd-text-heavy-measurement-fake-heading {
  display: flex;
  flex-direction: column;
  gap: 0.5cqw;
}

.bd-text-heavy-measurement-fake-heading > span {
  display: block;
  height: 1.4cqw;
  background: rgba(21, 66, 115, 0.30);
  border-radius: 0.2cqw;
}

.bd-text-heavy-measurement-image-frame {
  flex: 1;
  border: 1px solid rgba(21, 66, 115, 0.12);
  position: relative;
  overflow: hidden;
}

.bd-text-heavy-measurement-image-frame svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.bd-text-heavy-measurement-image-lines {
  display: flex;
  flex-direction: column;
  gap: 0.3cqw;
  margin-top: 0.2cqw;
  padding: 0;
}

.bd-text-heavy-measurement-image-lines > span {
  display: block;
  height: 0.6cqw;
  background: rgba(21, 66, 115, 0.18);
  border-radius: 0.2cqw;
}

/*
 * Gap block: two 1X cubes side by side, centered in the 2X gap between panels.
 * The 2X gap is centered at 50% of the canvas.
 * Position vertically in middle of the content area.
 */
.bd-text-heavy-measurement-gap-block {
  position: absolute;
  display: flex;
  align-items: flex-end;
  z-index: 2;
}

.bd-text-heavy-measurement-gap-block--split {
  flex-direction: row;
  top: 60%;
  left: calc(50% - var(--bd-measurement-x));
  transform: translateY(-50%);
}

.bd-text-heavy-measurement-gap-block > span {
  font-size: 1.5cqw;
  color: var(--bd-measurement-magenta);
  line-height: 1.15;
  margin-left: 1px;
  align-self: flex-end;
}

/*
 * Markers: hollow squares with a magenta X crosshair.
 * The crosshair is two diagonal lines drawn via an inline SVG background.
 */
.bd-text-heavy-measurement-marker {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  border: 1px solid var(--bd-measurement-magenta);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 10 10'%3E%3Cline x1='0' y1='0' x2='10' y2='10' stroke='%23d52b6e' stroke-width='0.8'/%3E%3Cline x1='10' y1='0' x2='0' y2='10' stroke='%23d52b6e' stroke-width='0.8'/%3E%3C/svg%3E");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.bd-text-heavy-measurement-marker--x {
  width: var(--bd-measurement-x);
  height: var(--bd-measurement-x);
}

.bd-text-heavy-measurement-marker--half {
  width: var(--bd-measurement-half-x);
  height: var(--bd-measurement-half-x);
}

/* Legend */
.bd-text-heavy-measurement-legend {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 0.3rem;
  font-size: 1.4cqw;
  color: rgba(21, 66, 115, 0.7);
  line-height: 1.4;
}

.bd-text-heavy-measurement-swatch {
  display: inline-block;
  width: 8px;
  height: 8px;
  border: 1px solid var(--bd-measurement-magenta);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 10 10'%3E%3Cline x1='0' y1='0' x2='10' y2='10' stroke='%23d52b6e' stroke-width='0.8'/%3E%3Cline x1='10' y1='0' x2='0' y2='10' stroke='%23d52b6e' stroke-width='0.8'/%3E%3C/svg%3E");
  background-size: 100% 100%;
  vertical-align: middle;
  margin-right: 2px;
}

.bd-text-heavy-measurement-swatch--x {
  width: 8px;
  height: 8px;
}

.bd-text-heavy-measurement-swatch--half {
  width: 5px;
  height: 5px;
}
</style>
