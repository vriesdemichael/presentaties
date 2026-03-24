---
theme: slidev-theme-belastingdienst
title: Sprint Review - Product 104 Temporal
info: |
  Structuurversie met alleen cover en agenda.
class: text-left
drawings:
  persist: false
mdc: true
transition: slide-left
colorSchema: light
layout: cover
coverBgRightHalf: true
---

::background::

<img
  src="/images/pipeline-image.png"
  alt=""
  style="width: 100%; height: 100%; object-fit: contain; object-position: right bottom; display: block;"
/>

::title::

Sprint review

::subtitle::

Product 104<br>
Temporal

::footer::

<div>16 maart 2026</div>
<div>Team Product 104</div>
<div>Sprint Review</div>

---
layout: agenda
---

# Agenda

1. Waarom AI pipelines?
2. Demo opzet
3. Demo resultaten
4. Vervolg

::right::

<img
  src="/images/human-agenda.png"
  alt=""
  style="width: 100%; height: 100%; object-fit: contain; object-position: center bottom; display: block;"
/>

---
layout: text-image-right
---

# Waarom AI pipelines

- Nu gebruiken we IECD voor pipelines met queue
- Queue oplossing geniet slechte ondersteuning,
  - rq-dashboard is bijv al lang niet meer ondersteund en gebruikt nog flask.
  - queue mechanisme is maatwerk met rq
- IECD heeft al lange tijd een feature freeze

::image::

<img
  src="/images/iced-transparent.png"
  alt=""
  style="max-width: 100%; max-height: 100%; object-fit: contain; display: block; mix-blend-mode: multiply;"
/>

---
layout: text-image-left
---

# Demo opzet

- Deploy temporal infra
- Demo app met:
  - OCR (RolmOCR)
  - Extraction (gpt-oss-120B)
  - Classification (gpt-oss-120B)
- Uitproberen!

::image::

<img
  src="/images/temporal-logo-white.svg"
  alt=""
  style="max-width: 180%; max-height: 180%; object-fit: contain; display: block; mix-blend-mode: multiply;"
/>

---
layout: center
---

<div class="text-7xl font-semibold">DEMO</div>

---
layout: text-image-right
---

# Demo resultaten

Te hoge verwachtingen:

- http-queue mechanisme ontbreekt
- Geen claim-check systeem voor grote bestanden
- Niet gemaakt voor workflow -> andere workflow
- alle data inzichtelijk -> multitenant moeilijk


Maar wel:
- Veel garanties over output
- Robuust met retries
- Heel geschikt voor system-to-system

::image::

<img
  src="/images/emoji-questioning.png"
  alt=""
  style="max-width: 100%; max-height: 100%; object-fit: contain; display: block; mix-blend-mode: multiply;"
/>

---
layout: center
class: text-left wide-content
---

# Waarvoor maken wij AI pipelines?

<div class="grid grid-cols-2 gap-10 mt-6 items-start">
  <div>
    Toekomst: geen implementaties door COG<br>
    AI pipeline als <em>golden path</em> voor ART BO teams
  </div>
  <div>
    <div class="font-semibold mb-2">Cognitive OVERLOAD</div>
    <ul>
      <li>Devops werken</li>
      <li>gitops</li>
      <li>openshift</li>
    </ul>
    <div class="font-semibold mt-3 mb-2">Maar nu ook:</div>
    <ul>
      <li>grpc</li>
      <li>technische dashboard van temporal</li>
      <li>Temporal queue mechanisme</li>
      <li>De 10000 opties die temporal biedt</li>
    </ul>
  </div>
</div>

---
layout: text-image-left
---

# Vervolg:

Tweede demo met alternatief:
  - pydantic-ai graph
  - taskiq + dashboard

Focus verleggen: 
1. Simpel beginnen
2. Later volwassen maken

::image::

<img
  src="/images/pydantic-logo-darkblue.svg"
  alt=""
  style="max-width: 58%; max-height: 58%; object-fit: contain; display: block; mix-blend-mode: multiply;"
/>
