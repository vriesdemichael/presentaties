<template>
  <div class="evo-charts-row">

    <!-- Panel 1: Dark Mode Toggle -->
    <div class="evo-panel">
      <div class="evo-panel-title">Dark Mode Toggle <span class="evo-complexity">— Lage complexiteit</span></div>
      <div class="evo-panel-body">
        <!-- simple y-axis: 5 ticks, evenly spaced, height matches bars -->
        <div class="evo-yaxis simple">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>
        <div class="evo-plot">
          <div class="evo-grid"><div class="evo-gridline" v-for="n in 4" :key="n" /></div>
          <div class="evo-bar-group">
            <div class="evo-col">
              <div class="evo-stacked">
                <div class="seg seg-base" :style="{ height: '70%' }"><span>70</span></div>
              </div>
              <div class="evo-col-label">gpt-oss</div>
            </div>
            <div class="evo-col">
              <div class="evo-stacked">
                <div class="seg seg-new" :style="{ height: '10%' }"><span>10</span></div>
              </div>
              <div class="evo-col-label">Opus 4.6</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="evo-divider">vs</div>

    <!-- Panel 2: Auth to Passkeys (compressed y-axis: 0-100 normal + break + 380) -->
    <div class="evo-panel">
      <div class="evo-panel-title">Auth <span class="evo-arrow">→</span> Passkeys <span class="evo-complexity">— Hoge complexiteit</span></div>
      <div class="evo-panel-body">
        <!-- right panel y-axis with break indicator -->
        <div class="evo-yaxis compressed">
          <div class="evo-ytick overflow-tick"><span>⚠ 380</span></div>
          <div class="evo-ybreak">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <polyline points="0,6 3,2 6,10 9,2 12,10 15,2 18,6" stroke="#A90061" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="evo-yticks-normal">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>
        </div>
        <div class="evo-plot">
          <div class="evo-grid"><div class="evo-gridline" v-for="n in 4" :key="n" /></div>
          <div class="evo-bar-group">
            <div class="evo-col">
              <div class="evo-stacked">
                <!-- overflow threshold line inside the stacked bar at 83.3% from bottom = 100/120 -->
                <div class="evo-threshold-line"></div>
                <!-- column-reverse renders bottom-first: base then overflow on top -->
                <div class="seg seg-base" :style="{ height: '83.3%' }"></div>
                <div class="seg seg-overflow" :style="{ height: '16.7%' }"><span>⚠ 380</span></div>
              </div>
              <div class="evo-col-label">gpt-oss</div>
            </div>
            <div class="evo-col">
              <div class="evo-stacked">
                <div class="seg seg-new" :style="{ height: '75%' }"><span>90</span></div>
              </div>
              <div class="evo-col-label">Opus 4.6</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div class="evo-legend">
    <div class="evo-legend-item"><div class="evo-swatch swatch-base"></div>gpt-oss (prompt-sturing basis)</div>
    <div class="evo-legend-item"><div class="evo-swatch swatch-overflow"></div>gpt-oss overflow (context limit)</div>
    <div class="evo-legend-item"><div class="evo-swatch swatch-new"></div>Claude Opus 4.6</div>
  </div>
</template>

<style scoped>
.evo-charts-row {
  display: flex;
  gap: 2.5rem;
  align-items: stretch;
  flex: 1;
  min-height: 0;
}

.evo-divider {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 800;
  color: var(--bd-subtekst);
  flex: 0 0 auto;
  padding-bottom: 2rem;
}

.evo-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.evo-panel-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--bd-donkerblauw);
  text-align: center;
}

.evo-arrow { font-weight: 400; }

.evo-complexity {
  font-weight: 400;
  color: var(--bd-subtekst);
}

.evo-panel-body {
  display: flex;
  gap: 0.4rem;
  flex: 1;
  min-height: 0;
  align-items: flex-end;
}

/* ---- Simple y-axis (panel 1) ---- */
.evo-yaxis.simple {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 0.68rem;
  color: var(--bd-subtekst);
  height: 260px; /* matches bar height */
  padding-right: 0.3rem;
  min-width: 2.4rem;
}

/* ---- Compressed y-axis (panel 2) ---- */
.evo-yaxis.compressed {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.68rem;
  color: var(--bd-subtekst);
  height: 260px; /* matches bar height */
  padding-right: 0.3rem;
  min-width: 2.8rem;
  justify-content: flex-end;
}

.evo-ytick {
  text-align: right;
  margin-bottom: 0.15rem;
}

.overflow-tick {
  color: #A90061;
  font-weight: 700;
  font-size: 0.62rem;
}

.evo-ybreak {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0.1rem 0;
}

.evo-yticks-normal {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.evo-plot {
  flex: 1;
  display: flex;
  align-items: flex-end;
  position: relative;
  border-left: 2px solid #c8d8e4;
  border-bottom: 2px solid #c8d8e4;
  height: 260px;
}

.evo-grid {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}

.evo-gridline {
  width: 100%;
  height: 1px;
  background: #deedf6;
}

.evo-bar-group {
  display: flex;
  gap: 1.2rem;
  align-items: flex-end;
  height: 260px;
  padding: 0 1.2rem;
  position: relative;
  z-index: 1;
}

.evo-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  position: relative;
}

/* Stacked bar: column-reverse so the first child in DOM = bottom of bar */
.evo-stacked {
  display: flex;
  flex-direction: column-reverse;
  align-items: stretch;
  width: 68px;
  height: 260px;
  overflow: visible;
  position: relative;
}

/* Threshold line inside the stacked bar — at 83.3% = 100/120 from bottom */
.evo-threshold-line {
  position: absolute;
  bottom: 83.3%;
  left: -4px;
  right: -4px;
  height: 2px;
  border-top: 2px dashed #A90061;
  opacity: 0.7;
  pointer-events: none;
  z-index: 3;
}

.seg {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.evo-stacked .seg:last-child {
  border-radius: 4px 4px 0 0;
}

.seg-base     { background: #8FCAE7; color: var(--bd-donkerblauw); }
.seg-new      { background: #154273; }
.seg-overflow { background: #A90061; font-size: 0.72rem; }

.evo-col-label {
  font-size: 0.68rem;
  color: var(--bd-subtekst);
  margin-top: 0.15rem;
}

.evo-legend {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  font-size: 0.72rem;
  color: var(--bd-tekst);
  margin-top: 0.5rem;
}

.evo-legend-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.evo-swatch {
  width: 13px;
  height: 13px;
  border-radius: 3px;
  flex-shrink: 0;
}

.swatch-base     { background: #8FCAE7; }
.swatch-overflow { background: #A90061; }
.swatch-new      { background: #154273; }
</style>