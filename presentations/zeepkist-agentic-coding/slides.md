---
theme: ../../theme
title: Agentic Coding - Deel 1
addons:
  - reusable-widgets
info: |
  Structuurversie (deel 1) met visuele placeholders.
class: text-left
drawings:
  persist: false
mdc: true
transition: slide-left
colorSchema: light
layout: cover
coverBg: ./images/cover-bg.jpg
coverTitle: Agentic coding
subtitle: "Waarom nu?\nHoe doe je het?\nWat voor tools zijn er?\nWat kan je leren van de zeik blogs."
date: 24 maart 2026
spreker: "Michaël de Vries"
meeting: "Zeepkist · Deel 1"
---

---
layout: agenda
agendaImage: ./images/robot-agenda.jpg
---

# Agenda (Deel 1)

1. Waarom nu?
2. Beschikbare tools
3. De evolutiecurve
4. Wat ging fout in de praktijk (en waarom wij juist sterk staan)
5. Teaser naar Deel 2 + pauze

---
layout: text-image-right
image: ./images/agentic-speedup.jpg
backgroundPosition: center
---

# Waarom nu? — Externe realiteit

De softwarewereld beweegt sneller dan ooit:

- Modellen zijn voorbij het kantelpunt waarop ze echt autonoom taken uit kunnen voeren
- Agentic coding is de norm
- Nu wachten betekent dat je over drie jaar een legacy dinosaurus bent

---
layout: text-image-left
image: ./images/agents-loading.png
---

# Waarom nu? — Interne realiteit

Agentic coding aanbesteding loopt

dus... vibecoding Soon™

**Nu is de tijd om voor te bereiden**

---
layout: default
---

# Beschikbare tools

<div class="cli-tools-board">
  <div class="cli-tools-grid">
    <figure class="cli-tools-item">
      <img :src="'images/cli-tools/claude-code.webp'" alt="Claude Code" />
    </figure>
    <figure class="cli-tools-item">
      <img :src="'images/cli-tools/copilot-cli.png'" alt="GitHub Copilot CLI" />
    </figure>
    <figure class="cli-tools-item">
      <img :src="'images/cli-tools/gemini-cli.png'" alt="Gemini CLI" />
    </figure>
    <figure class="cli-tools-item">
      <img :src="'images/cli-tools/opencode.png'" alt="OpenCode" />
    </figure>
  </div>
  <p class="cli-tools-more">En veel meer...</p>
</div>

<style>
.cli-tools-board {
  margin-top: 0.8rem;
  padding: 0.8rem 0.9rem 0.9rem;
  border-radius: 1rem;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbfd 100%);
  border: 1px solid rgba(143, 202, 231, 0.65);
  box-shadow: 0 8px 18px rgba(21, 66, 115, 0.08);
}

.cli-tools-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.cli-tools-item {
  margin: 0;
  border-radius: 0.35rem;
  padding: 0.25rem;
  min-height: 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.cli-tools-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.cli-tools-more {
  margin: 0.7rem 0 0;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--bd-donkerblauw);
}
</style>

---
layout: default
clicks: 6
---

# Beschikbare tools — Hoe ziet het eruit?

<AgentToolAnatomy />

---
layout: center
---

<div class="flex min-h-[62vh] flex-col items-center justify-center gap-4 text-center">
  <div class="text-7xl font-semibold text-[color:var(--bd-subtekst)]">DEMO</div>
  <div class="text-xl font-semibold text-[color:var(--bd-donkerblauw)]">VS Code Copilot Chat</div>
</div>

---
layout: text-image-right
image: ./images/review-ai.png
backgroundPosition: center
---

# De veranderende rol van software developers

Doordat modellen en coding tools beter worden verandert het werk van een developer:

- **Vroeger:** jij implementeert een issue en presenteert het bij de sprint review
- **Nu:** AI implementeert een issue, jij bewaakt kwaliteit en context
- **Toekomst:** AI presenteert en prioriteert, jij stuurt vooral op systeemniveau

