<template>
  <div class="infographic-arrow-demo">
    <section
      class="infographic-arrow-demo-group infographic-arrow-demo-group--arrows"
    >
      <h2>Pijlen</h2>
      <div class="infographic-arrow-demo-large">
        <ArrowGlyph
          shape="block"
          width="15.8rem"
          height="6.05rem"
          color="var(--bd-domeinkleur-lichtblauw-60)"
        >
          <div class="infographic-arrow-demo-block-copy">
            <strong>Rechtsherstel</strong>
            <span>2017 - 2022</span>
          </div>
        </ArrowGlyph>
        <ArrowGlyph
          shape="block"
          join-left
          width="15.8rem"
          height="6.05rem"
          color="#a9d5ec"
        >
          <div class="infographic-arrow-demo-block-copy">
            <strong>Overbruggings-<br />wetgeving</strong>
            <span>2023 - 2026</span>
          </div>
        </ArrowGlyph>
      </div>
      <div class="infographic-arrow-demo-samples">
        <div class="infographic-arrow-demo-column">
          <ArrowGlyph width="2.5rem" height="1.35rem"></ArrowGlyph>
          <ArrowGlyph width="4rem" height="1.45rem"></ArrowGlyph>
          <ArrowGlyph
            direction="both"
            width="6.3rem"
            height="1.55rem"
          ></ArrowGlyph>
        </div>
        <div
          class="infographic-arrow-demo-column infographic-arrow-demo-column--thin"
        >
          <ArrowGlyph
            weight="thin"
            width="5.7rem"
            height="1.15rem"
          ></ArrowGlyph>
          <ArrowGlyph
            weight="thin"
            :dashed="true"
            width="5.7rem"
            height="1.15rem"
          ></ArrowGlyph>
          <ArrowGlyph
            weight="thin"
            head-only
            width="1.75rem"
            height="1.15rem"
          ></ArrowGlyph>
        </div>
      </div>
    </section>
    <section
      class="infographic-arrow-demo-group infographic-arrow-demo-group--lines"
    >
      <h2>Lijnen</h2>
      <div class="infographic-arrow-demo-lines">
        <span class="infographic-arrow-demo-line"></span>
        <span
          class="infographic-arrow-demo-line infographic-arrow-demo-line--dashed"
        ></span>
      </div>
      <p class="infographic-arrow-demo-lines-note">
        Gebruik vol voor directe verbindingen en dashed voor een tussenstap of
        vervolg.
      </p>
    </section>
  </div>
  <div class="infographic-demo-hint">
    <strong>Herbruikbaar</strong>
    <span
      >Gebruik <code>&lt;ArrowGlyph /&gt;</code> in <code>slides.md</code>;
      varieer met <code>direction</code>, <code>weight</code>,
      <code>dashed</code> en <code>headOnly</code>, of plaats content in een
      block-variant via de default slot.</span
    >
  </div>
</template>

<style scoped>
.infographic-arrow-demo {
  display: grid;
  grid-template-columns: 1.4fr 0.72fr;
  column-gap: 4.4rem;
  height: calc(100% - 3.4rem);
}

.infographic-arrow-demo-group h2 {
  margin: 0;
  font-family: var(--bd-font-bold-stack);
  font-size: 21pt;
  line-height: 1;
  color: var(--bd-contrastkleur-lintblauw);
}

.infographic-arrow-demo-large {
  display: flex;
  gap: 0;
  margin-top: 1.55rem;
  overflow: visible;
}

.infographic-arrow-demo-large > * {
  flex: 0 0 auto;
}

.infographic-arrow-demo-block-copy {
  display: grid;
  gap: 0.55rem;
  align-content: stretch;
  min-width: 0;
  width: 100%;
}

.infographic-arrow-demo-block-copy strong {
  font-family: var(--bd-font-bold-stack);
  font-size: 14.6pt;
  line-height: 1.04;
  color: var(--bd-contrastkleur-lintblauw);
}

.infographic-arrow-demo-block-copy span {
  margin-top: auto;
  font-size: 11.4pt;
  line-height: 1.08;
  color: rgba(0, 37, 94, 0.88);
}

.infographic-arrow-demo-samples {
  display: grid;
  grid-template-columns: auto auto;
  gap: 4.5rem;
  margin-top: 2.05rem;
  padding-left: 0.1rem;
}

.infographic-arrow-demo-column {
  display: grid;
  gap: 0.95rem;
  align-content: start;
}

.infographic-arrow-demo-column--thin {
  padding-top: 0.1rem;
}

.infographic-arrow-demo-lines {
  display: grid;
  gap: 0.7rem;
  width: 8.2rem;
  margin-top: 1.6rem;
}

.infographic-arrow-demo-lines-note {
  width: 10.6rem;
  margin: 0.65rem 0 0;
  font-size: 9.2pt;
  line-height: 1.24;
  color: rgba(0, 37, 94, 0.84);
}

.infographic-arrow-demo-line {
  height: 2px;
  background: var(--bd-domeinkleur-lichtblauw);
}

.infographic-arrow-demo-line--dashed {
  background: none;
  border-top: 2px dashed var(--bd-domeinkleur-lichtblauw);
}

.infographic-demo-hint {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.14rem 0.65rem;
  align-items: start;
  margin-top: 0.8rem;
  padding: 0.62rem 0.8rem 0.68rem;
  background: #edf4f8;
  color: var(--bd-contrastkleur-lintblauw);
  font-size: 9.1pt;
  line-height: 1.24;
}

.infographic-demo-hint strong {
  font-family: var(--bd-font-bold-stack);
  font-size: 9.8pt;
  white-space: nowrap;
}

.infographic-demo-hint code {
  font-size: 0.92em;
}
</style>
