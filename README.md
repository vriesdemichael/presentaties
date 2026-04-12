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

## Waar pas je wat aan?

- `presentations/<deck>/slides.md`: inhoud van een presentatie
- `presentations/<deck>/components/`: deck-specifieke componenten
- `theme/`: gedeelde layouts, styling en globale Slidev-theme onderdelen
- `addons/reusable-widgets/`: herbruikbare widgets voor meerdere decks

## Werkafspraken

- Houd deck-specifieke inhoud in `presentations/<deck>/`
- Zet gedeelde layouts en styling in `theme/`
- Zet optionele herbruikbare visuals in `addons/reusable-widgets/`
- Gebruik `pnpm`, niet npm

## VS Code

Er zijn twee taken in `.vscode/tasks.json` voor de bestaande decks. Die gebruiken dezelfde root workflow als de commando's hierboven.