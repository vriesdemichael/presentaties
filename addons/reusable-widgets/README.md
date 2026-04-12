# Reusable Slidev Widgets

Optional Slidev addon for presentation widgets that are reusable across decks but do not belong in the shared visual theme.

## Use

Inside this pnpm workspace, add this addon as a workspace dependency in the consuming deck:

```json
{
  "dependencies": {
    "slidev-addon-reusable-widgets": "workspace:*"
  }
}
```

If the addon is later published, replace `workspace:*` with a normal semver version.

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