::image::

<div class="role-evolution-visual">
  <img
    :src="'images/review-ai.png'"
    alt="Drie gestapelde panelen die de verschuiving tonen van menselijk implementeren naar AI-gedreven sprint review"
    class="role-evolution-visual-image"
  />
</div>

---
layout: default
---

# Cognitief budget: sturing per taak

<EvoBarChart />

---
layout: default
---

<script setup>
import EvoErrorPyramid from './components/EvoErrorPyramid.vue'
</script>

# Anatomie van een fout

<EvoErrorPyramid />

---
layout: default
---

<script setup>
import EvoCommitHistory from './components/EvoCommitHistory.vue'
</script>

# Commit history: gpt-oss vs Opus 4.6

<EvoCommitHistory />

---
layout: default
---

# Merge conflict: de doom loop

<EvoMergeMeltdown />

---
layout: text-image-right
image: ./images/cover-bg.jpg
---

# Zeikblogs

Voorbeelden:

- We replaced 3 senior devs with AI agents, one year later...
- The hidden inefficiencies in AI coding
- AI Coding Agents Repeating Decade-Old Security Mistakes
- Onderzoek naar AI bij ceo's en cfo's onthult minimale productiviteitsgroei

::image::

<div class="zeikblogs-quote-wrap">
  <div class="zeikblogs-quote-card">
    <div class="zeikblogs-quote-mark">“</div>
    <blockquote class="zeikblogs-quote">
      <p>AI doesn’t fix engineering problems. It magnifies them.</p>
      <p>Strong teams get stronger with AI.</p>
      <p>Weak teams fall behind even faster.</p>
    </blockquote>
    <div class="zeikblogs-attribution">Bijit Ghosh</div>
  </div>
</div>

---
layout: text-image-left
---

# Waarom wij juist sterk gepositioneerd zijn

Wij hebben een volwassen mentaliteit over software development.

**DevOps-werkwijze**

- GitOps
- Gated CI/CD
- Git-discipline met PRs
- Semantic Release
- Renovate

**Shift left, wij doen alles zelf**

- Build, test, ship, deploy, maintain
- Geen afhankelijkheden tot en met validatie door klant

::image::

<div class="positioning-visual">
  <img
    :src="'images/sadmf.png'"
    alt="Illustratie die een team toont dat klem zit tussen verantwoordelijkheden en externe afhankelijkheden"
    class="positioning-visual-image"
  />
</div>

<style>
.positioning-visual {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 0.6rem;
  box-sizing: border-box;
}

.positioning-visual-image {
  max-width: 94%;
  max-height: 86%;
  object-fit: contain;
  object-position: center;
  display: block;
}
</style>

---
layout: default
class: px-10
---

# Waarom wij sterk gepositioneerd zijn: bottlenecks

<div class="ownership-flow-slide ownership-flow-slide-single">
<section class="ownership-flow-card ownership-flow-card-focus">
<div class="ownership-flow-header">
<div class="ownership-flow-title">Lokale versnelling loopt vast verderop in de pipeline</div>
<div class="ownership-flow-subtitle">Ook als development 10x sneller wordt, blijft de doorstroom naar productie beperkt zolang externe stappen niet mee opschalen.</div>
</div>

<div class="ownership-flow-compare">
<div class="ownership-flow-mini">
<div class="ownership-flow-mini-title">Huidige situatie</div>
<div class="ownership-flow-grid ownership-flow-grid-bottleneck ownership-flow-grid-compact">
<div class="flow-step flow-step-dev">
<div class="flow-step-kicker flow-step-kicker-human">team capaciteit</div>
<div class="flow-step-title">Code</div>
<div class="flow-step-note">huidige snelheid</div>
</div>

<div class="flow-step">
<div class="flow-step-kicker flow-step-kicker-hardware">hardware</div>
<div class="flow-step-title">Build</div>
<div class="flow-step-note">schaalt op hardware</div>
</div>

