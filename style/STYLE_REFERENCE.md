# Visual Style Reference

This document captures the working presentation style for this repository.

It is intended as a practical implementation guide for Slidev decks that need to align with the government editorial and accessibility standards already used throughout this repo.

## 1) Core design identity

The decks use a **government/corporate editorial style**: calm, structured, high readability, and low visual noise.

- Tone: factual, trustworthy, process-oriented
- Layout intent: clear hierarchy and scanning speed over decoration
- Visual rhythm: simple blocks, whitespace, and restrained accent usage

## 2) Typography

Extracted theme fonts:

- Major font: `RijksoverheidSansWebText Bold`
- Minor font: `RijksoverheidSansWebText Regula`

Practical guidance for Slidev (if these fonts are unavailable on the machine):

- Preferred fallback chain: `"RijksoverheidSansWebText", "Segoe UI", "Inter", Arial, sans-serif`
- Use bold weights for slide titles and key callouts
- Keep body text regular and avoid condensed type density

## 3) Color system (extracted)

Primary and accents from both files are almost identical:

- `#154273` (deep blue) → primary brand color
- `#DDEFF8` (very light blue) → soft backgrounds/blocks
- `#8FCAE7` (light blue) → secondary accent
- `#B5DDEF` / `#B6DDEF` (pale blue variant) → subtle UI accents
- `#A90061` (magenta) → sparing emphasis
- `#E17000` (orange) → sparing emphasis/contrast
- `#000000` and `#FFFFFF` → neutral text/background anchors
- Hyperlink color also maps to `#154273`

Usage model:

- Base UI and headings: deep blue (`#154273`)
- Surfaces/highlight boxes: very light blue (`#DDEFF8`)
- Alerts or strategic emphasis only: magenta/orange in small doses

## 4) Composition patterns to replicate

For the current Slidev deck, keep these structural traits:

- **Title slides**: minimal, strong headline, short subtitle
- **Content slides**: 3–6 bullets max, one core message per slide
- **Matrix/table slides**: simple borders, strong header contrast, no heavy effects
- **Demo slides**: scenario → steps → takeaway, with clear progression
- **Closing slides**: concise verdict and explicit discussion prompts

## 5) Visual do/don't rules

Do:

- Prefer clean blocks and consistent spacing
- Keep contrast high and text comfortably readable
- Use one accent at a time for emphasis
- Keep transitions subtle and consistent

Don't:

- Mix many bright accents on one slide
- Overload slides with dense text
- Add decorative gradients/shadows that reduce clarity
- Use conflicting font families

## 6) Slidev implementation direction

When we style the final deck, apply this in order:

1. Set base font stack to RijksoverheidSansWebText + sane fallbacks
2. Map title/body/link colors to the extracted palette
3. Introduce one reusable "highlight box" style using `#DDEFF8`
4. Keep callout colors limited (magenta/orange only for important emphasis)

This gives a style that remains faithful to the examples while staying practical for Markdown-first Slidev authoring.

## 7) Composition findings

Beyond theme tokens, the current guide also reflects earlier comparative review work on representative government presentation layouts.

### 7.1 Method used

For each slide image:

- Quantized color sampling to detect dominant colors
- Mapping each sampled pixel to nearest brand color token
- Luminance-based dark/light ratios for contrast profile
- Edge-density proxy for visual complexity
- Occupancy proxy (non-white area) for content density

This is a visual signal analysis (not semantic OCR), so it captures composition and palette behavior reliably.

### 7.2 Quantitative findings (deck-level)

From that comparative review:

- Archetypes detected:
  - `standard_content`: 8 slides
  - `minimal_statement`: 1 slide
- Average edge density: `0.0193` (low-to-moderate complexity)
- Average occupancy: `0.4547` (roughly half of each slide used for visible content/blocks)

Aggregate nearest-brand color usage ratio:

- `white`: `0.5396`
- `light_blue` (`#DDEFF8` family): `0.2617`
- `accent_blue` (`#8FCAE7` family): `0.0906`
- `accent_blue_pale` (`#B6DDEF` family): `0.0918`
- `deep_blue` (`#154273` family): `0.0161`
- `magenta`: `0.0001`
- `orange`: `0.0001`

Interpretation:

- The style is overwhelmingly **light-surface first** (white + pale blue dominates).
- Deep blue is primarily structural/typographic, not background-heavy.
- Magenta/orange are essentially negligible in area, confirming "accent-only" usage.

### 7.3 Slide rhythm patterns

Observed range:

