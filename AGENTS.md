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
