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

## Visual Debugging with Puppeteer MCP

Agents can use the **Puppeteer MCP tools** to visually inspect and debug slides directly in a running Slidev dev server. This is the preferred approach for diagnosing layout issues (whitespace, alignment, overflow, card proportions) that are not visible from source code alone.

### When to use Puppeteer

- Verifying a layout fix actually rendered correctly (not just that the CSS compiled)
- Measuring exact pixel positions / bounding boxes of elements
- Detecting raw HTML leaking onto a slide (check `innerText` for class-name strings)
- Comparing actual vs expected card proportions or padding
- Confirming a slide matches a reference/template image

### Workflow

1. **Start the Slidev dev server** for the target presentation (see _Required Slide Workflow_ above). Note the port (e.g. `3030`).
2. **Navigate** to the slide you want to inspect:
   ```
   puppeteer_navigate → http://localhost:<port>
   ```
   To jump to a specific slide append `/<slideNumber>`, e.g. `http://localhost:3030/1`.
3. **Take a screenshot** to visually inspect the current render:
   ```
   puppeteer_screenshot  (width: 1366, height: 768)
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

### Typical diagnostic queries

| Goal | `puppeteer_evaluate` snippet |
|---|---|
| Element flush to top-left? | `JSON.stringify(document.querySelector('.cover-slide').getBoundingClientRect())` |
| Layout padding from Slidev theme? | `const s=getComputedStyle(document.querySelector('.slidev-layout')); [s.paddingTop,s.paddingLeft]` |
| Check for raw HTML text leak | `document.querySelector('.slidev-page-1').innerText.includes('cover-block')` |
| Card width ratio | `const [a,b]=['.cover-block-main','.cover-block-bottom'].map(s=>document.querySelector(s)?.getBoundingClientRect().width); (b/a).toFixed(2)` |

### Installing the Puppeteer MCP server

The Puppeteer MCP server provides `puppeteer_navigate`, `puppeteer_screenshot`, `puppeteer_click`, `puppeteer_evaluate`, etc.

**Option A – VS Code MCP settings (recommended)**

Add to your VS Code `settings.json` (user or workspace level):

```json
{
  "mcp": {
    "servers": {
      "puppeteer": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
      }
    }
  }
}
```

No separate install step is required; `npx` fetches and runs the package on first use.

**Option B – Global install**

```bash
npm install -g @modelcontextprotocol/server-puppeteer
```

Then reference the binary path in your MCP server config instead of `npx`.

**Chromium dependency**

The server uses Puppeteer's bundled Chromium. On a fresh machine, run once to ensure it is downloaded:

```bash
npx -y @modelcontextprotocol/server-puppeteer
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
