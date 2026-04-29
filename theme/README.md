# Shared Slidev Theme

This package is the shared Slidev theme used by decks in this repository.

## What belongs here

- shared styling tokens and global CSS
- layouts and brand chrome
- core presentation primitives that are part of the Belastingdienst visual language

Keep this split:

- `theme/` for theme-level styling, layouts, and primitives
- `addons/reusable-widgets/` for optional visuals reused across multiple decks
- `presentations/<deck>/components/` for deck-specific one-offs

That keeps the theme reusable without bundling every deck-specific teaching aid into the base package.

## Using the theme in this workspace

Presentations in this pnpm workspace should depend on the theme via the workspace protocol:

```json
{
  "dependencies": {
    "slidev-theme-belastingdienst": "workspace:*"
  }
}
```

Deck frontmatter:

```yaml
---
theme: slidev-theme-belastingdienst
---
```

## Authoring model

Most layouts follow the same pattern:

- **props** are the simple path for plain strings, images, and toggles
- **slots** are the override path when you need custom markup or a custom component
- when both a prop and a slot exist for the same region, the **slot wins**

Not every layout exposes slots for every region. `content-image` exposes `title`, `intro`, `media`, and the default slot — all are optional, so the left pane can carry any content via the default slot alone if you skip `contentTitle` and `intro`.

## Current layouts

These are the layouts currently present in `theme/layouts/`:

- `cover`
- `speaker`
- `chapter`
- `split`
- `content-image`
- `fact-panel`
- `full-width`
- `default`
- `image-merktegel`

Legacy layouts such as `agenda`, `text-image-right`, `text-image-left`, `text-images-right`, `text-decor-right`, `big-image`, and `image-caption` are **not part of the current theme surface** and should not be documented or used as available theme layouts.

## Layout reference

| Layout | Use for | Key props | Key slots | Notes |
| --- | --- | --- | --- | --- |
| `default` | Plain full-surface slides with theme chrome | `background` | default | Simplest layout. Good fallback when you just want normal markdown content inside the content border. |
| `full-width` | General content slides with optional heading/subheading | `pageTitle`, `pageSubtitle`, `background`, `contentPadding`, `showLogo` | default, `title`, `subtitle`, `logo` | Best general-purpose content layout when you want the ribbon and a flexible single content area. |
| `split` | Fixed 50/50 text + visual composition | `pageTitle`, `mirror`, `leftBackground`, `rightBackground`, `rightPadding` | default, `title`, `right`, `logo` | Split is intentionally fixed at 50/50. Use `mirror` to swap sides. |
| `content-image` | Text on the left, image or custom media on the right | `contentTitle`, `intro`, `body`, `image`, `imageFit` | default, `title`, `intro`, `media` | All three left-side regions (`title`, `intro`, body) are optional. Omit `contentTitle` and don't use `::title::` and the title div is not rendered at all — useful when you want to put any content in the left pane without a fixed heading. |
| `cover` | Title slide with Belastingdienst cover composition | `coverBg`, `coverBgRightHalf`, `coverTitle`, `subtitle`, `date`, `spreker`, `meeting`, `brandText` | default, `background`, `title`, `subtitle`, `footer`, `brand` | `subtitle` prop supports line breaks by splitting on `\\n`. The default slot renders extra body copy under the title/subtitle block. |
| `speaker` | Speaker introduction slide | `speakerName`, `speakerRole`, `speakerTeam`, `logoSrc` | default, `title`, `logo` | Default slot replaces the role/team block. There is no `illustration` slot in the current implementation. |
| `chapter` | Section divider with merktegel left half | `variant`, `chapterNumber`, `chapterTitle`, `subtitle`, `image`, `mirror` | default, `title`, `chapterNumber`, `subtitle`, `bottom`, `opposite` | `variant: full-bleed-image` uses the `image` prop on the opposite side. `variant: content-right` lets you place content on the opposite side via the `opposite` or default slot. |
| `fact-panel` | Structured fact rows next to a photo | `panelTitle`, `image`, `imageCropLeft`, `imageCropRight`, `logoSrc`, `rows` | `photo`, `logo`, `title` | Fact rows are prop-driven through `rows`. The layout currently normalizes and renders up to 4 rows. |
| `image-merktegel` | Full-bleed image slide with overlaid merktegel card | `backgroundImage`, `backgroundFit`, `backgroundPosition`, `backgroundOffsetX`, `backgroundOffsetY`, `backgroundScale`, `logoSrc`, `placement`, `variant`, `eyebrow`, `headline`, `cardBackground`, `textColor`, `showTab`, `tabFill` | `background`, `photo`, `logo`, `tab`, `eyebrow`, `label`, default, `body`, `headline`, `statement` | Multiple slot aliases are supported for the card copy so decks can use the naming that reads best in context. |

## Practical examples

### `default`

```md
---
layout: default
---

# Titel

Gewone markdown-content binnen de standaard content border.
```

### `full-width`

```md
---
layout: full-width
pageTitle: Inleiding
pageSubtitle: Context en doel
---

- Punt 1
- Punt 2
```

### `split`

```md
---
layout: split
pageTitle: Twee kolommen
rightBackground: "#edf4f8"
---

Linkerkolom met tekst.

::right::

<img src="/images/voorbeeld.png" alt="" />
```

### `content-image`

```md
---
layout: content-image
contentTitle: Onderwerp
intro: Korte inleidende zin onder de titel.
image: /images/voorbeeld.png
imageFit: cover
---

Dit is de hoofdtekst van de slide.
Gebruik hier gewone markdown of componenten.
```

Use `content-image` when the text side should stay fairly structured:

1. title via `contentTitle` prop or `::title::` slot (omit both and the heading is not rendered)
2. short lead via `intro` prop or `::intro::` slot (optional)
3. main content via the default slot or `body` prop
4. right-side visual via `media` slot or `image` prop