<div class="flow-queue flow-queue-small">
<div class="flow-queue-stack">
<span class="flow-queue-chip"></span>
<span class="flow-queue-chip"></span>
</div>
<div class="flow-queue-label">kleine wachtrij</div>
</div>

<div class="flow-step flow-step-bottleneck">
<div class="flow-step-kicker flow-step-kicker-human">team capaciteit</div>
<div class="flow-step-title">Test</div>
<div class="flow-step-note">vaste capaciteit</div>
</div>

<div class="flow-step flow-step-external">
<div class="flow-step-kicker flow-step-kicker-human">team capaciteit</div>
<div class="flow-step-title">Release</div>
<div class="flow-step-note">vaste capaciteit</div>
</div>

<div class="flow-step flow-step-external">
<div class="flow-step-kicker flow-step-kicker-human">team capaciteit</div>
<div class="flow-step-title">Validatie klant</div>
<div class="flow-step-note">vaste capaciteit</div>
</div>

<div class="flow-output">
<div class="flow-step-title">Doorstroom naar productie</div>
<div class="flow-output-bar"><div class="flow-output-fill flow-output-fill-small"></div></div>
<div class="flow-step-note">beperkt</div>
</div>
</div>
</div>

<div class="ownership-flow-mini ownership-flow-mini-highlight">
<div class="ownership-flow-mini-title">Met 10x meer development-capaciteit</div>
<div class="ownership-flow-grid ownership-flow-grid-bottleneck ownership-flow-grid-compact">
<div class="flow-step flow-step-dev">
<div class="flow-step-kicker flow-step-kicker-human">team capaciteit</div>
<div class="flow-step-title">Code</div>
<div class="flow-step-note">10x sneller</div>
</div>

<div class="flow-step">
<div class="flow-step-kicker flow-step-kicker-hardware">hardware</div>
<div class="flow-step-title">Build</div>
<div class="flow-step-note">schaalt op hardware</div>
</div>

<div class="flow-queue flow-queue-large">
<div class="flow-queue-stack">
<span class="flow-queue-chip"></span>
<span class="flow-queue-chip"></span>
<span class="flow-queue-chip"></span>
<span class="flow-queue-chip"></span>
<span class="flow-queue-chip"></span>
<span class="flow-queue-chip"></span>
</div>
<div class="flow-queue-label">grotere wachtrij</div>
</div>

<div class="flow-step flow-step-bottleneck">
<div class="flow-step-kicker flow-step-kicker-human">team capaciteit</div>
<div class="flow-step-title">Test</div>
<div class="flow-step-note">vaste capaciteit</div>
</div>

<div class="flow-step flow-step-external">
<div class="flow-step-kicker flow-step-kicker-human">team capaciteit</div>
<div class="flow-step-title">Release</div>
<div class="flow-step-note">vaste capaciteit</div>
</div>

<div class="flow-step flow-step-external">
<div class="flow-step-kicker flow-step-kicker-human">team capaciteit</div>
<div class="flow-step-title">Validatie klant</div>
<div class="flow-step-note">vaste capaciteit</div>
</div>

<div class="flow-output">
<div class="flow-step-title">Doorstroom naar productie</div>
<div class="flow-output-bar"><div class="flow-output-fill flow-output-fill-small"></div></div>
<div class="flow-step-note">nog steeds beperkt</div>
</div>
</div>
</div>
</div>

<div class="ownership-flow-summary">Meer ontwikkelcapaciteit vergroot hier vooral de wachtrij, niet de uiteindelijke productie-output.</div>
</section>
</div>

---

# Waarom wij sterk gepositioneerd zijn: bottlenecks

<div class="ownership-flow-slide">
<section class="ownership-flow-card">
<div class="ownership-flow-header">
<div class="ownership-flow-title">Gefragmenteerde pipeline</div>
<div class="ownership-flow-subtitle">Meer overdrachten zorgen voor meer wachtrij en lagere doorstroom.</div>
</div>

