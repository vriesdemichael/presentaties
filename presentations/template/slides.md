---
theme: slidev-theme-belastingdienst
addons:
  - bd-examples
title: Slidev belastingdienst thema
info: |
  Template en toelichting voor het Slidev Belastingdienst thema.
class: text-left
drawings:
  persist: false
mdc: true
transition: slide-left
colorSchema: light
layout: cover
brandText: Belastingdienst
date: 2026
---

::background::

<img
  src="/images/voorbeeld-foto-4.jpg"
  alt=""
  style="position: absolute; left: -5.34%; top: 0; width: 128.39%; height: 152.17%; max-width: none; display: block;"
/>

::title::

Slidev belastingdienst thema

::footer::

<div>2026</div>

---
layout: speaker
speakerName: "[Naam spreker]"
speakerRole: "[functie - met kleine letter]"
speakerTeam: "[Team - met hoofdletter]"

---

<!-- -->

---
layout: fact-panel
panelTitle: Waarom slidev?
image: /images/voorbeeld-foto-1.jpg
imageCropLeft: 34.381
imageCropRight: 6.314
rows:

- iconName: tegelweergave
  lead: Herbruikbare layouts
  body: Kant-en-klare layouts en componenten voor iedere dia
- iconName: rijkshuisstijl
  lead: Belastingdienst huisstijl
  body: Gebaseerd op Rijkshuisstijl en merkrichtlijnen
- iconName: intelligence
  lead: Eenvoudig met AI
  body: Maak presentaties met een coding agent

---

<!-- -->

---
layout: chapter
variant: content-right
chapterTitle: Inhoudsopgave

---

<NumberedList
  :items="[
    { label: 'Maten en stijl', detail: 'Maatvoering en tekstopmaak' },
    { label: 'Herbruikbare layouts', detail: 'Layouts en kleurinstellingen' },
    { label: 'Herbruikbare componenten', detail: 'Tabellen, diagrammen en infographic componenten' },
    { label: 'Voorbeelden', detail: 'Infographics en merktegelslides' },
  ]"
/>

---
layout: split
pageTitle: Lint als maatvoering
rightBackground: "#edf4f8"
clicks: 2

---

## Vaste meeteenheid

- De breedte van het lint is de basiseenheid `X`
- De contentgrens ligt `1X` uit de buitenrand: `1/2 X` marge + `1/2 X` inset
- Boven de content geldt: linthoogte + `1/2 X`
- Tussen de twee contentvlakken ligt effectief `2X`

## Vertaling naar slides

- Plaats eerst het lint exact midden bovenaan
- Gebruik in slides het SVG-lint van `1X x 2X`
- Lees rechts: buitenkader = slide, oranje kader = contentgrens
- Meet vanaf het hele slidevlak, niet vanaf een halve kolom

::right::

<MeasurementExplainer :clicks="$clicks" />

---
layout: split
pageTitle: Typografie
rightBackground: "#8FCAE7"

---

## Tekstopmaak

Schrijf `## Koptekst` voor een kop op 20pt (h2). Gebruik `#` voor 26pt (h1)
of `###` voor 16pt (h3). De paginatitel bovenaan is altijd 19pt via `pageTitle`.

## Bodytekst en lijsten — 12pt

- Gewone alinea's en lijstitems renderen op 12pt
- Gebruik `**vet**` of `_cursief_` voor nadruk
- De koptekst links (28pt) is de display-grootte van het split-layout

::right::

<div style="display: grid; gap: 0.5rem; align-content: start; color: var(--bd-contrastkleur-lintblauw);">
  <div style="font-size: 26pt; line-height: 1.1;"># H1 — 26pt</div>
  <div style="font-size: 20pt; line-height: 1.1;">## H2 — 20pt</div>
  <div style="font-size: 16pt; line-height: 1.1;">### H3 — 16pt</div>
  <div style="font-size: 13pt; line-height: 1.1;">#### H4 — 13pt</div>
  <div style="font-size: 12pt; line-height: 1.3; margin-top: 0.5rem;">Bodytekst — 12pt</div>
  <div style="font-size: 19pt; line-height: 1.1; margin-top: 0.5rem; opacity: 0.6;">pageTitle — 19pt</div>
  <div style="font-size: 28pt; line-height: 1.1; opacity: 0.6;">display (split) — 28pt</div>