- Most dense slide pattern: occupancy `0.9986` (full-bleed/cover-like composition)
- Most minimal slide pattern: occupancy `0.0207` (statement/divider behavior)
- Highest complexity pattern: edge density `0.0349` (likely chart/table-heavy)

Practical rhythm inferred from this deck:

- Start with one visually strong opener
- Alternate mostly standard content slides
- Insert one very minimal slide for pacing reset
- Use one denser information slide as a focal peak

### 7.4 Concrete Slidev style rules (derived)

Use these as implementation constraints:

1. **Background policy**
	- Keep ~80–90% of slides on white or very light blue surfaces.
	- Reserve full-bleed/high-occupancy backgrounds for opening moments only.

2. **Accent budget policy**
	- Keep magenta/orange to micro-emphasis (single word, icon, or KPI), not blocks.
	- Prefer blue-family accents for all structural highlights.

3. **Density policy**
	- Target occupancy around `0.35–0.55` for normal content slides.
	- Add one low-density slide (`<0.15`) every 5–7 slides to reset attention.

4. **Complexity policy**
	- Keep most slides low-complexity (edge density near the deck average).
	- Allow only occasional high-complexity slides for data-heavy moments.

5. **Hierarchy policy**
	- Deep blue for headings/navigation anchors.
	- Light blue surfaces for grouping and gentle contrast.
	- Neutral body text on high-contrast backgrounds.

### 7.5 Suggested mapping to current deck

For `../presentations/zeepkist-agentic-coding/slides.md`:

- Use high-occupancy style only on title + section-divider slides.
- Keep most content slides in the "standard_content" pattern.
- Convert one slide per major section into a minimal statement slide.
- Reserve one dense visual slide for matrix/rollout data, not more.

This preserves the established visual DNA of the reference work while keeping the deck readable and modern in Slidev.

## 8) Official source alignment (Rijkshuisstijl website)

Based on public pages from `rijkshuisstijl.nl` (and the linked modernized-style announcement), we can anchor this reference to the official intent.

### 8.1 Publicly confirmed principles

From the publicly accessible "Over de rijkshuisstijl" content:

- The style exists to support one recognizable and accessible government sender identity.
- Core communication goals are **herkenbaarheid** (recognizability), **eenduidigheid** (consistency/uniformity), and **toegankelijkheid** (accessibility).
- One shared logo/style was introduced as a condition for unified communication across government organizations.

From the publicly accessible "De gemoderniseerde rijkshuisstijl" content:

- In 2024 the style system was modernized.
- Updates explicitly include adjustments to:
  - wordmark/logo composition
  - visual language (vormtaal)
  - typeface
  - color system
  - image-language guidelines
- Modernization is described as better suited to digital channels and accessibility needs.
- Rollout is gradual rather than a single cutover date.

### 8.2 What this means for our Slidev deck

Translate those official goals into deck-level constraints:

1. **Recognizability first**
	- Keep a stable heading style, color system, and spacing rhythm across all slides.
	- Avoid ad-hoc visual experiments per slide.

2. **Uniformity over novelty**
	- Reuse a small number of approved layout archetypes (cover, standard content, minimal statement, dense data).
	- Keep component styling (tables, callouts, bullets) consistent throughout.

3. **Accessibility by default**
	- Maintain strong contrast and readable type sizes.
	- Keep visual clutter low and emphasize clear information hierarchy.
	- Prefer simple language blocks and obvious section structure.

4. **Digital-first presentation behavior**
	- Favor clean, responsive-friendly compositions over print-like decorative complexity.
	- Keep transitions subtle and avoid motion/noise that harms readability.

### 8.3 Source-confidence note

The detailed "Basiselementen nieuw" and "Richtlijnen middelen nieuw" pages appear access-gated in this environment (login wall), so this document distinguishes:

- **Confirmed from public text:** strategy-level principles and modernization scope
- **Derived here:** practical Slidev implementation rules, supported by prior comparative review work

If a team member has authenticated access, we should add a follow-up appendix with exact official parameter values from those pages.

### 8.4 Referenced URLs

- `https://www.rijkshuisstijl.nl/publiek/modules/folder/brandguide/default/grouplist.aspx?ItemId=1109`
- `https://www.rijkshuisstijl.nl/publiek/InternalLink.aspx?ItemId=6738&OriginalItemId=6738`
- `https://www.rijkshuisstijl.nl/modules/product/DigitalStyleGuide/default/grouplist.aspx?ItemId=10910`
- `https://www.rijkshuisstijl.nl/modules/folder/brandguide/default/grouplist.aspx?ItemId=10479`
- `https://www.rijkshuisstijl.nl/modules/folder/brandguide/default/grouplist.aspx?ItemId=10582`

