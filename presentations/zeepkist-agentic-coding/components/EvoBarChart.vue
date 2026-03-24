<template>
  <div class="evo-wrap">
    <div class="evo-panels">
      <section class="evo-panel">
        <div class="evo-panel-header">
          <div class="evo-panel-title">Dark Mode Toggle</div>
          <div class="evo-panel-subtitle">Lage complexiteit</div>
        </div>

        <div class="evo-chart-shell">
          <div class="evo-axis">
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>

          <div class="evo-chart-area">
            <div class="evo-plot">
              <div class="evo-grid">
                <div class="evo-gridline" v-for="n in 4" :key="`low-${n}`" />
              </div>

              <div class="evo-bars">
                <div class="evo-column evo-column-plot-only">
                  <div class="evo-bar evo-bar-gpt" style="height: 70%;">
                    <span>70</span>
                  </div>
                </div>

                <div class="evo-column evo-column-plot-only">
                  <div class="evo-bar evo-bar-opus" style="height: 10%;">
                    <span>10</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="evo-xlabels">
              <div class="evo-label">gpt-oss</div>
              <div class="evo-label">Opus 4.6</div>
            </div>
          </div>
        </div>

        <div class="evo-note">Vooral verschil in hoeveelheid sturing, niet in haalbaarheid.</div>
      </section>

      <section class="evo-panel evo-panel-complex">
        <div class="evo-panel-header">
          <div class="evo-panel-title">Auth → Passkeys</div>
          <div class="evo-panel-subtitle">Hoge complexiteit</div>
        </div>

        <div class="evo-chart-shell evo-chart-shell-complex">
          <div class="evo-axis evo-axis-complex">
            <span class="evo-axis-overflow">380</span>
            <span>100</span>
            <span>75</span>
            <span>50</span>
            <span>25</span>
            <span>0</span>
          </div>

          <div class="evo-chart-area evo-chart-area-complex">
            <div class="evo-plot evo-plot-complex">
              <div class="evo-overflow-guide">boven normale context</div>
              <div class="evo-threshold-line"></div>

              <div class="evo-grid">
                <div class="evo-gridline" v-for="n in 4" :key="`high-${n}`" />
              </div>

              <div class="evo-bars evo-bars-complex">
                <div class="evo-column evo-column-plot-only">
                  <div class="evo-bar-stack">
                    <div class="evo-bar evo-bar-overflow" style="height: 22%;">
                      <span>+280</span>
                    </div>
                    <div class="evo-bar evo-bar-gpt" style="height: 78%;">
                      <span>100</span>
                    </div>
                  </div>
                </div>

                <div class="evo-column evo-column-plot-only">
                  <div class="evo-bar evo-bar-opus" style="height: 70%;">
                    <span>90</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="evo-xlabels">
              <div class="evo-label">gpt-oss</div>
              <div class="evo-label">Opus 4.6</div>
            </div>
          </div>
        </div>

        <div class="evo-note evo-note-alert">Meer sturing nodig, daarna een harde limiet.</div>
      </section>
    </div>

    <div class="evo-takeaway">
      <strong>Kernpunt:</strong> bij eenvoudige taken is het vooral een efficiëntieverschil; bij complexe taken zie je eerst extra stuurwerk en daarna een echte grens.
    </div>
  </div>
</template>

<style scoped>
.evo-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  height: 100%;
  min-height: 28rem;
}

.evo-panels {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2rem;
  flex: 1;
  min-height: 0;
}

.evo-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 0;
}

.evo-panel-header {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.45rem;
}

.evo-panel-title {
  font-size: 0.86rem;
  font-weight: 700;
  color: var(--bd-donkerblauw);
}

.evo-panel-subtitle {
  font-size: 0.82rem;
  color: var(--bd-subtekst);
}

.evo-chart-shell {
  display: grid;
  grid-template-columns: 2.75rem minmax(0, 1fr);
  gap: 0.45rem;
  align-items: stretch;
  flex: 1;
  min-height: 0;
}

.evo-chart-area {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  min-height: 0;
}

.evo-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  color: var(--bd-subtekst);
  font-size: 0.7rem;
  padding-top: 0.1rem;
}

.evo-axis-complex {
  padding-top: 0;
}

.evo-axis-overflow {
  color: #A90061;
  font-weight: 700;
}

.evo-plot {
  position: relative;
  display: flex;
  align-items: flex-end;
  border-left: 2px solid #c8d8e4;
  border-bottom: 2px solid #c8d8e4;
  min-height: 22rem;
  height: 100%;
  padding: 0 1.4rem 0;
}

.evo-plot-complex {
  display: grid;
  grid-template-rows: 4.75rem minmax(0, 1fr);
  align-items: stretch;
  padding-top: 0;
}

.evo-overflow-guide {
  position: absolute;
  right: 0.6rem;
  top: 0.6rem;
  font-size: 0.62rem;
  color: #A90061;
  font-weight: 700;
  z-index: 2;
}

.evo-threshold-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 4.75rem;
  border-top: 2px dashed rgba(169, 0, 97, 0.5);
  z-index: 0;
}

.evo-grid {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}

.evo-plot-complex .evo-grid {
  top: 4.75rem;
}

.evo-gridline {
  width: 100%;
  height: 1px;
  background: #deedf6;
}

.evo-bars {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
}

.evo-bars-complex {
  grid-row: 1 / span 2;
  align-self: stretch;
  padding-top: 0.2rem;
}

.evo-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
  height: 100%;
}

.evo-column-plot-only {
  gap: 0;
}

.evo-bar,
.evo-bar-stack {
  width: 5.6rem;
}

.evo-bar-stack {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
}

.evo-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.45rem 0.45rem 0 0;
  font-size: 0.92rem;
  font-weight: 700;
}

.evo-bar span {
  line-height: 1;
}

.evo-bar-gpt {
  background: #8FCAE7;
  color: var(--bd-donkerblauw);
}

.evo-bar-opus {
  background: #154273;
  color: white;
}

.evo-bar-overflow {
  background: #A90061;
  color: white;
  border-radius: 0.45rem 0.45rem 0 0;
  font-size: 0.8rem;
  margin-bottom: 0;
}

.evo-bar-stack .evo-bar-gpt {
  border-radius: 0;
}

.evo-label {
  font-size: 0.74rem;
  color: var(--bd-subtekst);
}

.evo-xlabels {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 0.45rem 1.4rem 0;
}

.evo-xlabels .evo-label {
  width: 5.6rem;
  text-align: center;
}

.evo-note {
  font-size: 0.7rem;
  line-height: 1.35;
  color: var(--bd-subtekst);
  text-align: center;
}

.evo-note-alert {
  color: #7D0047;
}

.evo-takeaway {
  padding: 0.6rem 0.9rem;
  border-radius: 0.65rem;
  background: #DDEFF8;
  color: var(--bd-donkerblauw);
  font-size: 0.74rem;
  line-height: 1.35;
  text-align: center;
}

.evo-takeaway strong {
  color: var(--bd-donkerblauw);
}
</style>