</div>

---
layout: split
pageTitle: Kleuren
rightBackground: "#ffffff"

---

## CSS-tokens

Gebruik altijd de token-naam, nooit een vaste hex.
Zo blijft de presentatie consistent met de huisstijl.

- **Lintblauw** — koppen, iconen, dominante UI-elementen
- **Lichtblauw-tints** — achtergronden, strepen, panels
- **Accentkleuren** — dataseries in grafieken, highlights
- **Signaalkleur** — status en waarschuwingen
- **Tekst** — bodytekst en secundaire labels

::right::

<div style="display:grid; grid-template-columns:1fr 1fr; gap:0.35rem 1rem; align-content:start; font-size:9pt; font-family:monospace;">

  <div style="grid-column:1/-1; font-size:10pt; font-family:sans-serif; font-weight:bold; color:#154273; margin-bottom:0.1rem;">Contrast &amp; tekst</div>

  <div style="display:flex; align-items:center; gap:0.4rem;">
    <div style="width:2.2rem;height:1.1rem;background:#154273;border-radius:2px;flex-shrink:0;"></div>
    <span>lintblauw<br><span style="opacity:.6">#154273</span></span>
  </div>
  <div style="display:flex; align-items:center; gap:0.4rem;">
    <div style="width:2.2rem;height:1.1rem;background:#1f2f3f;border-radius:2px;flex-shrink:0;"></div>
    <span>tekst-primair<br><span style="opacity:.6">#1f2f3f</span></span>
  </div>

  <div style="grid-column:1/-1; font-size:10pt; font-family:sans-serif; font-weight:bold; color:#154273; margin-top:0.4rem; margin-bottom:0.1rem;">Lichtblauw tints</div>

  <div style="display:flex; align-items:center; gap:0.4rem;">
    <div style="width:2.2rem;height:1.1rem;background:#8fcae7;border:1px solid #ccc;border-radius:2px;flex-shrink:0;"></div>
    <span>lichtblauw<br><span style="opacity:.6">#8fcae7</span></span>
  </div>
  <div style="display:flex; align-items:center; gap:0.4rem;">
    <div style="width:2.2rem;height:1.1rem;background:#cce7f4;border:1px solid #ccc;border-radius:2px;flex-shrink:0;"></div>
    <span>lichtblauw-45<br><span style="opacity:.6">#cce7f4</span></span>
  </div>
  <div style="display:flex; align-items:center; gap:0.4rem;">
    <div style="width:2.2rem;height:1.1rem;background:#ddeff8;border:1px solid #ccc;border-radius:2px;flex-shrink:0;"></div>
    <span>lichtblauw-30<br><span style="opacity:.6">#ddeff8</span></span>
  </div>
  <div style="display:flex; align-items:center; gap:0.4rem;">
    <div style="width:2.2rem;height:1.1rem;background:#eef7fc;border:1px solid #ccc;border-radius:2px;flex-shrink:0;"></div>
    <span>lichtblauw-15<br><span style="opacity:.6">#eef7fc</span></span>
  </div>

  <div style="grid-column:1/-1; font-size:10pt; font-family:sans-serif; font-weight:bold; color:#154273; margin-top:0.4rem; margin-bottom:0.1rem;">Accent &amp; signaal</div>

  <div style="display:flex; align-items:center; gap:0.4rem;">
    <div style="width:2.2rem;height:1.1rem;background:#007bc7;border-radius:2px;flex-shrink:0;"></div>
    <span>hemelblauw<br><span style="opacity:.6">#007bc7</span></span>
  </div>
  <div style="display:flex; align-items:center; gap:0.4rem;">
    <div style="width:2.2rem;height:1.1rem;background:#ffb612;border-radius:2px;flex-shrink:0;"></div>
    <span>donkergeel<br><span style="opacity:.6">#ffb612</span></span>
  </div>
  <div style="display:flex; align-items:center; gap:0.4rem;">
    <div style="width:2.2rem;height:1.1rem;background:#e17000;border-radius:2px;flex-shrink:0;"></div>
    <span>oranje<br><span style="opacity:.6">#e17000</span></span>
  </div>
  <div style="display:flex; align-items:center; gap:0.4rem;">
    <div style="width:2.2rem;height:1.1rem;background:#a90061;border-radius:2px;flex-shrink:0;"></div>
    <span>violet<br><span style="opacity:.6">#a90061</span></span>
  </div>
  <div style="display:flex; align-items:center; gap:0.4rem;">
    <div style="width:2.2rem;height:1.1rem;background:#d52b1e;border-radius:2px;flex-shrink:0;"></div>
    <span>rood<br><span style="opacity:.6">#d52b1e</span></span>
  </div>
  <div style="display:flex; align-items:center; gap:0.4rem;">
    <div style="width:2.2rem;height:1.1rem;background:#39870c;border-radius:2px;flex-shrink:0;"></div>
    <span>groen<br><span style="opacity:.6">#39870c</span></span>
  </div>