## 9) Slide compliance checklist (quick pass/fail)

Use this checklist before sharing or presenting. Mark each item as ✅ / ❌.

1. **Typography consistency**
	- One sans-serif family chain is used consistently for title/body text.
	- No decorative or conflicting font families appear.

2. **Readable hierarchy**
	- Every slide has one clear title and a visible message hierarchy.
	- Body text remains comfortably readable at presentation distance.

3. **Palette discipline**
	- Base slides use white/light-blue surfaces with blue-family structure.
	- Magenta/orange are used only for small, intentional emphasis.

4. **Contrast/accessibility**
	- Text/background combinations are high contrast.
	- No critical information is conveyed by color alone.

5. **Layout consistency**
	- Slides follow a small set of recurring archetypes (cover, standard, minimal, dense-data).
	- Spacing and alignment are visibly consistent across sections.

6. **Content density control**
	- Standard slides stay in moderate density (roughly 3–6 bullets or equivalent blocks).
	- Dense slides are used sparingly and intentionally.

7. **Pacing rhythm**
	- The deck includes occasional low-density/reset slides.
	- There is no long sequence of equally dense slides causing fatigue.

8. **Table/chart clarity**
	- Data slides prioritize readability over decoration.
	- Labels/legends are legible and key takeaway is explicit.

9. **Uniform sender style**
	- Visual language remains stable deck-wide (recognizability + eenduidigheid).
	- No off-brand one-off visual experiments are introduced.

10. **Digital-first quality check**
	 - Slides are clean on screen (no noisy effects, excessive animation, or clutter).
	 - Presenter flow supports accessibility and comprehension under real meeting conditions.

### Optional scoring model

- `9–10 ✅` = ready to present
- `7–8 ✅` = acceptable, polish recommended
- `≤6 ✅` = revise before broad audience use

## 10) Belastingdienst merkgids 1.1 (delta analysis)

This section captures the most important Belastingdienst-specific deltas that were not yet explicit in the earlier sections.

### 10.1 What is unique versus current guide

1. **Tone model becomes explicit (not just formal/clear)**
	- Add the tonal triad: **inlevend, hulpvaardig, ingetogen**.
	- Practical writing implication: supportive and direct, but never theatrical.

2. **Message architecture is action-first**
	- Required ordering pattern: **Wat moet ik doen?** → **Wanneer moet ik het doen?** → **Waarom?**
	- This is stricter than general "be clear" guidance and should be used for all instruction-heavy slides.

3. **Interaction guidance includes nudging + hierarchy**
	- Explicit recommendation to guide users toward the right next action.
	- Distinct primary/secondary action hierarchy is required (avoid equal-weight competing actions).

4. **Image content constraints are more specific**
	- Prefer people shown from the front and in everyday environments.
	- Visual character: full-colour, high-contrast, fresh, sharply focused.
	- Explicitly avoid religious cues, hidden advertising, sensitive topics, abstract metaphors, clichés, and third-party logos.

5. **Brand shape system adds concrete elements**
	- Use horizontal and vertical line structures as recurring compositional tools.
	- Use the "merktegel" as a recurring information container element.
	- Constraint: merktegel use is limited to corporate light blue.

6. **Design principle "tegel en regel" appears explicitly**
	- Distinguish main and secondary information through clear block/line hierarchy.
	- This gives a concrete structural rule for dense information slides.

### 10.2 Visual signals

From the earlier comparative review of the Belastingdienst guide:

- Archetypes: 10 dense-information, 7 standard-content, 1 minimal-statement
- Average occupancy: `0.4242`
- Average edge density: `0.0566` (higher than the kwartaalmeeting deck)
- Peak complexity example: edge density `0.1175`

Interpretation for our deck:

- The merkgids source is more instruction-dense and system-oriented than the quarterly deck.
- Reuse its rules for policy/process slides, but preserve breathing room with minimal reset slides.

### 10.3 New implementation instructions to add to deck workflow

When drafting or reviewing slides, apply these additional checks:

- Every procedural slide must contain an explicit action + deadline pattern.
- CTA hierarchy must show one dominant next step.
- If using photo examples, validate against the image exclusion list.
- Use blue structural elements (lines/tiles) to separate levels of information.
- Keep merktegel-like callouts in light-blue variants only.
