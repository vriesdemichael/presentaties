<template>
  <div class="infographic-steps-demo">
    <div class="infographic-steps-demo-sequences">
      <StepSeries
        :items="['1', '2', '3']"
        variant="filled"
        node-size="2.6rem"
        step-gap="4.15rem"
        label-size="13.5pt"
      ></StepSeries>
      <StepSeries
        :items="['1', '2', '3']"
        variant="outline"
        node-size="2.6rem"
        step-gap="4.15rem"
        label-size="13.5pt"
      ></StepSeries>
      <StepSeries
        :items="[
          { icon: 'formulier', caption: 'Signaal', body: 'Eerste ontvangst' },
          { icon: 'bewerken', caption: 'Verduidelijken', body: 'Contact en context' },
          { icon: 'tevredenheid', caption: 'Beoordelen', body: 'Check en bevestiging' },
        ]"
        variant="icon"
        node-size="2.6rem"
        step-gap="4.15rem"
        icon-size="1rem"
        caption-size="9.2pt"
        caption-body-size="8.15pt"
      ></StepSeries>
    </div>
    <div class="infographic-steps-demo-list">
      <VerticalStepList
        :items="[
          { title: 'Verzamelen', body: 'Documenten en gegevens' },
          { title: 'Aangifte doen', body: 'Via portaal of app' },
          { title: 'Controleren', body: 'Automatische checks', accentColor: 'var(--bd-signaalkleur-donkergeel)' },
          { title: 'Ondertekenen', body: 'Digitale handtekening' },
          { title: 'Verzenden', body: 'Bevestiging per e-mail' },
        ]"
        dot-size="0.78rem"
        gap="0.58rem"
        label-size="10.5pt"
        body-size="8.8pt"
        label-gap="0.7rem"
      ></VerticalStepList>
    </div>
  </div>
  <div class="infographic-demo-hint">
    <strong>Herbruikbaar</strong>
    <span
      >Combineer <code>&lt;StepSeries /&gt;</code> en
      <code>&lt;VerticalStepList /&gt;</code>; pas vooral <code>items</code>,
      <code>variant</code>, <code>nodeSize</code> en <code>gap</code> aan.</span
    >
  </div>
</template>

<style scoped>
.infographic-steps-demo {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(11rem, 0.72fr);
  column-gap: 3.1rem;
  align-items: start;
  height: calc(100% - 3.4rem);
}

.infographic-steps-demo-sequences {
  display: grid;
  gap: 1.45rem;
  padding-top: 0.9rem;
  padding-left: 0.5rem;
}

.infographic-steps-demo-list {
  padding-top: 0.35rem;
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
