---
theme: ../../theme
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
coverBg: /images/pipeline-image.png
coverBgRightHalf: true
coverTitle: Sprint review
subtitle: "Product 104\nTemporal"
date: 16 maart 2026
spreker: "Team Product 104"
meeting: "Sprint Review"
---

---
layout: agenda
agendaImage: /images/human-agenda.png
backgroundSize: auto 66%
---

# Agenda

1. Waarom AI pipelines?
2. Demo opzet
3. Demo resultaten
4. Vervolg

---
layout: text-image-right
image: /images/iced-transparent.png
---

# Waarom AI pipelines

- Nu gebruiken we IECD voor pipelines met queue
- Queue oplossing geniet slechte ondersteuning,
  - rq-dashboard is bijv al lang niet meer ondersteund en gebruikt nog flask.
  - queue mechanisme is maatwerk met rq
- IECD heeft al lange tijd een feature freeze

---
layout: text-image-left
image: /images/temporal-logo-white.svg
imageMaxWidth: 180%
imageMaxHeight: 180%
---

# Demo opzet

- Deploy temporal infra
- Demo app met:
  - OCR (RolmOCR)
  - Extraction (gpt-oss-120B)
  - Classification (gpt-oss-120B)
- Uitproberen!

---
layout: center
---

<div class="text-7xl font-semibold">DEMO</div>

---
layout: text-image-right
image: /images/emoji-questioning.png
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
image: /images/pydantic-logo-darkblue.svg
imageMaxWidth: 58%
imageMaxHeight: 58%
---

# Vervolg:

Tweede demo met alternatief:
  - pydantic-ai graph
  - taskiq + dashboard

Focus verleggen: 
1. Simpel beginnen
2. Later volwassen maken
