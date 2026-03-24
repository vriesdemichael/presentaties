<template>
  <div class="obf-wrap">
    <section class="obf-card">
      <div class="obf-card-header">
        <div class="obf-card-title">Gefragmenteerde pipeline</div>
        <div class="obf-card-subtitle">Lokale 10x winst verdwijnt als downstream iemand anders de snelheid bepaalt.</div>
      </div>

      <div class="obf-grid">
        <div class="obf-owner obf-owner-us" style="grid-column: 1 / span 2;">ons team</div>
        <div class="obf-owner obf-owner-external" style="grid-column: 3 / span 4;">buiten team</div>

        <div class="obf-stage obf-stage-dev">
          <div class="obf-stage-kicker">development</div>
          <div class="obf-stage-title">Code</div>
          <div class="obf-stage-note">meer productie</div>
          <div class="obf-badge">10x sneller</div>
        </div>

        <div class="obf-stage">
          <div class="obf-stage-kicker">build</div>
          <div class="obf-stage-title">Checks</div>
          <div class="obf-stage-note">klaar voor overdracht</div>
        </div>

        <div class="obf-stage obf-stage-bottleneck">
          <div class="obf-stage-kicker">extern testteam</div>
          <div class="obf-stage-title">Bottleneck</div>
          <div class="obf-stage-note">zelfde capaciteit</div>
        </div>

        <div class="obf-stage">
          <div class="obf-stage-kicker">release</div>
          <div class="obf-stage-title">Handoff</div>
          <div class="obf-stage-note">wachttijd</div>
        </div>

        <div class="obf-stage">
          <div class="obf-stage-kicker">validatie</div>
          <div class="obf-stage-title">Afstemming</div>
          <div class="obf-stage-note">extra queue</div>
        </div>

        <div class="obf-stage obf-stage-last">
          <div class="obf-stage-kicker">deploy</div>
          <div class="obf-stage-title">Productie</div>
          <div class="obf-stage-note">laatste stap</div>
        </div>

        <div class="obf-output">
          <div class="obf-stage-kicker">uitkomst</div>
          <div class="obf-stage-title">Nieuwe productiecode</div>
          <div class="obf-output-bar">
            <div class="obf-output-fill obf-output-fill-limited"></div>
          </div>
          <div class="obf-output-note">blijft beperkt door downstream</div>
        </div>
      </div>
    </section>

    <section class="obf-card obf-card-owned">
      <div class="obf-card-header">
        <div class="obf-card-title">Onze uitgangspositie</div>
        <div class="obf-card-subtitle">Omdat wij een groot deel van de flow zelf dragen, vertaalt versnelling zich veel beter naar echte output.</div>
      </div>

      <div class="obf-grid">
        <div class="obf-owner obf-owner-us" style="grid-column: 1 / span 5;">door ons beheerd</div>
        <div class="obf-owner obf-owner-external" style="grid-column: 6 / span 1;">klant</div>

        <div class="obf-stage obf-stage-dev">
          <div class="obf-stage-kicker">development</div>
          <div class="obf-stage-title">Code</div>
          <div class="obf-stage-note">snellere iteratie</div>
        </div>

        <div class="obf-stage">
          <div class="obf-stage-kicker">build</div>
          <div class="obf-stage-title">Build</div>
          <div class="obf-stage-note">direct feedback</div>
        </div>

        <div class="obf-stage">
          <div class="obf-stage-kicker">test</div>
          <div class="obf-stage-title">Test</div>
          <div class="obf-stage-note">geen team handoff</div>
        </div>

        <div class="obf-stage">
          <div class="obf-stage-kicker">ship</div>
          <div class="obf-stage-title">Ship</div>
          <div class="obf-stage-note">release binnen team</div>
        </div>

        <div class="obf-stage">
          <div class="obf-stage-kicker">deploy</div>
          <div class="obf-stage-title">Deploy</div>
          <div class="obf-stage-note">zelfde context</div>
        </div>

        <div class="obf-stage obf-stage-last obf-stage-customer">
          <div class="obf-stage-kicker">validatie</div>
          <div class="obf-stage-title">Klant</div>
          <div class="obf-stage-note">laatste check</div>
        </div>

        <div class="obf-output">
          <div class="obf-stage-kicker">uitkomst</div>
          <div class="obf-stage-title">Nieuwe productiecode</div>
          <div class="obf-output-bar">
            <div class="obf-output-fill obf-output-fill-owned"></div>
          </div>
          <div class="obf-output-note">meer van je snelheidswinst bereikt productie</div>
        </div>
      </div>
    </section>

    <div class="obf-takeaway">
      <strong>Kernpunt:</strong> wij staan sterk omdat build, test, ship, deploy en maintain grotendeels binnen dezelfde verantwoordelijkheid vallen. Daardoor ontstaat minder bottleneck door overdracht.
    </div>
  </div>