<div class="ownership-flow-grid ownership-flow-grid-bottleneck ownership-flow-grid-compact">
<div class="ownership-band ownership-band-us" style="grid-column: 1 / span 2;">eigen team</div>
<div class="ownership-band ownership-band-external" style="grid-column: 3 / span 5;">externe stappen</div>

<div class="flow-step flow-step-dev">
<div class="flow-step-kicker flow-step-kicker-human">team capaciteit</div>
<div class="flow-step-title">Code</div>
<div class="flow-step-note">10x sneller</div>
</div>

<div class="flow-step">
<div class="flow-step-kicker flow-step-kicker-hardware">hardware</div>
<div class="flow-step-title">Build</div>
<div class="flow-step-note">schaalt op hardware</div>
</div>

<div class="flow-queue flow-queue-large">
<div class="flow-queue-stack">
<span class="flow-queue-chip"></span>
<span class="flow-queue-chip"></span>
<span class="flow-queue-chip"></span>
<span class="flow-queue-chip"></span>
<span class="flow-queue-chip"></span>
<span class="flow-queue-chip"></span>
</div>
<div class="flow-queue-label">grotere wachtrij</div>
</div>

<div class="flow-step flow-step-bottleneck">
<div class="flow-step-kicker flow-step-kicker-human">team capaciteit</div>
<div class="flow-step-title">Test</div>
<div class="flow-step-note">vaste capaciteit</div>
</div>

<div class="flow-step flow-step-external">
<div class="flow-step-kicker flow-step-kicker-human">team capaciteit</div>
<div class="flow-step-title">Release</div>
<div class="flow-step-note">vaste capaciteit</div>
</div>

<div class="flow-step flow-step-external">
<div class="flow-step-kicker flow-step-kicker-human">team capaciteit</div>
<div class="flow-step-title">Validatie klant</div>
<div class="flow-step-note">vaste capaciteit</div>
</div>

<div class="flow-output">
<div class="flow-step-title">Doorstroom naar productie</div>
<div class="flow-output-bar"><div class="flow-output-fill flow-output-fill-small"></div></div>
<div class="flow-step-note">nog steeds beperkt</div>
</div>
</div>
</section>

<section class="ownership-flow-card ownership-flow-card-owned">
<div class="ownership-flow-header">
<div class="ownership-flow-title">Meer stappen binnen eigen team</div>
<div class="ownership-flow-subtitle">Minder overdrachten betekent dat meer versnelling daadwerkelijk productie bereikt.</div>
</div>

<div class="ownership-flow-grid ownership-flow-grid-owned ownership-flow-grid-compact">
<div class="ownership-band ownership-band-us" style="grid-column: 1 / span 6;">eigen team</div>
<div class="ownership-band ownership-band-external" style="grid-column: 7 / span 2;">klant</div>

<div class="flow-step flow-step-dev">
<div class="flow-step-kicker flow-step-kicker-human">team capaciteit</div>
<div class="flow-step-title">Code</div>
<div class="flow-step-note">snellere iteratie</div>
</div>

<div class="flow-step">
<div class="flow-step-kicker flow-step-kicker-hardware">hardware</div>
<div class="flow-step-title">Build</div>
<div class="flow-step-note">schaalt op hardware</div>
</div>

<div class="flow-step">
<div class="flow-step-kicker flow-step-kicker-hardware">hardware</div>
<div class="flow-step-title">Test</div>
<div class="flow-step-note">direct feedback</div>
</div>

<div class="flow-step">
<div class="flow-step-kicker flow-step-kicker-hardware">hardware</div>
<div class="flow-step-title">Ship</div>
<div class="flow-step-note">geen overdracht</div>
</div>

<div class="flow-step">
<div class="flow-step-kicker flow-step-kicker-hardware">hardware</div>
<div class="flow-step-title">Deploy</div>
<div class="flow-step-note">directe doorstroom</div>
</div>

