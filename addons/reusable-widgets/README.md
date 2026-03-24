# Reusable Slidev Widgets

Optional Slidev addon for presentation widgets that are reusable across decks but do not belong in the shared visual theme.

## Use

Add this addon as a local package dependency in the consuming deck:

```json
{
  "dependencies": {
    "slidev-addon-reusable-widgets": "file:../../addons/reusable-widgets"
  }
}
```

Then enable it in deck headmatter next to the theme:

```yaml
---
theme: slidev-theme-belastingdienst
addons:
  - reusable-widgets
---
```

## Current widgets

- `GitLogCompare`
- `EvoCommitHistory`
- `EvoErrorPyramid`

Rule of thumb:

- `theme/` owns styling, tokens, base layouts, and brand chrome
- `addons/reusable-widgets/` owns optional reusable visuals