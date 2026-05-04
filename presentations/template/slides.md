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
coverBg: /images/cover-background.jpg
coverBgObjectPosition: "center top"
---

<!--
AGENT INSTRUCTIONS: USING THIS FILE AS A STARTING TEMPLATE

This is the minimal starting point for a new presentation.
The full theme reference is at presentations/theme-demonstration/.

WHAT TO UPDATE:
  headmatter   title, date, brandText (your business unit)
               coverBg: path to your cover photo (in public/images/)
               coverBgObjectPosition: CSS object-position to control crop anchor
               coverBgScale: optional zoom factor (e.g. 1.3); omit if not needed
  Slide 1      title (::title:: slot), date in ::footer::
  Slide 2      replace NumberedList items with your own sections

ADDONS:
  Add "reusable-widgets" to addons if you use QuestionsIllustration
  or other shared widgets. Do not add "bd-examples" — that is
  demo-only and not intended for real presentations.
-->

::title::

[Presentatietitel]

::footer::

<div>2026</div>

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
