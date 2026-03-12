# Rijksoverheid image artifacts

This folder contains reusable Rijksoverheid illustration preview assets that can be used as image artifacts in presentations.

## What is here

- `Preview-Rijksillustratieset-Achtergronden-v1.0-0523-RGB-ww/`
  - 49 scene-style background illustrations
  - good for full-slide backdrops or contextual environments
  - examples: home interior, office, train platform, farm, construction site, port
- `Preview-Rijksillustratieset-Bovenaanzichten-v1.0-0523-RGB-ww/`
  - 22 top-view / hand-held / desk-detail illustrations
  - good for admin, digital service, forms, payment, office-process slides
  - examples: tablet in hand, checklist, payment card, binder, envelope, laptop
- `Preview-Rijksillustratieset-Objecten-v1.0-0523-RGB-ww/`
  - 49 standalone objects and small object scenes
  - good for composing custom slides or adding supporting visual accents
  - examples: cars, vans, truck, wheelchair, bicycle, lamp, cloud, tree, podium, guitar
- `Preview-Rijksillustratieset-Personen-Huidtint01-v1.0-0523-RGB-ww/`
  - 28 individual character illustrations
  - good for citizen, customer, employee, commuter, youth, senior, and inclusive-persona slides
- `Preview-Rijksillustratieset-Situaties-v1.0-0523-RGB-ww/`
  - 5 complete situation scenes
  - good for family, workplace, reception, presentation, and public-space storytelling slides

The PDFs in this folder are the original preview documents. The PNG folders are the directly searchable image artifacts.

## Naming convention

The PNG files have descriptive filenames in lowercase kebab-case, prefixed with the original page number.

- format: `pageNNN-short-descriptive-name.png`
- examples:
  - `page005-blue-office-workspace-with-flip-chart.png`
  - `page020-payment-card-in-hand.png`
  - `page032-wheelchair.png`
  - `page024-older-man-with-cane.png`
  - `page004-team-presentation-in-office.png`

This makes the assets easy to discover by filename search, globbing, and grep.

## How agents should search

- Search by subject keyword in filenames first.
- Use the set folders to narrow intent:
  - `Achtergronden` for environments and contextual backdrops
  - `Bovenaanzichten` for paperwork, digital devices, payment, and hand interactions
  - `Objecten` for single assets and small supporting visuals
  - `Personen-Huidtint01` for individual people
  - `Situaties` for complete narrative scenes
- If more context is needed, consult `manual-image-review.md` for each asset's:
  - background-image classification
  - single-object classification
  - scene description
  - suggested purpose

## Search keywords

Useful keywords already present in filenames include:

- environment: `home`, `office`, `corridor`, `bathroom`, `shopfront`, `cafe`, `bus-stop`, `park`, `farm`, `station`, `warehouse`, `port`
- transport: `car`, `van`, `truck`, `tractor`, `bicycle`, `cargo-bicycle`, `scooter`, `train`, `ship`
- office/admin: `checklist`, `binder`, `letter`, `envelope`, `calendar`, `badge`, `payment-card`, `laptop`, `monitor`, `flipchart`, `podium`
- people: `young-man`, `businesswoman`, `headscarf`, `older-man`, `older-woman`, `schoolboy`
- scene/story: `coffee-break`, `presentation`, `reception`, `children`, `pets`, `selfie`, `skateboarding`

## Recommended usage in presentations

- Use `Achtergronden` when a slide needs atmosphere without building a scene from scratch.
- Use `Objecten` and `Personen-Huidtint01` together when composing custom Rijksoverheid-style scenes.
- Use `Situaties` when a slide benefits from an immediately readable narrative moment.
- Use `Bovenaanzichten` for process, service, administration, forms, finance, and digital-interaction topics.

## Primary index

For the full manually reviewed inventory, use:

- `style/rijksoverheid-huisstijl/manual-image-review.md`
