<template>
  <div class="infographic-composite-demo">
    <div class="infographic-composite-demo-top">
      <section class="infographic-composite-demo-copy">
        <p class="infographic-composite-demo-eyebrow">
          Samengestelde toepassing
        </p>
        <h2>Een rijk procesverhaal met dezelfde bouwstenen</h2>
        <p>
          Dezelfde primitives vormen hier samen een procesplaat met
          contactmomenten, een voortgangsrail en faseblokken.
        </p>
      </section>
    </div>

    <section class="infographic-composite-demo-rail">
      <StepSeries
        :items="[
          { icon: 'formulier', caption: 'Signaal', body: 'Eerste ontvangst' },
          { icon: 'bewerken', caption: 'Verduidelijken', body: 'Contact en context' },
          { icon: 'tevredenheid', caption: 'Beoordelen', body: 'Check en bevestiging' },
          { icon: 'financien', caption: 'Afronden', body: 'Brief en vervolg' },
        ]"
        variant="icon"
        node-size="2.15rem"
        step-gap="5.05rem"
        icon-size="0.84rem"
        stroke-width="2px"
        caption-size="9.2pt"
        caption-body-size="8.15pt"
      ></StepSeries>
    </section>

    <section class="infographic-composite-demo-arrows">
      <ArrowGlyph shape="block" width="11rem" color="#b8ddf0">
        <div class="infographic-composite-demo-arrow-copy">
          <strong>Signaal ontvangen</strong>
          <span>Week 1</span>
          <p>Portaal en eerste triage.</p>
        </div>
      </ArrowGlyph>
      <ArrowGlyph shape="block" join-left width="11rem" color="#a9d5ec">
        <div class="infographic-composite-demo-arrow-copy">
          <strong>Verzoek aanscherpen</strong>
          <span>Week 2</span>
          <p>Vragen en extra info.</p>
        </div>
      </ArrowGlyph>
      <ArrowGlyph shape="block" join-left width="11rem" color="#98cce6">
        <div class="infographic-composite-demo-arrow-copy">
          <strong>Herstel beoordelen</strong>
          <span>Week 3-4</span>
          <p>Voorlopige uitkomst en check.</p>
        </div>
      </ArrowGlyph>
      <ArrowGlyph shape="block" join-left width="11rem" color="#88c1df">
        <div class="infographic-composite-demo-arrow-copy">
          <strong>Besluit afronden</strong>
          <span>Week 5</span>
          <p>Brief en vervolgstappen.</p>
        </div>
      </ArrowGlyph>
    </section>
  </div>
</template>

<style scoped>
.infographic-composite-demo {
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 0.72rem;
  height: calc(100% - 3.35rem);
}

.infographic-composite-demo-top {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
}

.infographic-composite-demo-copy h2 {
  margin: 0;
  color: var(--bd-contrastkleur-lintblauw);
  font-family: var(--bd-font-bold-stack);
  font-size: 18.9pt;
  line-height: 1.04;
}

.infographic-composite-demo-copy p {
  margin: 0.34rem 0 0;
  max-width: 28rem;
  font-size: 9.45pt;
  line-height: 1.24;
  color: rgba(0, 37, 94, 0.9);
}

.infographic-composite-demo-eyebrow {
  margin: 0 0 0.22rem;
  font-family: var(--bd-font-bold-stack);
  font-size: 8.8pt;
  color: #be1677;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.infographic-composite-demo-rail {
  display: grid;
  gap: 0.56rem;
  padding: 0.15rem 0 0 0.58rem;
}

.infographic-composite-demo-arrows {
  display: flex;
  align-items: stretch;
  margin-top: 0.05rem;
  overflow: visible;
}

.infographic-composite-demo-arrows > * {
  flex: 0 0 auto;
}

.infographic-composite-demo-arrow-copy {
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 0.25rem;
  width: 100%;
  min-width: 0;
}

.infographic-composite-demo-arrow-copy strong {
  font-family: var(--bd-font-bold-stack);
  font-size: 10.9pt;
  line-height: 1.03;
  color: var(--bd-contrastkleur-lintblauw);
}

.infographic-composite-demo-arrow-copy span {
  font-size: 8.7pt;
  line-height: 1.03;
  color: rgba(0, 37, 94, 0.78);
}

.infographic-composite-demo-arrow-copy p {
  margin: 0.05rem 0 0;
  font-size: 8pt;
  line-height: 1.18;
  color: rgba(0, 37, 94, 0.9);
}
</style>