</div>

---
layout: chapter
variant: content-right
chapterNumber: "Voorbeelden"
chapterTitle: Herbruikbare layouts

---

```yaml
---
layout: chapter
chapterTitle: Mijn sectietitel
---
```

::subtitle::

Alle slides in deze presentatie zijn gemaakt met herbruikbare layouts. Dit is: `chapter`.

---
layout: image-merktegel
backgroundImage: /images/voorbeeld-foto-2.jpg
backgroundPosition: center 18%
backgroundOffsetY: 75%
variant: statement
placement: bottom-right
eyebrow: image-merktegel

---

Voor grote statements en overgangen tussen onderwerpen

---
layout: image-merktegel
backgroundImage: /images/voorbeeld-foto-3.jpg
backgroundPosition: center 51%
variant: detail
placement: bottom-left
eyebrow: Varianten

---

Layouts hebben varianten om het gedrag of de stijl aan te passen. Dit is variant `detail`.

---
layout: split
pageTitle: Tabel
rightBackground: "#ffffff"
clicks: 2

---

<div v-if="$clicks === 0">

## Niveau 1

De eenvoudigste manier: geef kolommen en rijen als arrays mee.
Alle celinhoud is platte tekst. Gebruik dit niveau voor feitentabellen
zonder opmaak per cel.

- `:columns` — array van kopteksten
- `:rows` — array van rijen; elke rij is een array van celwaarden
- Afwisselende rijen krijgen automatisch een lichtblauwe streep

</div>

<div v-else-if="$clicks === 1">

## Niveau 2

Gebruik de `#cell` slot om cellen eigen opmaak te geven, zoals een
kleurcode of een icoon. Rijen worden nog steeds door `:rows` opgebouwd.

- Slot ontvangt `{ value, row, rowIndex, colIndex }`
- Jij levert de *inhoud* van de `<td>`, niet de `<td>` zelf
- Alle overige kolommen vallen door naar platte tekst via `<template v-else>`

</div>

<div v-else>

## Niveau 3

Maximale controle: schrijf de rijen zelf als `<tr>` en `<td>`.
Kopteksten komen nog van `:columns`, de body is volledig vrij.

- Gebruik voor samengevoegde cellen, meerdere regels of rijhighlights
- Even-rij-striping vervalt; voeg zelf `background` toe op `<td>`
- Totaalrijen: gebruik `border-top` in plaats van een achtergrondkleur

</div>

::right::

<!--
  Niveau 1: props only.
  columns = array of header labels (strings).
  rows    = array of rows; each row is an array of cell values (strings).
  Even rows get a light-blue stripe automatically.
-->
<Table
  v-if="$clicks === 0"
  :columns="['Kanaal', 'Q1 2025', 'Q2 2025', 'Trend']"
  :rows="[
    ['Telefonie',            '91%', '94%', '↑'],
    ['Post',                 '68%', '61%', '↓'],
    ['Mijn Belastingdienst', '98%', '99%', '↑'],
    ['Balie',                '82%', '82%', '→'],
  ]"
/>

<!--
  Niveau 2: #cell scoped slot.
  The slot receives: { value, row, rowIndex, colIndex }
  You return the *contents* of the <td>, not the <td> itself.
  Here the last column (colIndex 3) gets a colour-coded trend indicator.
-->
<Table
  v-else-if="$clicks === 1"
  :columns="['Kanaal', 'Q1 2025', 'Q2 2025', 'Trend']"
  :rows="[
    ['Telefonie',            '91%', '94%', 'stijging'],
    ['Post',                 '68%', '61%', 'daling'],
    ['Mijn Belastingdienst', '98%', '99%', 'stijging'],
    ['Balie',                '82%', '82%', 'stabiel'],
  ]"
