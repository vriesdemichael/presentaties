---
theme: slidev-theme-belastingdienst
addons:
  - bd-examples
title: Corporate presentatie template
info: |
  PPT-achtige templatepresentatie op basis van de originele PowerPoint-bron.
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

Onze bijdrage aan een financieel gezond Nederland

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
panelTitle: Wie zijn we?
image: /images/voorbeeld-foto-1.jpg
imageCropLeft: 34.381
imageCropRight: 6.314
rows:

- iconName: gebouw_vws
  lead: Eén van de grootste
  body: overheidsorganisaties
- iconName: groep_mensen
  lead: "28.500"
  body: medewerkers
- iconName: financien
  body: Onderdeel van het
  lead: Ministerie van Financiën
  reverse: true

---

<!-- -->

---
layout: image-merktegel
backgroundImage: /images/voorbeeld-foto-2.jpg
backgroundPosition: center 18%
backgroundOffsetY: 75%
variant: statement
placement: bottom-right
eyebrow: Missie

---

Bijdragen aan een financieel gezond Nederland

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
layout: image-merktegel
backgroundImage: /images/voorbeeld-foto-3.jpg
backgroundPosition: center 51%
variant: detail
placement: bottom-left
eyebrow: Strategie

---

De Belastingdienst streeft ernaar dat burgers en bedrijven uit zichzelf
(fiscale) regels naleven, dat wil zeggen zonder dwingende en kostbare
acties van de kant van de Belastingdienst

---
layout: chapter
chapterNumber: Hoofdstuk 1
chapterTitle: Strategie en koers
subtitle: Eerste versie van een hoofdstukdia om de sectie te markeren.
image: /images/voorbeeld-foto-2.jpg

---

<!-- -->

---
layout: chapter
variant: content-right
chapterTitle: Inhoudsopgave

---

<NumberedList
  :items="[
    { label: 'Wie zijn we?', detail: 'Organisatie, mensen en positionering' },
    { label: 'Missie en strategie', detail: 'Financieel gezond Nederland als uitgangspunt' },
    { label: 'Resultaten', detail: 'Ontvangsten, aangiften en dienstverlening' },
    { label: 'Vooruitblik', detail: 'Aandachtspunten en vervolgstappen' },
  ]"
/>

---
layout: split
pageTitle: Tabel — niveau 1 (props)
rightBackground: "#ffffff"

---

De eenvoudigste manier: geef kolommen en rijen als arrays mee.
Alle celinhoud is platte tekst. Gebruik dit niveau voor feitentabellen
zonder opmaak per cel.

::right::

<!--
  Level 1: props only.
  columns = array of header labels (strings).
  rows    = array of rows; each row is an array of cell values (strings).
  Even rows get a light-blue stripe automatically.
-->
<Table
  :columns="['Kanaal', 'Q1 2025', 'Q2 2025', 'Trend']"
  :rows="[
    ['Telefonie',          '91%', '94%', '↑'],
    ['Post',               '68%', '61%', '↓'],
    ['Mijn Belastingdienst', '98%', '99%', '↑'],
    ['Balie',              '82%', '82%', '→'],
  ]"
/>

---
layout: split
pageTitle: Tabel — niveau 2 (cell slot)
rightBackground: "#ffffff"

---

Gebruik de `#cell` slot om afzonderlijke cellen eigen opmaak te geven,
zoals een kleurcode of een icoon. De rijen worden nog steeds door het
component opgebouwd — jij levert alleen de inhoud van elke cel.

::right::

<!--
  Level 2: cell scoped slot.
  The slot receives: { value, row, rowIndex, colIndex }
  You return the *contents* of the <td>, not the <td> itself.
  Here the last column (colIndex 3) gets a coloured trend indicator.
-->
<Table
  :columns="['Kanaal', 'Q1 2025', 'Q2 2025', 'Trend']"
  :rows="[
    ['Telefonie',            '91%', '94%', 'stijging'],
    ['Post',                 '68%', '61%', 'daling'],
    ['Mijn Belastingdienst', '98%', '99%', 'stijging'],
    ['Balie',                '82%', '82%', 'stabiel'],
  ]"
