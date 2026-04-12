# Reusable Slidev Widgets

Optional Slidev addon for presentation widgets that are reusable across decks but do not belong in the shared visual theme.

This addon is the default place for optional reusable visuals in this repo, but it should not be used by default for every new widget.

Current distribution model:

- in this repo it is consumed as a workspace package
- later it can be published unchanged to a private registry once that infrastructure exists

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
- `presentations/<deck>/components/` owns deck-specific one-offs

Decision rule:

- Start deck-local first
- Move a widget here once it is used in multiple decks or is clearly becoming a reusable pattern
- Only create a separate addon package if you have a larger independent widget family with its own lifecycle, dependencies, or publishing need