>
  <template #cell="{ value, colIndex }">
    <span
      v-if="colIndex === 3"
      :style="{
        color: value === 'stijging'
          ? 'var(--bd-signaalkleur-groen)'
          : value === 'daling'
            ? 'var(--bd-signaalkleur-rood)'
            : 'var(--bd-contrastkleur-lintblauw)',
        fontWeight: 'bold',
      }"
    >{{ value }}</span>
    <template v-else>{{ value }}</template>
  </template>
</Table>

<!--
  Niveau 3: default slot — full row control.
  - Write <tr> and <td> elements yourself inside <Table>.
  - :columns still drives the header row.
  - Even-row striping no longer applies; add backgrounds inline on <td>.
  - Total rows: use a top border to signal "end of data".
-->
<Table v-else :columns="['Kanaal', 'Score', 'Toelichting']">
  <tr>
    <td>Telefonie</td>
    <td><strong style="color:var(--bd-signaalkleur-groen)">94%</strong></td>
    <td>Boven streefwaarde; capaciteit stabiel</td>
  </tr>
  <tr>
    <td style="background:var(--bd-domeinkleur-lichtblauw-15)">Post</td>
    <td style="background:var(--bd-domeinkleur-lichtblauw-15)"><strong style="color:var(--bd-signaalkleur-rood)">61%</strong></td>
    <td style="background:var(--bd-domeinkleur-lichtblauw-15)">Onder norm; zie capaciteitsplan Q3</td>
  </tr>
  <tr>
    <td>Mijn Belastingdienst</td>
    <td><strong style="color:var(--bd-signaalkleur-groen)">99%</strong></td>
    <td>Beschikbaarheid SLA gehaald</td>
  </tr>
  <tr>
    <td style="background:var(--bd-domeinkleur-lichtblauw-15)">Balie</td>
    <td style="background:var(--bd-domeinkleur-lichtblauw-15)"><strong>82%</strong></td>
    <td style="background:var(--bd-domeinkleur-lichtblauw-15)">Stabiel; geen afwijking</td>
  </tr>
  <tr>
    <td style="border-top:2px solid var(--bd-contrastkleur-lintblauw);font-weight:bold">Totaal gemiddeld</td>
    <td style="border-top:2px solid var(--bd-contrastkleur-lintblauw);font-weight:bold">91%</td>
    <td style="border-top:2px solid var(--bd-contrastkleur-lintblauw);font-weight:bold">3 van 4 kanalen op of boven norm</td>
  </tr>
</Table>

<!--
  Table props:
  columns[]:    array van kopteksten (strings)
  rows[][]:     array van rijen met celwaarden — optioneel bij gebruik van default slot
  #cell slot:   { value, row, rowIndex, colIndex } — geeft controle per cel zonder volledige rijen te schrijven
  default slot: volledige <tr><td> vrijheid — :columns drijft nog de koptekstrij
-->

---
layout: content-image
contentTitle: Tekst en beeld
intro: Eerste versie van een presentatie-slide met tekst links en beeld rechts op de vaste middenas.
image: /images/voorbeeld-foto-1.jpg
---

De beeldhelft blijft los van de teksthelft zodat beide vanuit dezelfde centrale
vlakverdeling kunnen worden opgebouwd.

---
layout: split
pageTitle: Tekst naast beeldvlak
rightBackground: "#ffffff"

---

## Ruimere presentatiemarge

- De lintmaat is het uitgangspunt; in presentaties mag content meer lucht krijgen dan de minimale 1/2 X
- Daarom hanteren deze voorbeelden een ruimere zijmarge, zodat tekst en beeld beter aansluiten
- Alleen achtergrondbeelden mogen tot aan de rand doorlopen; een zelfstandig beeldvlak niet

## Plaatsaanduiding voor beeld

- Deze grijze plaatshouder toont de veilige beeldzone
- Een foto kan hier later worden geplaatst zonder marge- of leesregels te doorbreken

::right::

<Placeholder />

---
layout: split
pageTitle: Kleurkeuze in grafiek
rightBackground: "#edf4f8"

