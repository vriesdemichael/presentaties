# Presentaties

Kleine Slidev workspace voor teampresentaties.

## Snel starten

```bash
pnpm install
pnpm run deck:list
pnpm run deck:dev -- zeepkist-agentic-coding
```

Open daarna de lokale URL uit de terminal, meestal `http://localhost:3030`.

## Dagelijks gebruik

```bash
pnpm run deck:list
pnpm run deck:dev -- zeepkist-agentic-coding
pnpm run deck:build -- zeepkist-agentic-coding
pnpm run deck:export -- zeepkist-agentic-coding
```

Vervang `zeepkist-agentic-coding` door een andere decknaam uit `deck:list`.

## Nieuwe presentatie starten

Gebruik de template in `templates/deck/`.

1. Kopieer `templates/deck/` naar `presentations/<jouw-deck-naam>/`
2. Pas in `package.json` de pakketnaam aan
3. Pas in `slides.md` titel, datum en eerste slides aan
4. Start lokaal met:

```bash
pnpm run deck:dev -- <jouw-deck-naam>
```

## Huidig deelmodel

Voor nu is dit de tijdelijke werkwijze:

- teammates werken vanuit een fork of kopie van deze repo
- `theme/` en `addons/reusable-widgets/` worden als workspace packages gebruikt
- de template verwacht dus nog geen externe package registry

Doelbeeld:

- template repo voor nieuwe presentaties
- gedeelde theme package via private registry
- gedeelde addon packages via private registry

Totdat Nexus beschikbaar is, is de workspace/fork-variant de juiste tussenstap.

## Waar pas je wat aan?

- `presentations/<deck>/slides.md`: inhoud van een presentatie
- `presentations/<deck>/components/`: deck-specifieke componenten
- `theme/`: gedeelde layouts, styling en globale Slidev-theme onderdelen
- `addons/reusable-widgets/`: herbruikbare widgets voor meerdere decks

## Addon keuze

Gebruik niet automatisch het `reusable-widgets` addon.

Hanteer deze keuze:

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

## VS Code

Er zijn twee taken in `.vscode/tasks.json` voor de bestaande decks. Die gebruiken dezelfde root workflow als de commando's hierboven.