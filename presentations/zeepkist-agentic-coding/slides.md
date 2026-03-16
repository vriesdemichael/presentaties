---
theme: ../../theme
title: Agentic Coding - Deel 1
info: |
  Structuurversie (deel 1) met visuele placeholders.
class: text-left
drawings:
  persist: false
mdc: true
transition: slide-left
colorSchema: light
layout: cover
coverBg: /images/cover-bg.jpg
coverTitle: Agentic coding
subtitle: "Waarom nu?\nHoe doe je het?\nWat voor tools zijn er?\nWat kan je leren van de zeik blogs."
date: 24 maart 2026
spreker: "Michaël de Vries"
meeting: "Zeepkist · Deel 1"
---

---
layout: agenda
agendaImage: /images/robot-agenda.jpg
---

# Agenda (Deel 1)

1. Waarom nu?
2. Beschikbare tools
3. De evolutiecurve
4. Wat ging fout in de praktijk (en waarom wij juist sterk staan)
5. Teaser naar Deel 2 + pauze

---
layout: text-image-right
image: /images/agentic-speedup.jpg
backgroundPosition: center
---

# 1) Waarom nu? — Externe realiteit

De softwarewereld beweegt sneller dan ooit:

- Modellen zijn voorbij het kantelpunt waarop ze echt autonoom taken uit kunnen voeren
- Agentic coding is de norm
- Nu wachten betekent dat je over drie jaar een legacy dinosaurus bent

Kernboodschap: afwachten is ook een strategische keuze (met kosten).

---
layout: text-image-left
image: /images/agents-loading.png
---

# Waarom nu? — Interne realiteit

Agentic coding aanbesteding loopt

dus... vibecoding Soon™

**Nu is de tijd om voor te bereiden**

---
layout: text-images-right
---

# 2) Beschikbare tools

TBD — tekst over de toolcategorieën

::images::
<div class="placeholder">IDE afbeelding 1 — TBD</div>
<div class="placeholder">IDE afbeelding 2 — TBD</div>
<div class="placeholder">IDE afbeelding 3 — TBD</div>
<div class="placeholder">IDE afbeelding 4 — TBD</div>

---

# Beschikbare tools — Hoe ziet het eruit?

Deze slide wordt primair visueel.

<div class="placeholder">
  VISUELE PLACEHOLDER — Screenshotstrip (chat, IDE, terminal agent)
  <div class="placeholder-sub">
    3 panelen naast elkaar met korte labels en 1 observatie per paneel.
  </div>
</div>

---

# Mini-demo: GitHub Copilot Chat

Doel van demo (kort):

- Eenvoudige taak in chat starten
- Antwoordkwaliteit en beperkingen laten zien
- Brug maken naar "waarom proces en context allesbepalend zijn"

<div class="placeholder">
  DEMO PLACEHOLDER — Live demo buiten de presentatie
  <div class="placeholder-sub">
    Schakel naar IDE/terminal, voer korte prompt uit, keer terug met 2 lessons learned.
  </div>
</div>

---

# 3) De evolutiecurve van modellen

Hoe beter het model, hoe minder je het hoeft te sturen — maar de fouten die overblijven zijn subtieler.

- **Vroeger:** je bent menselijke linter — syntax, imports, hallucinations corrigeren
- **Nu:** je bent code reviewer — logica, edge cases, state-management bewaken
- **Straks:** je bent software architect — domein, koppeling, ontwerpprincipes bewaken

---
layout: default
---

# Cognitief budget: sturing per taak

<EvoBarChart />

---
layout: default
---

# Anatomie van een fout

<EvoErrorPyramid />

---
layout: default
---

# Commit history: gpt-oss vs Opus 4.6

<EvoCommitHistory />

---
layout: default
---

# Merge conflict: de doom loop

<EvoMergeMeltdown />

---

# 4) Kritiek uit nieuws: “agentic coding faalt”

Er zijn artikelen/cases die agentic coding hard afserveren.

Veelgehoorde conclusies:

- "De agent maakte rommel"
- "Output was niet betrouwbaar"
- "Kosten liepen op zonder resultaat"

Onze hypothese: vaak faalt vooral het proces, niet alleen de agent.

---

# Dissectie: wat ging er écht mis?

Terugkerende procesproblemen in mislukte cases:

- Onduidelijke opdracht en ontbrekende acceptatiecriteria
- Geen heldere grenzen voor autonomie en scope
- Zwakke CI-checks en onvoldoende reviewdiscipline
- Geen eigenaarschap op architectuur- en kwaliteitsbesluiten

Conclusie: chaos in proces + autonomie = voorspelbaar slechte uitkomst.

---

# Waarom wij juist sterk gepositioneerd zijn

Onze huidige manier van werken is een voordeel:

- Moderne DevOps-workflows
- GitOps-denken en traceerbare changes
- CI/CD met kwaliteitspoorten
- Bestaande discipline rond code review en samenwerking

Dat betekent: sneller veilige waarde realiseren dan teams zonder procesfundament.

---

# Verwachte winst voor ons

Waar we direct veel kunnen winnen:

- Sneller van idee naar eerste werkende implementatie
- Minder repetitief uitzoekwerk voor engineers
- Betere schaalbaarheid van ontwikkelcapaciteit per team
- Meer focus op ontwerp, kwaliteit en domeinbeslissingen

<div class="placeholder">
  VISUELE PLACEHOLDER — Voor/na vergelijking
  <div class="placeholder-sub">
    3 rijen: doorlooptijd, rework, reviewbelasting (huidig vs met agentic ondersteuning).
  </div>
</div>

---

# Breakpoint Deel 1 -> Deel 2

<div class="breakpoint">
  <strong>Teaser voor Deel 2 (na de pauze):</strong>
  <ul>
    <li>Teaminstructies en expliciet maken van aannames</li>
    <li>Wanneer je een ADR toevoegt</li>
    <li>Gebruik van skills en taakafbakening</li>
    <li>Parallelle ontwikkeling en sandboxing</li>
    <li>Agentic workflows met specificaties in GitHub/Jira</li>
  </ul>
</div>

Pauze daarna, vervolgens de technische diepte in.

---

# Pauze

Deel 1 afgerond.

<div class="placeholder">
  VISUELE PLACEHOLDER — Pauzeslide in vlakke huisstijl
  <div class="placeholder-sub">
    Rustig vlak, korte tekst, subtiele merkaccenten.
  </div>
</div>