---

## Opbouw van het palet

- Lichtblauw is de hoofdkleur: corporate en rustgevend voor de grafiek
- Donkerblauw draagt titels en labels voor leesbaarheid
- De bleke ondergrond houdt de grafiek visueel los van het tekstvlak

## Accentkleuren voor nadruk

- Magenta en oranje markeren uitzonderingen of onderscheidende reeksen
- De extra blauwtint geeft hiërarchie binnen een dataserie zonder het palet te verstoren
- Zo blijft de grafiek herkenbaar Belastingdienst én goed scanbaar

::right::

<BarChart
  title="Grafiektitel"
  :rows="[
    { label: 'Categorie 1', segments: [{ width: '42%', color: '#8FCAE7' }, { width: '8%', color: '#00689E' }, { width: '8%', color: '#A90061' }, { width: '7%', color: '#E17000' }] },
    { label: 'Categorie 1', segments: [{ width: '7%', color: '#B5DDEF' }, { width: '7%', color: '#8FCAE7' }, { width: '7%', color: '#00689E' }, { width: '5%', color: '#A90061' }, { width: '4%', color: '#E17000' }] },
    { label: 'Categorie 2', segments: [{ width: '9%', color: '#8FCAE7' }, { width: '8%', color: '#00689E' }, { width: '8%', color: '#A90061' }, { width: '26%', color: '#E17000' }] },
    { label: 'Categorie 1', segments: [{ width: '13%', color: '#8FCAE7' }, { width: '8%', color: '#00689E' }, { width: '9%', color: '#A90061' }, { width: '4%', color: '#E17000' }] },
  ]"
  :legend="[
    { label: 'Reeks 1', color: '#B5DDEF' },
    { label: 'Reeks 2', color: '#8FCAE7' },
    { label: 'Reeks 3', color: '#00689E' },
    { label: 'Reeks 4', color: '#DDEFF8' },
    { label: 'Reeks 5', color: '#A90061' },
    { label: 'Reeks 6', color: '#E17000' },
  ]"
/>

---
layout: split
pageTitle: Titel tekstpagina 28pt
rightBackground: "#8FCAE7"

---

## Sub titel 1 bold 20pt

- Bodytekst plignia eprovit, aceperument plignit ent alit que eniat porro eossintcium quia cuscil endaect ascipiatem eos reni reptas qui comnis
- Ectem sim as quid que necture velibusandis idipis
- Minulluptate modis unti dolo discita tiberum quietam am

## Sub titel 2 bold 20pt

- Voluptam rescipsae dit aceatia por alicim ventori busant plignit ent alit que eniat porro

::right::

<div style="font-family: var(--bd-font-bold-stack); font-size: var(--bd-text-display); line-height: 1.06; max-width: 9ch; color: var(--bd-contrastkleur-lintblauw);">Voorbeeld met tekst</div>

---
layout: split
pageTitle: DonutChart
mirror: true
rightBackground: "#edf4f8"
clicks: 3

---

<div v-if="$clicks === 0">

## Standaard gebruik

Geef `segments` mee als array. Elk item heeft minimaal een `value`. Kleuren worden automatisch gekozen uit het merkpalet.

- `label` verschijnt buiten de ring als tekst
- `labelFormat: 'percent'` — standaard, berekend percentage
- Kleuren: volgorde uit merkpaletvariabelen in CSS

</div>

<div v-else-if="$clicks === 1">

## `labelFormat` en `valueLabel`

Met `labelFormat="value"` worden ruwe waarden getoond. Een `valueLabel` per segment overschrijft de berekende waarde, ongeacht `labelFormat`.

- `labelFormat: 'value'` — toont `segment.value` direct
- `valueLabel: '79%'` op segment 1 — overschrijft naar tekst naar keuze
- Overige segmenten: tonen ruwe waarden (`14`, `6`, `1`)

</div>

<div v-else-if="$clicks === 2">

## Ring aanpassen

Voeg `highlighted: true` toe aan een segment om het verder van het midden af te plaatsen. Combineer met een eigen `color` voor extra nadruk. Met `innerRatio` bepaal je de dikte van de ring.

