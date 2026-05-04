# reusable-images

Images in this folder are shared across multiple presentations.

## Where images belong

- **Single presentation** — put the image in `presentations/<deck>/public/images/`. Reference it in slides as `/images/filename.jpg`.
- **Reused across multiple presentations** — put the image here in `reusable-images/`. Copy or symlink it into the relevant decks' `public/images/` folders, or reference it via a relative path in `vite.config.ts` if the deck is configured to resolve from the root.

## Naming

Use descriptive kebab-case filenames. Avoid names tied to a specific slide or deck so the image stays reusable.