<div class="flow-queue flow-queue-small flow-queue-owned">
<div class="flow-queue-stack">
<span class="flow-queue-chip"></span>
<span class="flow-queue-chip"></span>
</div>
<div class="flow-queue-label">korte wachtrij</div>
</div>

<div class="flow-step flow-step-customer">
<div class="flow-step-kicker flow-step-kicker-human">team capaciteit</div>
<div class="flow-step-title">Validatie klant</div>
<div class="flow-step-note">laatste check</div>
</div>

<div class="flow-output">
<div class="flow-step-title">Doorstroom naar productie</div>
<div class="flow-output-bar"><div class="flow-output-fill flow-output-fill-large"></div></div>
<div class="flow-step-note">meer bereikt productie</div>
</div>
</div>
</section>

<div class="ownership-flow-takeaway ownership-flow-footnote">
Er zijn meer stappen dan hier beschreven, bijv beveiliging, juridische check, onderhoud achteraf, monitoring, rapportages over gebruikte software en dependencies. Voor het overzicht zijn deze hier weg gelaten.
</div>
</div>

---

<div class="focus-shift-slide-page">
<div class="focus-shift-background" aria-hidden="true"></div>

<div class="focus-shift-copy focus-shift-copy-page">
<div class="focus-shift-title">Waarom wij sterk gepositioneerd zijn: verschuiving focus</div>
<div class="focus-shift-intro">Als bouwen relatief goedkoper wordt, verschuift de waarde van puur produceren naar afstemmen, presenteren en overtuigen.</div>

<div class="focus-shift-lines">
<div class="focus-shift-line">Minder bouwen</div>
<div class="focus-shift-line">Meer presenteren</div>
<div class="focus-shift-line">Meer overtuigen</div>
<div class="focus-shift-line">Meer interactie met mensen</div>
</div>
</div>
</div>

---

# Teaser voor deel 2 tijdens de product roadmap meeting.

<div class="breakpoint">
  <strong>Onderwerpen in de product roadmap meeting:</strong>
  <ul>
    <li>Expliciet maken van tribal knowledge</li>
    <li>Hoe werkt een architectural decision record</li>
    <li>MCP vs skills vs AGENTS.md</li>
    <li>Sandboxing in tools</li>
    <li>Autonoom werken vanaf een backlog</li>
  </ul>
</div>

---
class: pause-slide-page
---

<div class="pause-slide">
  <img
    :src="'images/break-coffee-machine.png'"
    alt=""
    class="pause-slide-bg"
  >

  <div class="pause-slide-scrim"></div>

  <div class="pause-slide-card">
    <div class="pause-slide-kicker">Deel 1 afgerond</div>
    <div class="pause-slide-title">Pauze</div>
  </div>

  <div class="pause-slide-qr">
    <img
      :src="'images/qr-code.png'"
      alt="QR-code naar de bron van deze presentatie"
      class="pause-slide-qr-image"
    >
    <div class="pause-slide-qr-text">
      Deze presentatie is met agentic coding gemaakt,<br>
      hackbare bron via link
    </div>
  </div>
</div>

<style>
.slidev-layout.pause-slide-page {
  padding: 0 !important;
  overflow: hidden;
}

.pause-slide {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.pause-slide-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.pause-slide-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0.24) 34%, rgba(255, 255, 255, 0.02) 100%),
    linear-gradient(180deg, rgba(221, 239, 248, 0.08) 0%, rgba(21, 66, 115, 0.08) 100%);
}

.pause-slide-card {
  position: absolute;
  left: 4.5rem;
  top: 4.2rem;
  z-index: 1;
  padding: 1.15rem 1.35rem 1rem;
  background: rgba(255, 255, 255, 0.74);
  border-left: 0.42rem solid #154273;
  backdrop-filter: blur(4px);
  max-width: 19rem;
}

.pause-slide-kicker {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #5e7f9a;
  text-transform: uppercase;
  margin-bottom: 0.35rem;
}

.pause-slide-title {
  font-size: 2.35rem;
  line-height: 1.04;
  font-weight: 700;
  color: #154273;
}