- `highlighted: true` op meerdere segmenten tegelijk mogelijk
- `color: 'var(--bd-signaalkleur-donkergeel)'` overschrijft de automatische kleur
- `highlightOffset` prop bepaalt de uitsteekafstand in SVG-eenheden (standaard `7`)
- `innerRatio` — fractie van de buitenstraal voor de binnenstraal (standaard `0.55`, hoger = dunner)

</div>

<div v-else>

## Legenda en center-slot

Zet `:legend="true"` voor een legendapaneel naast of onder de ring. Gebruik `legendPosition` (`right` · `left` · `below` · `above`) om de positie te bepalen. Gebruik de `#center` slot voor vrije HTML gecentreerd in het gat.

- `legendTitle` en `legendSubtitle` voor tekst boven de items
- `legendPosition`: `right` · `left` · `below` · `above` (default `right`)
- `#center` slot: vrije inhoud gecentreerd in het gat van de ring

</div>

::right::

<DonutChart
  v-if="$clicks === 0"
  style="--donut-size: 280px"
  :segments="[
    { value: 79, label: 'Mijn BD' },
    { value: 14, label: 'Software' },
    { value: 6,  label: 'App' },
    { value: 1,  label: 'Papier' },
  ]"
/>

<DonutChart
  v-else-if="$clicks === 1"
  style="--donut-size: 280px"
  labelFormat="value"
  :segments="[
    { value: 79, label: 'Mijn BD',   valueLabel: '79%' },
    { value: 14, label: 'Software' },
    { value: 6,  label: 'App' },
    { value: 1,  label: 'Papier' },
  ]"
/>

<DonutChart
  v-else-if="$clicks === 2"
  style="--donut-size: 280px"
  :inner-ratio="0.72"
  :segments="[
    { value: 79, label: 'Mijn BD' },
    { value: 14, label: 'Software', highlighted: true },
    { value: 6,  label: 'App',      highlighted: true, color: 'var(--bd-signaalkleur-donkergeel)' },
    { value: 1,  label: 'Papier' },
  ]"
/>

<DonutChart
  v-else
  style="--donut-size: 200px"
  :legend="true"
  :show-labels="false"
  legendTitle="9,3 miljoen"
  legendSubtitle="99% digitaal ontvangen"
  :segments="[
    { value: 79, label: 'Mijn Belastingdienst', valueLabel: '79%' },
    { value: 14, label: 'via aangiftesoftware',  valueLabel: '14%' },
    { value: 6,  label: 'via de Aangifte App',   valueLabel: '6%'  },
    { value: 1,  label: 'op papier',             valueLabel: '1%'  },
  ]"
>
  <template #center>
    <div style="font-family: var(--bd-font-bold-stack); font-size: 1.4rem; color: var(--bd-contrastkleur-lintblauw); line-height: 1.1;">9,3<br><span style="font-size: 0.65rem; font-family: var(--bd-font-regular-stack);">mln</span></div>
  </template>
</DonutChart>

<!--
  DonutChart props:
  segments[]:  { value, color?, label?, valueLabel?, highlighted? }
  innerRatio:  dikte ring — fractie van buitenstraal (default 0.55; hoger = dunner, bijv. 0.72)
  showLabels:  labels buiten ring — default true
  labelFormat: 'percent' | 'value' — default 'percent'; per-segment valueLabel overschrijft
  highlightOffset: uitsteek uitgelicht segment in SVG-eenheden — default 7
  legend:      toon legendapaneel — default false
  legendPosition: positie van het legendapaneel — 'right' (default) | 'left' | 'below' | 'above'
  legendTitle / legendSubtitle: tekst boven de legendaitems
  #center slot: willekeurige content gecentreerd in het gat van de ring
  --donut-size: CSS-variabele voor hoogte/breedte van de ring — default 200px
-->

---
layout: full-width
showLogo: true
pageTitle: Infographic componenten - pijlen en lijnen

---

<TemplateInfographicArrowDemo />

---
layout: full-width
showLogo: true
pageTitle: Infographic componenten - stappen en proceslijnen

---

<InfographicStepsDemo />

---
layout: full-width
showLogo: true
pageTitle: Infographic componenten - stappenlijn maatwerk

---

<InfographicStepsCustomDemo />

---
layout: full-width
showLogo: true
pageTitle: Infographic voorbeeld - van melding naar uitkomst

---

<InfographicCompositeDemo />

