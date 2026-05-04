---
theme: belastingdienst-legacy
title: Innovatieweek april 2026 - Michael
info: |
  Eerste opzet voor de Innovatieweek-presentatie.
class: text-left
drawings:
  persist: false
mdc: true
transition: slide-left
colorSchema: light
layout: cover
coverTitle: Innovatieweek april 2026
subtitle: Michael
date: april 2026
spreker: Michael
meeting: Innovatieweek
---

---
layout: agenda
---

# Agenda

1. Wat was het plan
2. Wat is er bereikt
3. Conclusies
4. Wat is er nodig om het verder te brengen
5. Deze presentatie is gemaakt met ai slide

::right::

<div
  style="width: 100%; height: 100%; padding-top: 2rem; box-sizing: border-box; display: flex; align-items: flex-end; justify-content: center;"
>
  <img
    src="/images/human-agenda.png"
    alt=""
    style="width: 100%; height: 100%; object-fit: contain; object-position: center bottom; display: block;"
  />
</div>

---
layout: text-image-right
---

# Wat was het plan

1. GitOps Keycloak operator uitproberen in cluster
2. Slidev template beschikbaar stellen voor team

::image::

<img
  src="/images/clipboard-todo.png"
  alt="Clipboard met checklist"
  style="width: 100%; height: 100%; object-fit: contain; object-position: center center; display: block;"
/>

---
layout: text-image-left
---

# Wat is er bereikt: Keycloak

1. Uitrol van de Keycloak operator in `ml01` in plaats van de `keycloak-exp`
2. Problemen uit de test gefixt in project

<div style="height: 1.5rem"></div>

## Nog uit te voeren met nieuwere versie

1. Controleren of de Ping-integratie werkt
2. Testen met live OAuth-integratie, bijvoorbeeld via een RQ dashboard

::image::

<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden;">
  <img
    src="/images/keycloak-operator.svg"
    alt="Keycloak operator logo"
    style="width: 92%; height: 92%; max-width: none; max-height: none; object-fit: contain; object-position: center center; display: block; margin: 0 auto;"
  />
</div>

---
layout: text-image-right
---

# Wat is er bereikt: Keycloak vervolg

- **Identity & Access:** Ontbrekende IDP mapper toegevoegd
- **Configuratie:** Managed Keycloak env vars zijn nu via de chart in te stellen
- **Beveiliging:** TLS verificatie staat nu standaard aan en kan expliciet uitgezet worden
- **Releases:** Nieuwe geautomatiseerde release-workflow voor de Migration Toolkit ingericht, inclusief cross-platform binaries, checksums en SBOM's
- **Documentatie:** Volledig up-to-date gebracht en herschreven
- **Risicobeheer:** Threat modelling sessie uitgevoerd en gedocumenteerd
- **Continuiteit:** Disaster recovery- en backup-playbooks geschreven

::image::

<img
  src="/images/keycloak-diff.png"
  alt="Keycloak wijzigingenoverzicht"
  style="width: 100%; height: 100%; object-fit: contain; object-position: center center; display: block;"
/>

---
layout: text-image-left
---

# Wat is er bereikt: Slidev

- Alle hardcoded paden eruit
- Compatible met Windows en Linux gemaakt

## Voorbereiding distributie

- Thema als los artifact
- Herbruikbare componenten als los artifact
- Template repo met skelet, skills en assets als startpunt

## Hoe verder

- Publiceren op Nexus
- Belastingdienst huisstijlrichtlijnen opnemen, nu alleen Rijksoverheid richtlijnen

::image::

<img
  src="/images/slidev.png"
  alt="Slidev illustratie"
  style="width: 100%; height: 100%; object-fit: contain; object-position: center center; display: block;"
/>

---
layout: text-image-left
---

# Wat is er bereikt: Bitbucket Server CLI

`bitbucket-server-cli` (`bb`) is een CLI-applicatie voor interactie met Bitbucket Server.

Kort gezegd: de `gh` CLI voor ons Bitbucket.

## Opgeleverd

- Nieuwe feature: `bb update` geimplementeerd
- Distributie: publicatie met WinGet en Scoop
- Netwerk: alias-functionaliteit voor situaties waarin SSH- en HTTPS-hostnames niet hetzelfde zijn
- Kennisdeling: documentatie herschreven

::image::

<img
  src="/images/bitbucket-svgrepo-com.svg"
  alt="Bitbucket logo"
  style="width: 100%; height: 100%; object-fit: contain; object-position: center center; display: block;"
/>

---
layout: text-image-right
---

# Conclusies

- Met agentic coding gaat het supersnel
- Slidev: voor distributie is een publicatie op een intern registry nodig
- `bb` is awesome, ga het allemaal snel gebruiken

::image::

<img
  src="/images/bb-diff.png"
  alt="Bitbucket CLI diff"
  style="width: 100%; height: 100%; object-fit: contain; object-position: center center; display: block;"
/>

---
class: pause-slide-page
---

<div class="pause-slide">
  <img
    src="/images/break-coffee-machine.png"
    alt=""
    class="pause-slide-bg"
  >

  <div class="pause-slide-scrim"></div>

  <div class="pause-slide-card">
    <div class="pause-slide-kicker">Innovatieweek afgerond</div>
    <div class="pause-slide-title">Deze presentatie is met agentic coding gemaakt</div>
  </div>

  <div class="pause-slide-qr">
    <img
      src="/images/qr-code.png"
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
  max-width: 26rem;
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
