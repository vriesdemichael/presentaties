# Presentaties

Kleine Slidev workspace voor teampresentaties, gebouwd op het `slidev-theme-belastingdienst` thema.

## Het thema

Presentaties in deze repo gebruiken het gedeelde thema in `./theme/`. Het thema levert layouts, merkchrome, kleur- en typografietokens en herbruikbare componenten.

De thema-demonstratie in `presentations/theme-demonstration/` is zelf-documentarisch: elke layout en elk component is gedemonstreerd met uitleg en codevoorbeelden. Gebruik dit als naslag bij het bouwen van nieuwe slides.

Voor een nieuwe presentatie: gebruik `presentations/template/` als startpunt.

## Snel starten

```bash
pnpm install
pnpm run deck:list
pnpm run deck:dev -- theme-demonstration
```

Open daarna de lokale URL uit de terminal, meestal `http://localhost:3030`.

## Dagelijks gebruik

```bash
pnpm run deck:list
pnpm run deck:new -- <deck-naam>
pnpm run deck:dev -- <deck-naam>
pnpm run deck:build -- <deck-naam>
pnpm run deck:export -- <deck-naam>
```

Vervang `<deck-naam>` door een naam uit `deck:list`.

## Nieuwe presentatie starten

```bash
pnpm run deck:new -- <jouw-deck-naam>
pnpm install
pnpm run deck:dev -- <jouw-deck-naam> -- --remote --bind 0.0.0.0 -p 3030
```

`deck:new` kopieert de template, past de pakketnaam aan en geeft de volgende stappen. Pas daarna in `presentations/<jouw-deck-naam>/slides.md` de titel, datum en spreker aan.

De thema-demonstratie in `presentations/theme-demonstration/` is de volledige naslag voor alle beschikbare layouts en componenten.

## Huidig deelmodel

Voor nu is dit de tijdelijke werkwijze:

- teammates werken vanuit een fork of kopie van deze repo
- `theme/` en `addons/` worden als workspace packages gebruikt
- de template verwacht dus nog geen externe package registry

Doelbeeld:

- template repo voor nieuwe presentaties
- gedeelde theme package via private registry
- gedeelde addon packages via private registry

Totdat Nexus beschikbaar is, is de workspace/fork-variant de juiste tussenstap.

## Waar pas je wat aan?

- `presentations/<deck>/slides.md`: inhoud van een presentatie
- `presentations/<deck>/components/`: deck-specifieke componenten
- `presentations/<deck>/public/images/`: afbeeldingen die alleen door dat deck worden gebruikt
- `reusable-images/`: afbeeldingen die in meerdere decks terugkomen (zie `reusable-images/README.md`)
- `theme/`: gedeelde layouts, styling en globale Slidev-theme onderdelen
- `addons/reusable-widgets/`: herbruikbare widgets voor meerdere decks

## Addon keuze

Gebruik niet automatisch het `reusable-widgets` addon.

Er zijn twee addons in deze repo:

- **`addons/bd-examples`** — explainer-componenten die alleen in de thema-demonstratie-deck worden gebruikt (`Placeholder`, demo-helpers, enzovoort). **Voeg dit addon niet toe aan een echte presentatie.** Het is niet bedoeld voor distributie.
- **`addons/reusable-widgets`** — optionele widgets die echt in meerdere decks terugkomen (bijv. `GitLogCompare`). Voeg dit alleen toe als een widget in twee of meer decks nodig is.

Hanteer verder deze keuze:

- `theme/`: voor layouts, styling, merkuitstraling en vaste theme-onderdelen
- `presentations/<deck>/components/`: voor eenmalige deck-specifieke visuals
- `addons/reusable-widgets/`: voor optionele visuals die echt in meerdere decks terugkomen

Vuistregel:

- Eerst deck-lokaal bouwen
- Pas naar `addons/reusable-widgets/` verplaatsen als minstens twee decks het nodig hebben of als je duidelijk ziet dat het een herbruikbaar patroon is
- Alleen een apart addon maken als je een grotere, zelfstandige verzameling widgets hebt met eigen dependencies of eigen publicatiebehoefte

Dus: niet per widget een addon maken, tenzij daar echt een duidelijke grens voor bestaat. Voor deze repo is een enkel `reusable-widgets` addon de beste default.

## Werkafspraken

- Houd deck-specifieke inhoud in `presentations/<deck>/`
- Zet gedeelde layouts en styling in `theme/`
- Zet optionele herbruikbare visuals in `addons/reusable-widgets/`
- Gebruik `pnpm`, niet npm
- Houd theme en addon package-namen stabiel; die worden later de basis voor registry-publicatie
- Gebruik altijd CSS custom property tokens (`var(--bd-*)`) voor kleuren en spacing — geen UnoCSS/Tailwind kleurklassen zoals `bg-blue-100`

## VS Code

Er zijn twee taken in `.vscode/tasks.json` voor de bestaande decks. Die gebruiken dezelfde root workflow als de commando's hierboven.

## GitHub Pages

Er stond in deze repo geen bestaande Pages-automatisering meer: geen `.github/workflows/`, geen `docs/` publish target en geen `gh-pages` branch in de bereikbare historie van deze clone.

De repo publiceert nu automatisch alle decks uit `presentations/` naar GitHub Pages via Actions.

- elke deck wordt gebouwd naar een eigen subpad: `/<repo-naam>/<deck>/`
- de Pages-root krijgt een eenvoudige index met links naar alle decks
- `404.html` stuurt directe slide-URLs terug naar de juiste deck-SPA

Lokaal dezelfde publish-build draaien:

```bash
pnpm run pages:build
```

De output komt in `.pages-dist/`.