---
layout: full-width
showLogo: true
pageTitle: StepSeries - slangverbinding over twee rijen

---

<!--
  Boustrophedon (slang): acht stappen verdeeld over twee rijen, verbonden door
  een S-vormige lijn. StepSeriesJoin neemt row1 en row2 als arrays en tekent
  de verbindingslijn automatisch op basis van de werkelijke afmetingen.
  Gebruik row-gap om de verticale ruimte tussen de rijen te regelen.
-->
<StepSeriesJoin
  step-gap="3rem"
  :row1="[
    { label: '1', caption: 'Aangifte',    body: 'Belastingplichtige doet aangifte online' },
    { label: '2', caption: 'Ontvangst',   body: 'Belastingdienst ontvangt het verzoek' },
    { label: '3', caption: 'Controle',    body: 'Gegevens worden gevalideerd' },
    { label: '4', caption: 'Beoordeling', body: 'Inhoudelijke toetsing door de inspecteur' },
  ]"
  :row2="[
    { label: '5', caption: 'Uitspraak',   body: 'Bezwaar afgehandeld' },
    { label: '6', caption: 'Beschikking', body: 'Definitieve aanslag vastgesteld' },
    { label: '7', caption: 'Uitbetaling', body: 'Teruggaaf overgemaakt' },
    { label: '8', caption: 'Archief',     body: 'Dossier afgesloten en opgeslagen' },
  ]"
/>

---
layout: full-width
pageTitle: Eerlijk en zorgvuldig belasting heffen en innen

---

<HighlightsGrid :items="[
  { iconName: 'financien', label: '404,8 miljard', sublabel: 'Verwachte\nBelastingontvangsten' },
  { iconName: 'groep_mensen', label: '8,7 miljoen', sublabel: 'Aangiften\nInkomstenbelasting' },
  { iconName: 'zakenman', label: '24,9 miljoen', sublabel: 'Aangiften\nMKB' },
  { iconName: 'gebouw_vws', label: '1,1 miljoen', sublabel: 'Aangiften\nGrote ondernemingen' },
]" />

<InfoGridVlakDemo />

---
layout: full-width
pageTitle: Vlak — vormvarianten

---

<div style="display:flex; gap:0.75rem; align-items:stretch; height:140px; margin-bottom:1.5rem;">
  <Vlak shape="chevron-right" fill="white" border="var(--bd-domeinkleur-lichtblauw)" borderWidth="1.5px" style="flex:1; min-width:0;">
    <strong>1. Aanvraag</strong><br>Burger doet aangifte online
  </Vlak>
  <Vlak shape="chevron-right" fill="white" border="var(--bd-domeinkleur-lichtblauw)" borderWidth="1.5px" style="flex:1; min-width:0;">
    <strong>2. Ontvangst</strong><br>Belastingdienst verwerkt het verzoek
  </Vlak>
  <Vlak fill="white" border="var(--bd-domeinkleur-lichtblauw)" borderWidth="1.5px" style="flex:1; min-width:0;">
    <strong>3. Afhandeling</strong><br>Beslissing wordt vastgesteld
  </Vlak>
</div>

<div style="display:flex; gap:2rem; align-items:flex-start;">
  <Vlak shape="speech-bottom-right" fill="var(--bd-domeinkleur-lichtblauw-30)" padding="1rem" style="flex:1; min-width:0;">
    Gebruik <code>shape="speech-bottom-right"</code> voor een tekstballon met staart rechtsonder — handig bij citaten of uitleg naast een afbeelding.
  </Vlak>
  <Vlak fill="var(--bd-domeinkleur-lichtblauw-30)" variant="info-grid" :columns="2"
    :items="['Het info-grid-variant verdeelt de inhoud in een raster. Geef :columns mee voor het aantal kolommen.', 'De tweede kolom komt hier']"
    style="flex:1; min-width:0;" />
</div>

---
layout: split
pageTitle: Afsluitende tekst
mirror: true
leftBackground: "#edf4f8"
rightBackground: "#8FCAE7"
rightPadding: "0"

---

## Vragen?

Deze slide is een voorbeeld voor een afsluitende slide. Hier zijn iconen en het vlak component gebruikt voor een visuele ondersteuning van de vraagstelling.

::right::

<QuestionsIllustration />
