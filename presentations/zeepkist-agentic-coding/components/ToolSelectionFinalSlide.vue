<template>
  <div class="tool-selection-slide">
    <div class="tool-selection-lead">
      Kies niet meteen de zwaarste oplossing. Begin bij het kleinste mechanisme dat het gedrag betrouwbaar maakt, en schuif pas op naar zwaardere tooling als het patroon zich bewijst.
    </div>

    <div class="tool-selection-rail" aria-hidden="true">
      <div class="tool-selection-rail-stop">breed besluit</div>
      <div class="tool-selection-rail-line"></div>
      <div class="tool-selection-rail-stop">herbruikbaar gedrag</div>
      <div class="tool-selection-rail-line"></div>
      <div class="tool-selection-rail-stop">uitvoerbare integratie</div>
    </div>

    <div class="tool-selection-grid">
      <section class="tool-selection-card tool-selection-card-adr">
        <div class="tool-selection-chip">Team-breed kader</div>
        <h3>ADR</h3>
        <p class="tool-selection-summary">Leg keuzes vast die voor volgende sessies richting blijven geven.</p>
        <div class="tool-selection-example">Bijvoorbeeld: branching policy, CI gating, architectuurkeuzes.</div>
        <div class="tool-selection-use">Gebruik als het besluit voor het hele team of meerdere sessies moet blijven gelden.</div>
      </section>

      <section class="tool-selection-card tool-selection-card-skill">
        <div class="tool-selection-chip">Herbruikbare expertise</div>
        <h3>Skill</h3>
        <p class="tool-selection-summary">Verpak domeinkennis, stappen en hulpmiddelen als herhaalbaar gedrag.</p>
        <div class="tool-selection-example">Bijvoorbeeld: Tekton debuggen, reviewer-persona, deployment-checklist.</div>
        <div class="tool-selection-use">Gebruik als een agent vaker dezelfde aanpak of expertise moet kunnen oproepen.</div>
      </section>

      <section class="tool-selection-card tool-selection-card-mcp">
        <div class="tool-selection-chip">Expliciete actie</div>
        <h3>MCP</h3>
        <p class="tool-selection-summary">Maak een capability van software of infrastructuur die echt uitgevoerd moet worden.</p>
        <div class="tool-selection-example">Bijvoorbeeld: nieuwe repo aanmaken, Jira uitlezen, deployment starten.</div>
        <div class="tool-selection-use">Gebruik als je een afgebakende actie of externe integratie als tool wilt aanbieden.</div>
      </section>
    </div>

    <div class="tool-selection-footer">
      <div class="tool-selection-footer-kicker">Werkregel</div>
      <div class="tool-selection-footer-text">Beproef wat werkt. Start licht, observeer waar het schuurt, en formaliseer pas daarna in een skill of MCP-server.</div>
    </div>
  </div>
</template>

<style scoped>
.tool-selection-slide {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin-top: 0.35rem;
}

.tool-selection-lead {
  max-width: 54rem;
  color: rgba(21, 66, 115, 0.86);
  font-size: 0.96rem;
  line-height: 1.35;
}

.tool-selection-rail {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.6rem;
  color: #5e7f9a;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.tool-selection-rail-line {
  height: 1px;
  background: linear-gradient(90deg, rgba(143, 202, 231, 0.9) 0%, rgba(143, 202, 231, 0.22) 100%);
}

.tool-selection-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
}

.tool-selection-card {
  min-height: 14.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1rem 1rem 1.05rem;
  border-radius: 1rem;
  border: 1px solid rgba(143, 202, 231, 0.82);
  background: linear-gradient(180deg, #ffffff 0%, #f7fbfd 100%);
  box-shadow: 0 0.85rem 1.8rem rgba(21, 66, 115, 0.06);
}

.tool-selection-card h3 {
  margin: 0;
  color: #154273;
  font-size: 1.15rem;
  font-weight: 800;
  line-height: 1.1;
}

.tool-selection-chip {
  align-self: flex-start;
  padding: 0.32rem 0.62rem;
  border-radius: 999px;
  background: #ddeff8;
  color: #154273;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.tool-selection-summary {
  margin: 0;
  color: #154273;
  font-size: 0.88rem;
  font-weight: 700;
  line-height: 1.35;
}

.tool-selection-example,
.tool-selection-use {
  margin: 0;
  color: rgba(21, 66, 115, 0.84);
  font-size: 0.8rem;
  line-height: 1.36;
}

.tool-selection-example {
  padding: 0.7rem 0.78rem;
  border-radius: 0.8rem;
  background: rgba(221, 239, 248, 0.56);
}

.tool-selection-use {
  margin-top: auto;
  padding-top: 0.62rem;
  border-top: 1px solid rgba(143, 202, 231, 0.68);
}

.tool-selection-card-adr {
  transform: translateY(0.15rem);
}

.tool-selection-card-skill {
  transform: translateY(0);
}

.tool-selection-card-mcp {
  transform: translateY(0.15rem);
}

.tool-selection-footer {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.9rem;
  align-items: center;
  padding: 0.85rem 1rem;
  border-left: 0.34rem solid #154273;
  background: linear-gradient(90deg, rgba(221, 239, 248, 0.74) 0%, rgba(255, 255, 255, 0.94) 100%);
}

.tool-selection-footer-kicker {
  color: #154273;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.tool-selection-footer-text {
  color: #154273;
  font-size: 0.92rem;
  line-height: 1.34;
}
</style>