.pause-slide-qr {
  position: absolute;
  right: 3.4rem;
  bottom: 3rem;
  z-index: 1;
  width: 11.5rem;
  padding: 0.9rem 0.9rem 0.8rem;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0.4rem 1.3rem rgba(21, 66, 115, 0.14);
  text-align: center;
}

.pause-slide-qr-image {
  width: 6.4rem;
  height: 6.4rem;
  margin: 0 auto 0.7rem;
  display: block;
  object-fit: contain;
  background: #eef7fb;
  padding: 0.24rem;
}

.pause-slide-qr-text {
  font-size: 0.67rem;
  line-height: 1.35;
  color: #154273;
}
</style>

---
layout: agenda
agendaImage: ./images/robot-agenda.jpg
---

# Agenda (Deel 2)

1. Tribal knowledge
2. Hulp van tools
3. Architectural decision record
4. Autonoom werken vanaf Jira

---
layout: text-image-right
image: ./images/caveman.png
imageMaxWidth: 92%
imageMaxHeight: 88%
---

# Tribal knowledge

Wij zijn veel slimmer dan AI

Want wij (devs) zijn slecht in documenteren

Nieuwe medewerker -> vooral impliciete kennis overdragen

AI is altijd een nieuwe medewerker

---
layout: default
---

<script setup>
import TektonDebugGraph from './components/TektonDebugGraph.vue'
</script>

# Tribal knowledge voorbeeld: Tekton CI

De mentale kaart die je nodig hebt voordat je gericht kunt debuggen.

<div class="tekton-chart-stage">
  <div class="tekton-chart-panel">
    <TektonDebugGraph />
  </div>
</div>

<style>
.tekton-chart-stage {
  position: relative;
  height: calc(100vh - 10.5rem);
  min-height: 34rem;
}

.tekton-chart-panel {
  height: 100%;
}
</style>

---
layout: text-image-left
image: ./images/caveman.png
---

<template #left>
  <div class="instruction-file-placeholder">
    <div class="instruction-file-sheet">
      <div class="instruction-file-tab">AGENTS.md</div>
      <div class="instruction-file-lines">
        <span class="instruction-file-line instruction-file-line-title"></span>
        <span class="instruction-file-line"></span>
        <span class="instruction-file-line instruction-file-line-short"></span>
        <span class="instruction-file-line"></span>
        <span class="instruction-file-line"></span>
        <span class="instruction-file-line instruction-file-line-short"></span>
        <span class="instruction-file-line"></span>
      </div>
    </div>
  </div>
</template>

# Tools: Instruction file

<div class="tool-copy-stack">
  <div class="tool-contrast-grid">
    <div class="tool-contrast-card">
      <div class="tool-contrast-label">Vroeger</div>
      <p>Een systeem prompt aan het begin van je gesprek</p>
    </div>
    <div class="tool-contrast-card tool-contrast-card-highlight">
      <div class="tool-contrast-label">Nu</div>
      <p>Een bestand met instructies in je code.</p>
    </div>
  </div>
  <div class="tool-detail-list">
    <p><strong>Standaard:</strong> <code>AGENTS.md</code></p>
    <p><strong>Legacy:</strong> <code>CLAUDE.md</code>, <code>GEMINI.md</code>, <code>.github/copilot-instructions.md</code></p>
  </div>
</div>

<style>
.instruction-file-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
}

.instruction-file-sheet {
  width: min(26rem, 88%);
  aspect-ratio: 4 / 5;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbfd 100%);
  border: 2px solid #8FCAE7;
  border-radius: 1.2rem;
  box-shadow: 0 1.2rem 2.4rem rgba(21, 66, 115, 0.08);
  position: relative;
  padding: 4.5rem 2rem 2rem;
}

