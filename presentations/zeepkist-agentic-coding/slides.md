---
theme: default
title: Agentic Coding - Deel 1
info: |
  Structuurversie (deel 1) met visuele placeholders.
class: text-left
drawings:
  persist: false
mdc: true
transition: slide-left
colorSchema: light
fonts:
  sans: RijksoverheidSansWebText, Segoe UI, Inter, Arial, sans-serif
---

---
theme: default
title: Agentic Coding - Deel 1
info: |
  Structuurversie (deel 1) met visuele placeholders.
class: text-left
drawings:
  persist: false
mdc: true
transition: slide-left
colorSchema: light
fonts:
  sans: RijksoverheidSansWebText, Segoe UI, Inter, Arial, sans-serif


<div class="cover-slide">
  <img class="cover-bg-art" src="/images/cover-bg.jpg" alt="Achtergrondillustratie" />
  <div class="cover-left-stack">
    <div class="cover-block-main">
      <div class="cover-content">
        <h1 class="cover-title">Agentic coding in de praktijk</h1>
        <p class="cover-sub">Waarom nu?<br />Hoe doe je het?<br />Wat voor tools zijn er?<br />Wat kan je leren van de zeik blogs.</p>
      </div>
    </div>

    <div class="cover-block-bottom">
      <div class="cover-footer">
        <div class="cover-date">24 maart 2026</div>
        <div>Michaël de Vries</div>
        Zeepkist · Deel 1
      </div>
    </div>
  </div>
</div>

---

# Agenda (Deel 1)

1. Waarom nu?
2. Beschikbare tools
3. De evolutiecurve
4. Wat ging fout in de praktijk (en waarom wij juist sterk staan)
5. Teaser naar Deel 2 + pauze

<div class="placeholder">
  VISUELE PLACEHOLDER — Agenda-layout met split-view
  <div class="placeholder-sub">
    Links bullets, rechts illustratie/icoonblok in vlakke stijl.
  </div>
</div>

---

# 1) Waarom nu? — Externe realiteit

De softwarewereld beweegt sneller dan ooit:

- Agentic features komen in IDE's, CLI's en platformtools
- Teams buiten de Belastingdienst experimenteren al in productiecontext
- De lat verschuift van "code schrijven" naar "systemen sturen"

Kernboodschap: afwachten is ook een strategische keuze (met kosten).

---

# Waarom nu? — Interne realiteit

Binnen onze context zien we tegelijk:

- Toenemende complexiteit in ketens, platformen en governance
- Druk op snelheid én kwaliteit
- Groeiend belang van herhaalbaarheid en auditability

Agentic coding is relevant als versneller van bestaand vakmanschap, niet als vervanger.

---

# Waarom nu? — De komende golf

Binnen afzienbare tijd komen coding agents breder beschikbaar en volwassener in gedrag.

- Meer autonome uitvoering binnen guardrails
- Betere contextverwerking over repository en workflows
- Hogere verwachtingen van teams en stakeholders

<div class="placeholder">
  VISUELE PLACEHOLDER — Tijdlijn “nu -> komende 12-24 maanden”
  <div class="placeholder-sub">
    Markeer: huidige copilots, opkomst coding agents, verwachte standaardisering.
  </div>
</div>

---

# 2) Beschikbare tools — Overzicht

Toollandschap op dit moment:

- Chat-assistenten (vraag/antwoord, uitleg, snippets)
- IDE-assistenten (inline hulp, refactors, testondersteuning)
- CLI/agent-workflows (taken over meerdere bestanden/repo-scope)
- Platformintegraties (GitHub/Jira/CI-gedreven flows)

<div class="placeholder">
  VISUELE PLACEHOLDER — Toolmatrix met 4 kwadranten
  <div class="placeholder-sub">
    Assen: autonomie (laag-hoog) vs scope (lokaal-repo/organisatiebreed).
  </div>
</div>

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

Van "veel handwerk in prompts" naar "proactieve contextgevoelige assistentie".

- Vroege/zwakkere modellen: veel expliciete instructies nodig voor simpele taken
- Huidige generatie: bruikbaar, maar nog variabel en contextgevoelig
- Toekomstbeeld: modellen anticiperen beter op intentie en randvoorwaarden

Belangrijk: volwassenheid van model én teamproces bepalen de waarde.

---

# Evolutiecurve — Conceptgrafiek

<div class="placeholder">
  GRAFIEK PLACEHOLDER
  <div class="placeholder-sub">
    X-as: modelgeneratie/tijd
    Y-as: benodigde expliciete sturing per taak

    Curve 1 (daalt): hoeveelheid handmatige promptsturing
    Curve 2 (stijgt): taakbegrip en contextgevoeligheid

    Ankerpunten: "GPT-OSS-achtig handwerk" -> "huidige copilots" -> "toekomstige proactieve agents".
  </div>
</div>

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
