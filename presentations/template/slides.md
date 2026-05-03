---
theme: slidev-theme-belastingdienst
title: "[Presentatietitel]"
info: |
  [Korte omschrijving van de presentatie]
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

<!--
AGENT INSTRUCTIONS: USING THIS FILE AS A STARTING TEMPLATE

This is the minimal starting point for a new presentation.
The full theme reference is at presentations/theme-demonstration/.

WHAT TO UPDATE:
  headmatter   title, date, brandText (your business unit)
  Slide 1      title (::title:: slot), date in ::footer::, background image
  Slide 2      speakerName, speakerRole, speakerTeam
  Slide 3      replace NumberedList items with your own sections

ADDONS:
  Add "reusable-widgets" to addons if you use QuestionsIllustration
  or other shared widgets. Do not add "bd-examples" — that is
  demo-only and not intended for real presentations.
-->

::background::

<img
  src="/images/cover-background.jpg"
  alt=""
  style="position: absolute; left: -5.34%; top: 0; width: 128.39%; height: 152.17%; max-width: none; display: block;"
/>

::title::

[Presentatietitel]

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
layout: chapter
chapterTitle: Inhoudsopgave

---

::bottom::

<NumberedList
  :items="[
    { label: 'Sectie één', detail: 'Korte omschrijving' },
    { label: 'Sectie twee', detail: 'Korte omschrijving' },
    { label: 'Sectie drie', detail: 'Korte omschrijving' },
  ]"
/>

---
layout: chapter
chapterNumber: "01"
chapterTitle: Sectie één

---

---
layout: default
pageTitle: Slide titel

---

Inhoud van de slide.

---
layout: split
pageTitle: Slide met twee kolommen

---

::left::

Linker kolom.

::right::

Rechter kolom.

---
layout: split
leftBackground: "var(--bd-domeinkleur-lichtblauw-30)"

---

::left::

::right::

## Vragen?

<!-- To add the illustrated version, include reusable-widgets in addons
     and replace the left slot with <QuestionsIllustration /> -->