All three left-side regions are optional — if you omit `contentTitle` and don't use `::title::`, the body slot takes the full left pane. If you need even more layout control, prefer `split` or `full-width`.

### `cover`

```md
---
layout: cover
coverTitle: Mijn presentatie
subtitle: Eerste regel\nTweede regel
date: 24 april 2026
spreker: Voornaam Achternaam
meeting: Teamoverleg
coverBg: /images/cover-photo.jpg
coverBgRightHalf: true
---
```

Use slots on `cover` when the built-in prop structure is not enough:

```md
---
layout: cover
coverBgRightHalf: true
---

::background::

<img src="/images/cover-photo.jpg" alt="" />

::title::

Mijn presentatie met <em>eigen markup</em>

::footer::

24 april 2026
Eigen footer-inhoud
```

## Notes for maintainers

- Keep this README aligned with the actual files in `theme/layouts/`.
- If a layout changes from prop-only to slot-capable, document the exact precedence.
- If a layout is removed, remove it from this file in the same change.

## Component reference

### `Table`

A data table component. Choose the simplest level that covers your needs.

**Level 1 — prop-driven (plain string data)**

```md
<Table
  :columns="['Kanaal', 'Score', 'Toelichting']"
  :rows="[
    ['Telefonie', '94%', 'Q1 stabiel'],
    ['Post',      '61%', 'Capaciteitstekort'],
  ]"
/>
```

**Level 2 — `cell` scoped slot (rich content per cell, rows still automatic)**

Use when individual cells need icons, badges, coloured text or a two-line layout.
The slot receives `{ value, row, rowIndex, colIndex }` and you return the *contents* of the `<td>`.

```md
<Table :columns="['Kanaal', 'Score', 'Status']" :rows="rows">
  <template #cell="{ value, colIndex }">
    <template v-if="colIndex === 2">
      <span
        class="bd-ro-icon"
        :style="{ color: value === 'Op norm'
          ? 'var(--bd-signaalkleur-groen)'
          : 'var(--bd-signaalkleur-rood)' }"
      >{{ value === 'Op norm' ? 'check' : 'close' }}</span>
      {{ value }}
    </template>
    <template v-else>{{ value }}</template>
  </template>
</Table>
```

**Level 3 — default slot (full row control)**

Use when you need row-level styling, highlighted rows, or merged cells.
Write your own `<tr><td>` elements. The header is still driven by `:columns`.

```md
<Table :columns="['Kanaal', 'Score', 'Status']">
  <tr>
    <td>Telefonie</td>
    <td><strong>94%</strong> <small>bereikbaarheid</small></td>
    <td style="color:var(--bd-signaalkleur-groen)">Op norm</td>
  </tr>
  <tr style="background:var(--bd-domeinkleur-lichtblauw-30)">
    <td>Post</td>
    <td><strong>61%</strong> <small>op tijd</small></td>
    <td style="color:var(--bd-signaalkleur-rood)">Onder norm</td>
  </tr>
</Table>
```

Note: even-row striping is not applied automatically when using the default slot. Add row backgrounds inline or with a class as needed.

**Total rows**

Use a top border to mark the end of data. A full background competes visually
with the header and draws the eye before the data.

```md
<!-- Set the border and bold on every <td> in the row, not on the <tr>,
     because <td> backgrounds override <tr> backgrounds in CSS. -->
<tr>
  <td style="border-top:2px solid var(--bd-contrastkleur-lintblauw);font-weight:bold">Totaal</td>
  <td style="border-top:2px solid var(--bd-contrastkleur-lintblauw);font-weight:bold">91%</td>
</tr>
```

---

### `StepSeries`

A horizontal step indicator with three visual variants.

```md
<!-- filled: filled circles with text labels (numbers or short strings) -->
<StepSeries :items="['1', '2', '3']" variant="filled" />

<!-- outline: outline circles -->
<StepSeries :items="['1', '2', '3']" variant="outline" />

<!-- icon: outline circles with an RO icon font glyph in each node -->
<StepSeries
  :items="[
    { icon: 'formulier' },
    { icon: 'bewerken' },
    { icon: 'tevredenheid' },
  ]"
  variant="icon"
/>
```

For `variant="icon"`, `icon` must be a valid glyph name from the
**Rijksoverheid icon font** (the same font used by `bd-ro-icon` throughout
the theme). The glyph name is the descriptive part **after** the four-digit
prefix in the font catalogue — e.g. `2019_formulier` → `formulier`.

Common examples: `formulier`, `bewerken`, `tevredenheid`, `financien`,
`groep_mensen`, `gebouw_vws`, `zoek`, `kalender`, `start`.

If `icon` is empty or the glyph is not in the font, the node renders a red
`?` so the problem is immediately visible on the slide. A console warning is
also emitted in development mode.

**Sizing props** (all accept any CSS length):

| Prop | Default | Effect |
|---|---|---|
| `nodeSize` | `2.95rem` | Diameter of each circle |
| `stepGap` | `6.2rem` | Space between circle centres |
| `labelSize` | `16pt` | Font size for labels (filled/outline) |
| `iconSize` | `1.15rem` | Font size for icon glyphs |
| `strokeWidth` | `2px` | Border width (outline/icon variants) |

**Colour props** (all accept any CSS colour or `var(…)`):

| Prop | Default |
|---|---|
| `lineColor` | `var(--bd-domeinkleur-lichtblauw)` |
| `fillColor` | `var(--bd-domeinkleur-lichtblauw)` |
| `borderColor` | `var(--bd-domeinkleur-lichtblauw)` |
| `textColor` | `var(--bd-contrastkleur-lintblauw)` |
