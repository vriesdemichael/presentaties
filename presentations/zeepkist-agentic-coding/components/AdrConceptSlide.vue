<template>
  <div class="adr-slide">
    <div class="adr-record-shell">
      <div class="adr-record-sheet">
        <div class="adr-record-tab">ADR-007</div>
        <div class="adr-record-title">Protected main with gated CI</div>

        <div class="adr-record-row">
          <div class="adr-record-key">Title</div>
          <div class="adr-record-value">Protected main with gated CI</div>
        </div>
        <div class="adr-record-row">
          <div class="adr-record-key">Number</div>
          <div class="adr-record-value">ADR-007</div>
        </div>
        <div class="adr-record-row">
          <div class="adr-record-key">Status</div>
          <div class="adr-record-value">Accepted</div>
        </div>
        <div class="adr-record-row">
          <div class="adr-record-key">Rationale</div>
          <div class="adr-record-value">Snellere AI-output vraagt om expliciete kwaliteitsgrenzen.</div>
        </div>
        <div class="adr-record-row">
          <div class="adr-record-key">Decision</div>
          <div class="adr-record-value">Alle changes via PR. Main beschermd. Required checks moeten groen zijn.</div>
        </div>
        <div class="adr-record-row">
          <div class="adr-record-key">Rejected Alternatives</div>
          <div class="adr-record-value">Direct commits op main. Post-merge testen.</div>
        </div>
        <div class="adr-record-row adr-record-row-agent">
          <div class="adr-record-key">Agent Instructions</div>
          <div class="adr-record-value">Nooit CI bypassen. Werk altijd PR-ready aanleveren. Failing checks zijn blockers.</div>
        </div>
      </div>
    </div>

    <div class="adr-copy-stack">
      <div class="adr-concept-lead">Goede ADR's maken impliciete eisen expliciet.</div>

      <div class="adr-concept-card adr-concept-card-focus">
        <div class="adr-concept-kicker">Frame</div>
        <div class="adr-concept-title">AGENTS.md op steroids</div>
        <p>
          <strong>AGENTS.md</strong> zegt hoe een agent werkt.
          <strong>ADR</strong> legt vast welke besluiten al genomen zijn en dus niet opnieuw geimproviseerd moeten worden.
        </p>
      </div>

      <div class="adr-concept-card">
        <div class="adr-concept-kicker">Wanneer vastleggen</div>
        <div class="adr-concept-title">Als het later nog richting geeft</div>
        <p>Leg besluiten vast die voor volgende sessies belangrijk blijven: design, tooling, werkwijze, git-conventies en CI gating.</p>
      </div>

      <div class="adr-concept-takeaway">
        Expliciet maken dwingt betere onderbouwing. Daardoor kan een willekeurige developer of agent bijdragen zonder eerst verborgen context op te halen.
      </div>
    </div>
  </div>
</template>

<style scoped>
.adr-slide {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: 1rem;
  margin-top: 0.55rem;
}

.adr-record-shell {
  display: flex;
  align-items: stretch;
}

.adr-record-sheet {
  width: 100%;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbfd 100%);
  border: 2px solid #8fcae7;
  border-radius: 1.15rem;
  box-shadow: 0 1rem 2rem rgba(21, 66, 115, 0.08);
  padding: 1.2rem 1rem 1rem;
  position: relative;
}

.adr-record-tab {
  position: absolute;
  top: -0.7rem;
  left: 1rem;
  padding: 0.38rem 0.72rem;
  border-radius: 999px;
  background: #ddeff8;
  color: #154273;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.adr-record-title {
  color: #154273;
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.22;
  margin: 0.45rem 0 0.85rem;
  padding-right: 1.5rem;
}

.adr-record-row {
  display: grid;
  grid-template-columns: 7rem minmax(0, 1fr);
  gap: 0.7rem;
  padding: 0.48rem 0;
  border-top: 1px solid rgba(143, 202, 231, 0.65);
}

.adr-record-row:first-of-type {
  border-top: none;
  padding-top: 0;
}

.adr-record-key {
  color: #5e7f9a;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.adr-record-value {
  color: rgba(21, 66, 115, 0.87);
  font-size: 0.79rem;
  line-height: 1.34;
}

.adr-record-row-agent .adr-record-value {
  color: #154273;
  font-weight: 700;
}

.adr-copy-stack {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.adr-concept-lead {
  max-width: 36rem;
  font-size: 1.02rem;
  font-weight: 700;
  line-height: 1.35;
  color: #154273;
}

.adr-concept-card {
  border: 1px solid rgba(143, 202, 231, 0.8);
  border-radius: 1rem;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbfd 100%);
  padding: 0.95rem 1rem 1rem;
}

.adr-concept-card-focus {
  background: linear-gradient(180deg, #eef7fb 0%, #ffffff 100%);
}

.adr-concept-kicker {
  color: #154273;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 0.32rem;
}

.adr-concept-title {
  color: #154273;
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1.24;
  margin-bottom: 0.35rem;
}

.adr-concept-card p {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.38;
  color: rgba(21, 66, 115, 0.84);
}

.adr-concept-takeaway {
  padding: 0.9rem 1rem;
  border-left: 0.3rem solid #154273;
  background: rgba(221, 239, 248, 0.52);
  color: #154273;
  font-size: 0.92rem;
  line-height: 1.36;
}
</style>