>
  <template #cell="{ value, colIndex }">
    <!--
      colIndex 3 = Trend column: render a colour-coded label.
      All other columns fall through to plain text.
    -->
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

---
layout: split
pageTitle: Tabel — niveau 3 (default slot)
rightBackground: "#ffffff"

---

Maximale controle: schrijf de rijen zelf als `<tr>` en `<td>`.
De kopteksten komen nog van `:columns`, maar de body is volledig vrij.
Gebruik dit niveau voor samengevoegde cellen, meerdere regels per cel
of rijgebaseerde highlights.

::right::

<!--
  Level 3: default slot — full row control.
  - Write <tr> and <td> elements yourself inside <Table>.
  - :columns still drives the header row.
  - Even-row striping no longer applies; add backgrounds inline on <td>.
  - Total rows: use a top border to signal "end of data" — avoid background
    colour that competes visually with the header.
  - You can use any HTML or Vue expression inside the cells.
-->
<Table :columns="['Kanaal', 'Score', 'Toelichting']">
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
  <!--
    Total row: border-top marks the "sum line" without competing with the header.
    Bold weight is enough to signal importance.
  -->
  <tr>
    <td style="border-top:2px solid var(--bd-contrastkleur-lintblauw);font-weight:bold">Totaal gemiddeld</td>
    <td style="border-top:2px solid var(--bd-contrastkleur-lintblauw);font-weight:bold">91%</td>
    <td style="border-top:2px solid var(--bd-contrastkleur-lintblauw);font-weight:bold">3 van 4 kanalen op of boven norm</td>
  </tr>
</Table>

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
pageTitle: Titel tekstpagina 36pt
rightBackground: "#8FCAE7"

---

## Sub titel 1 bold 24pt

- Bodytekst plignia eprovit, aceperument plignit ent alit que eniat porro eossintcium quia cuscil endaect ascipiatem eos reni reptas qui comnis
- Ectem sim as quid que necture velibusandis idipis
- Minulluptate modis unti dolo discita tiberum quietam am

## Sub titel 2 bold 24pt

- Voluptam rescipsae dit aceatia por alicim ventori busant plignit ent alit que eniat porro

::right::

<div style="font-family: var(--bd-font-bold-stack); font-size: 34pt; line-height: 1.06; max-width: 9ch; color: var(--bd-contrastkleur-lintblauw);">Voorbeeld met tekst</div>

---
layout: split
pageTitle: Lint als maatvoering
rightBackground: "#edf4f8"
clicks: 3

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
pageTitle: Titel tekstpagina 36pt
rightBackground: "#8FCAE7"

---

## Sub titel 1 bold 24pt

- Bodytekst plignia eprovit, aceperument plignit ent alit que eniat porro eossintcium quia cuscil endaect ascipiatem eos reni reptas qui comnis
- Ectem sim as quid que necture velibusandis idipis
- Minulluptate modis unti dolo discita tiberum quietam am

## Sub titel 2 bold 24pt

- Voluptam rescipsae dit aceatia por alicim ventori busant plignit ent alit que eniat porro

::right::

<div style="display: grid; grid-auto-rows: max-content; gap: 0.1rem; align-content: start; color: var(--bd-contrastkleur-lintblauw);">
  <div>
    <div style="font-size: 31pt; line-height: 1;">2.160.653</div>
    <div style="margin-top: 0.18rem; font-size: 12.5pt; line-height: 1.15;">ontvangen aangifte op 8 maart 2020</div>
  </div>
  <div>
    <div style="font-size: 31pt; line-height: 1;">3%</div>
    <div style="margin-top: 0.18rem; font-size: 12.5pt; line-height: 1.15;">Stijging tov vorig jaar</div>
  </div>
</div>

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
  Boustrophedon (slang) voorbeeld: acht stappen verdeeld over twee rijen,
  verbonden door een StepSeriesJoin die de tijdlijn laat doorlopen.
  Rij 1 loopt van links naar rechts (stap 1→4).
  Rij 2 loopt van rechts naar links (stap 8→5) zodat stap 5 uiteindelijk
  aansluit op een volgende rij of het einde markeert.
-->
<InfographicSnakeDemo />

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