.instruction-file-sheet::before {
  content: '';
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 2.4rem;
  height: 2.4rem;
  background: linear-gradient(135deg, #DDEFF8 0%, #ffffff 100%);
  border-top: 2px solid #8FCAE7;
  border-right: 2px solid #8FCAE7;
  border-radius: 0 0.8rem 0 0;
}

.instruction-file-tab {
  position: absolute;
  top: 1.35rem;
  left: 1.6rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: #DDEFF8;
  color: #154273;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.instruction-file-lines {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.instruction-file-line {
  display: block;
  height: 0.7rem;
  border-radius: 999px;
  background: linear-gradient(90deg, #8FCAE7 0%, #DDEFF8 100%);
}

.instruction-file-line-title {
  width: 64%;
  height: 0.9rem;
  background: linear-gradient(90deg, #154273 0%, #3D7AA8 100%);
}

.instruction-file-line-short {
  width: 72%;
}

.tool-copy-stack {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 1rem;
}

.tool-contrast-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
}

.tool-contrast-card {
  border: 1px solid #B5DDEF;
  border-radius: 1rem;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbfd 100%);
  padding: 0.95rem 1.1rem 1rem;
}

.tool-contrast-card-highlight {
  background: linear-gradient(180deg, #eef7fb 0%, #ffffff 100%);
}

.tool-contrast-label {
  color: #154273;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.3rem;
}

.tool-contrast-card p,
.tool-detail-list p {
  margin: 0;
  line-height: 1.45;
}

.tool-detail-list {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.tool-detail-list p {
  font-size: 0.98em;
}

.tool-detail-list code {
  font-size: 0.9em;
}
</style>

---
layout: text-image-left
image: ./images/caveman.png
---

<template #left>
  <div class="tools-visual-shell">
    <div class="tools-visual-card">
      <div class="tools-visual-badge">MCP server</div>
      <div class="tools-mcp-stack">
        <div class="tools-mcp-tool">
          <div class="tools-mcp-tool-name">read_file</div>
          <div class="tools-mcp-io">
            <span class="tools-chip">filePath</span>
            <span class="tools-mcp-arrow-inline">→</span>
            <span class="tools-chip tools-chip-soft">contents</span>
          </div>
        </div>
        <div class="tools-mcp-tool">
          <div class="tools-mcp-tool-name">run_in_terminal</div>
          <div class="tools-mcp-io">
            <span class="tools-chip">command</span>
            <span class="tools-mcp-arrow-inline">→</span>
            <span class="tools-chip tools-chip-soft">output</span>
          </div>
        </div>
        <div class="tools-mcp-tool">
          <div class="tools-mcp-tool-name">github search</div>
          <div class="tools-mcp-io">
            <span class="tools-chip">query</span>
            <span class="tools-mcp-arrow-inline">→</span>
            <span class="tools-chip tools-chip-soft">JSON</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

# Tools: MCP

<div class="tools-slide-stack">
  <p class="tools-slide-lead">MCP koppelt een agent aan draaiende software die expliciete tools beschikbaar maakt.</p>
  <div class="tools-callout-grid">
    <div class="tools-callout-card">
      <div class="tools-callout-label">Injectie</div>
      <p>Tool definities worden samen met AGENTS.md ingeladen in je sessie.</p>
    </div>
    <div class="tools-callout-card tools-callout-card-highlight">
      <div class="tools-callout-label">Sterk voor</div>
      <p>Een afgebakend deel van een binary of externe API als tool beschikbaar maken.</p>
    </div>
    <div class="tools-callout-card">
      <div class="tools-callout-label">Configuratie</div>
      <p>Via mcp.json als standaard.</p>
    </div>
  </div>
</div>

---
layout: text-image-right
image: ./images/caveman.png
---

<template #right>
  <div class="tools-visual-shell">
    <div class="tools-visual-card">
      <div class="tools-visual-badge">SKILL.md</div>
      <div class="tools-skills-stack">
        <div class="tools-skills-doc">
          <div class="tools-skills-fence">---</div>
          <div class="tools-skills-frontmatter-row">
            <span class="tools-skills-key">name:</span>
            <span class="tools-skills-value">slidev</span>
          </div>
          <div class="tools-skills-frontmatter-row tools-skills-frontmatter-row-description">
            <span class="tools-skills-key">description:</span>
            <span class="tools-skills-value">Create and present web-based slidedecks for developers</span>
          </div>
          <div class="tools-skills-fence">---</div>
          <div class="tools-skills-body-label">instructions</div>
          <div class="tools-skills-lines tools-skills-lines-document">
            <span class="tools-skill-line"></span>
            <span class="tools-skill-line tools-skill-line-medium"></span>
            <span class="tools-skill-line"></span>
            <span class="tools-skill-line tools-skill-line-short"></span>
          </div>
        </div>
        <div class="tools-skills-assets">
          <div class="tools-skills-asset-card">
            <div class="tools-skills-asset-title">instructies</div>
          </div>
          <div class="tools-skills-asset-card tools-skills-asset-card-accent">
            <div class="tools-skills-asset-title">scripts</div>
          </div>
          <div class="tools-skills-asset-card">
            <div class="tools-skills-asset-title">binaries</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

# Tools: Skills

<div class="tools-slide-stack">
  <p class="tools-slide-lead">Skills geven een agent extra gedrag, domeinkennis en vaak ook hulpmiddelen om mee te werken.</p>
  <div class="tools-callout-grid">
    <div class="tools-callout-card">
      <div class="tools-callout-label">Injectie</div>
      <p>De header wordt altijd geladen, maar de instructies pas wanneer een skill wordt geactiveerd.</p>
    </div>
    <div class="tools-callout-card tools-callout-card-highlight">
      <div class="tools-callout-label">Sterk voor</div>
      <p>Binaries ontsluiten met instructies.</p>
      <p>Personas herbruiken, bijvoorbeeld reviewer.</p>
      <p>Instructies on demand inladen.</p>
    </div>
  </div>
</div>

---
layout: default
---

<SubagentSessionLeak />

---
layout: default
---

<SubagentSessionIsolated />

---
layout: text-image-right
image: ./images/caveman.png
---

<template #right>
  <SubagentToolFlow />
</template>

# Tools: Subagents as tool

<div class="tools-slide-stack">
  <p class="tools-slide-lead">Een subagent is in je hoofdchat gewoon een tool-call: je geeft instructies en modelconfig mee, krijgt precies één final response terug.</p>
  <div class="tools-callout-grid">
    <div class="tools-callout-card">
      <div class="tools-callout-label">Tool</div>
      <p>Voor de hoofdagent is een subagent niet speciaal: het is gewoon een tool die je vanuit de chat aanroept.</p>
    </div>
    <div class="tools-callout-card tools-callout-card-highlight">
      <div class="tools-callout-label">Input</div>
      <p>De tool-call bevat de taak plus runtime-keuzes, zoals instructies, agentselectie en modelconfig.</p>
    </div>
    <div class="tools-callout-card">
      <div class="tools-callout-label">Terug in context</div>
      <p>Niet de hele zoektocht komt terug, maar alleen de samengevatte final response die weer in het context window van de hoofdagent belandt.</p>
    </div>
  </div>
</div>

---
layout: default
---

# Tools: Subagents usecases

<SubagentUseCases />

---
layout: default
---

<script setup>
import AdrConceptSlide from './components/AdrConceptSlide.vue'
import JiraWorkflowSlide from './components/JiraWorkflowSlide.vue'
</script>

# Werken met een ADR

<AdrConceptSlide />

<style>
</style>

---
layout: default
---

<script setup>
import JiraWorkflowSlide from './components/JiraWorkflowSlide.vue'
</script>

# Autonoom werken vanaf Jira

<JiraWorkflowSlide />

---
layout: default
---

<script setup>
import ToolSelectionFinalSlide from './components/ToolSelectionFinalSlide.vue'
</script>

# Welke tool waar inzetten?

<ToolSelectionFinalSlide />
