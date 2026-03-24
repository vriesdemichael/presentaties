# Shared Slidev Theme

This package is the single Slidev theme used by decks in this repository.

## What belongs here

- Shared styling tokens and global CSS
- Base layouts
- Brand chrome and theme-level defaults

## Separation of concerns

Use this split:

- `theme/` for styling and layouts
- `addons/reusable-widgets/` for optional reusable visuals
- `presentations/<deck>/components/` for deck-specific one-offs

That keeps the theme distributable without bundling every reusable visual into the base style package.

## Package-based use

Presentations can consume this theme as a local package dependency:

```json
{
	"dependencies": {
		"slidev-theme-belastingdienst": "file:../../theme"
	}
}
```

Then in deck headmatter:

```yaml
---
theme: slidev-theme-belastingdienst
---
```

## Layout slot sugar

The shared layouts now expose named slots so deck authors can use Slidev slot sugar instead of being locked into prop-only layouts.

Examples:

```md
---
layout: text-image-right
image: /images/example.png
---

# Default left content

::image::

<MyCustomVisual />
```

```md
---
layout: agenda
---

# Agenda

1. Intro
2. Demo

::right::

<img src="/images/human-agenda.png" alt="" />
```

Useful slot names by layout:

- `cover`: `title`, `subtitle`, `footer`, `background`
- `agenda`: `right`, `image`
- `text-image-left` and `text-image-right`: `image`
- `text-images-right`: `images`, `right`
- `text-decor-right`: `right`, `decor`
- `big-image`: `caption`, `image`
- `image-caption`: `caption`, `image`