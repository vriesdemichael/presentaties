# AGENTS.md

## Scope

This repository contains multiple presentations and shared style assets.

- Presentations live in `./presentations/`
- Shared style assets live in `./style/`

## Required Slide Workflow

When creating, editing, or validating any presentation in this repo, agents **must** use Slidev.

1. Use the installed VS Code Slidev extension tools whenever available.
2. Use the local Slidev skill at `./.agents/skills/slidev` (see `./.agents/skills/slidev/SKILL.md`) for Slidev-specific guidance and operations.
3. Prefer editing Slidev source (`slides.md` and related Slidev config/assets) over external presentation formats.
4. Reuse a single Slidev dev server instance on port `3030` whenever live preview is needed.
5. When starting that shared dev server from VS Code tasks, pass `--remote --bind 0.0.0.0 -p 3030`.
6. Never start additional Slidev dev servers on alternate ports unless the user explicitly asks for that.
7. Never run Slidev dev servers in the foreground. Treat them as long-running background processes only.

## Mandatory Style Compliance

All presentation work must **strictly follow** the style guide:

- `./style/STYLE_REFERENCE.md`

This is not optional. Treat this guide as the source of truth for:

- typography and color usage
- composition/layout archetypes
- pacing and density rules
- accessibility and contrast standards
- Rijkshuisstijl alignment and Belastingdienst merkgids deltas
- pass/fail checklist compliance

If a requested slide conflicts with the style guide, adjust the slide to match the guide.

## Execution Rules for Agents

- Do not introduce custom visual styles that are not covered by the style guide.
- Reuse existing style patterns before inventing new ones.
- Keep style assets centralized in `./style/`.
- Keep presentation-specific content in `./presentations/<presentation-name>/`.
- When in doubt, choose the strictest interpretation of `./style/STYLE_REFERENCE.md`.

## Visual Debugging with Playwright MCP

Agents should use **Playwright MCP** to inspect and debug slides directly in a running Slidev dev server. This is the preferred approach for diagnosing layout issues (whitespace, alignment, overflow, card proportions) that are not obvious from source code alone, and it aligns with this repo's existing Playwright-based Slidev export workflow.

### When to use Playwright

- Verifying a layout fix actually rendered correctly (not just that the CSS compiled)
- Measuring exact pixel positions / bounding boxes of elements
- Detecting raw HTML leaking onto a slide (check `innerText` for class-name strings)
- Comparing actual vs expected card proportions or padding
- Confirming a slide matches a reference/template image

### Workflow

1. **Reuse the existing Slidev dev server on port `3030`** whenever possible. Only start it if it is not already running, only as a background process, and prefer the task configuration `--remote --bind 0.0.0.0 -p 3030`.
2. **Navigate** to the slide you want to inspect with the Playwright MCP page navigation tool:
   ```
  http://localhost:<port>
   ```
   To jump to a specific slide append `/<slideNumber>`, e.g. `http://localhost:3030/1`.
3. **Capture a screenshot or page snapshot** to inspect the current render:
   ```
  viewport: 1366x768
   ```
4. **Evaluate DOM** to measure exact positions and styles:
   ```js
   // Bounding box of an element
   const el = document.querySelector('.cover-slide');
   JSON.stringify(el.getBoundingClientRect());

   // Computed padding / margin of the Slidev layout wrapper
   const layout = document.querySelector('.slidev-layout');
   const s = getComputedStyle(layout);
   JSON.stringify({ pt: s.paddingTop, pr: s.paddingRight, pb: s.paddingBottom, pl: s.paddingLeft });

   // Detect leaked raw HTML (class names printed as text)
   document.querySelector('.slidev-page-1').innerText.slice(0, 300);
   ```
5. **Iterate**: edit CSS/Vue source, wait for hot-reload (~1–2 s), then re-screenshot or re-evaluate.
6. **Confirm fix** by checking key measurements (e.g. `coverRect.y === 0` for flush-top).

### Browser hygiene

- Do not open multiple Slidev preview windows or multiple dev-server instances for the same task.
- Reuse the same Playwright-controlled page and browser context for the full inspection session.
- Prefer isolated sessions and a fixed viewport so screenshots and measurements stay reproducible.
- Save traces or videos only when diagnosing a hard-to-reproduce issue; avoid generating debugging artifacts by default.

### Typical diagnostic queries

| Goal | `evaluate` snippet |
|---|---|
| Element flush to top-left? | `JSON.stringify(document.querySelector('.cover-slide').getBoundingClientRect())` |
| Layout padding from Slidev theme? | `const s=getComputedStyle(document.querySelector('.slidev-layout')); [s.paddingTop,s.paddingLeft]` |
| Check for raw HTML text leak | `document.querySelector('.slidev-page-1').innerText.includes('cover-block')` |
| Card width ratio | `const [a,b]=['.cover-block-main','.cover-block-bottom'].map(s=>document.querySelector(s)?.getBoundingClientRect().width); (b/a).toFixed(2)` |

### Installing the Playwright MCP server

The Playwright MCP server provides browser navigation, DOM evaluation, screenshot/snapshot, and interaction tools for visual inspection workflows.

**Option A – VS Code MCP settings (recommended)**

Add to your VS Code `settings.json` (user or workspace level):

```json
{
  "mcp": {
    "servers": {
      "playwright": {
        "command": "npx",
        "args": [
          "-y",
          "@playwright/mcp@latest",
          "--isolated",
          "--viewport-size=1366x768"
        ]
      }
    }
  }
}
```

No separate install step is required; `npx` fetches and runs the package on first use.

**Option B – Global install**

```bash
npm install -g @playwright/mcp
```

Then reference the binary path in your MCP server config instead of `npx`.

**Browser dependency**

On a fresh machine, install the Playwright Chromium browser once:

```bash
npx -y playwright install chromium
```

Chromium is cached globally after the first run; subsequent starts are fast.

---

## Pull Request Checklist (Mandatory)

For any PR that changes presentation content or styling, agents must include a checklist result based on:

- `./style/STYLE_REFERENCE.md` → section **"9) Slide compliance checklist (quick pass/fail)"**

Required PR output:

1. A 10-point pass/fail table covering each checklist item.
2. A total score using the optional scoring model from the style guide.
3. A short "Fixes required before merge" list for every failed item.

Merge policy for agents:

- `9–10 ✅` → ready
- `7–8 ✅` → allowed with explicit follow-up actions
- `≤6 ✅` → do not mark as ready; revise first