</template>

<style scoped>
.obf-wrap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 29rem;
  height: 100%;
}

.obf-card {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1rem 1.1rem 1.1rem;
  border-radius: 1rem;
  border: 1px solid rgba(21, 66, 115, 0.12);
  background: linear-gradient(180deg, #ffffff 0%, #f5fafc 100%);
  box-shadow: 0 8px 22px rgba(21, 66, 115, 0.07);
}

.obf-card-owned {
  background: linear-gradient(180deg, #f8fcfe 0%, #eef7fb 100%);
}

.obf-card-header {
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
}

.obf-card-title {
  font-size: 0.96rem;
  font-weight: 800;
  color: var(--bd-donkerblauw);
}

.obf-card-subtitle {
  font-size: 0.76rem;
  color: var(--bd-subtekst);
  max-width: 58rem;
}

.obf-grid {
  display: grid;
  grid-template-columns: 1.45fr 1.1fr 0.7fr 0.95fr 0.95fr 0.95fr 1.35fr;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 0.7rem;
  align-items: stretch;
}

.obf-owner {
  min-height: 1.35rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.63rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.obf-owner-us {
  color: #154273;
  background: rgba(143, 202, 231, 0.38);
  border: 1px solid rgba(21, 66, 115, 0.12);
}

.obf-owner-external {
  color: #6b7f8f;
  background: rgba(221, 239, 248, 0.85);
  border: 1px dashed rgba(21, 66, 115, 0.2);
}

.obf-stage,
.obf-output {
  position: relative;
  min-height: 6.3rem;
  border-radius: 0.92rem;
  padding: 0.8rem 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.18rem;
  border: 1px solid rgba(21, 66, 115, 0.12);
  background: #ddeff8;
  overflow: visible;
}

.obf-stage::after {
  content: '→';
  position: absolute;
  right: -0.58rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(21, 66, 115, 0.55);
  font-size: 1rem;
  font-weight: 800;
  z-index: 2;
}

.obf-stage-last::after,
.obf-output::after {
  content: none;
}

.obf-stage-dev {
  background: linear-gradient(180deg, #cfe7f4 0%, #bfe0f0 100%);
}

.obf-stage-bottleneck {
  color: #7d4400;
  background: linear-gradient(180deg, #ffe8cc 0%, #ffd6a8 100%);
  border-color: rgba(225, 112, 0, 0.25);
  clip-path: polygon(18% 0, 100% 0, 82% 50%, 100% 100%, 18% 100%, 0 50%);
}

.obf-stage-bottleneck::after {
  color: rgba(225, 112, 0, 0.7);
}

.obf-stage-customer {
  background: linear-gradient(180deg, #f7fbfd 0%, #edf6fa 100%);
}

.obf-stage-kicker {
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(21, 66, 115, 0.72);
}

.obf-stage-bottleneck .obf-stage-kicker {
  color: rgba(125, 68, 0, 0.8);
}

.obf-stage-title {
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--bd-donkerblauw);
  line-height: 1.05;
}

.obf-stage-bottleneck .obf-stage-title {
  color: #7d4400;
}

.obf-stage-note,
.obf-output-note {
  font-size: 0.68rem;
  color: var(--bd-subtekst);
  line-height: 1.25;
}

.obf-stage-bottleneck .obf-stage-note {
  color: rgba(125, 68, 0, 0.74);
}

.obf-badge {
  position: absolute;
  top: -0.42rem;
  left: 0.7rem;
  padding: 0.14rem 0.46rem;
  border-radius: 999px;
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #ffffff;
  background: #154273;
  box-shadow: 0 6px 14px rgba(21, 66, 115, 0.18);
}

.obf-output {
  background: #ffffff;
  justify-content: flex-start;
  gap: 0.32rem;
}

.obf-output-bar {
  margin-top: 0.22rem;
  height: 0.92rem;
  border-radius: 999px;
  background: #edf4f8;
  overflow: hidden;
}

.obf-output-fill {
  height: 100%;
  border-radius: 999px;
}

.obf-output-fill-limited {
  width: 34%;
  background: linear-gradient(90deg, #e17000 0%, #f09a3b 100%);
}

.obf-output-fill-owned {
  width: 72%;
  background: linear-gradient(90deg, #154273 0%, #2b6ea6 100%);
}

.obf-takeaway {
  margin-top: 0.1rem;
  padding: 0.8rem 0.95rem;
  border-radius: 0.95rem;
  background: #ddeff8;
  color: var(--bd-donkerblauw);
  font-size: 0.82rem;
  line-height: 1.45;
  border: 1px solid rgba(21, 66, 115, 0.12);
}
</style>