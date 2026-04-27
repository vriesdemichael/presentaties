<script setup>
/*
  StepSeries — three levels of control, following the same pattern as Table:

  ─────────────────────────────────────────────────────────
  LEVEL 1 - PROP-DRIVEN  (plain text nodes and captions)
  ─────────────────────────────────────────────────────────

  <StepSeries :items="['1','2','3']" />

  <StepSeries
    variant="icon"
    :items="[
      { icon: 'formulier', caption: 'Signaal',       body: 'Eerste ontvangst' },
      { icon: 'bewerken',  caption: 'Verduidelijken', body: 'Contact en context' },
    ]"
  />

  ─────────────────────────────────────────────────────────
  LEVEL 2A - #node SLOT  (custom content inside each circle)
  ─────────────────────────────────────────────────────────

  Slot provides: { item, index }
  You return the *contents* of the circle — not the circle itself.
  The circle shape, border and background are always rendered by the component.

  <StepSeries variant="filled" :items="myItems">
    <template #node="{ item, index }">
      <span class="bd-ro-icon" style="font-size:1rem">{{ item.icon }}</span>
    </template>
  </StepSeries>

  ─────────────────────────────────────────────────────────
  LEVEL 2B - #caption SLOT  (custom content below each circle)
  ─────────────────────────────────────────────────────────

  Slot provides: { item, index }
  You return the *contents* of the caption area.
  Built-in caption classes (.bd-step-series-caption-title / -body) are available
  for consistent typography; see :deep() rules below.

  <StepSeries variant="icon" :items="myItems">
    <template #caption="{ item, index }">
      <div class="bd-step-series-caption">
        <span class="bd-step-series-caption-title">{{ item.caption }}</span>
        <span class="bd-step-series-caption-body" style="color:red">Custom</span>
      </div>
    </template>
  </StepSeries>
*/
import { computed, useSlots } from "vue";

const props = defineProps({
  items: { type: Array, default: () => [] },
  variant: { type: String, default: "filled" },
  lineColor: { type: String, default: "var(--bd-domeinkleur-lichtblauw)" },
  fillColor: { type: String, default: "var(--bd-domeinkleur-lichtblauw)" },
  borderColor: { type: String, default: "var(--bd-domeinkleur-lichtblauw)" },
  textColor: { type: String, default: "var(--bd-contrastkleur-lintblauw)" },
  nodeSize: { type: String, default: "2.95rem" },
  stepGap: { type: String, default: "6.2rem" },
  labelSize: { type: String, default: "16pt" },
  iconSize: { type: String, default: "1.15rem" },
  strokeWidth: { type: String, default: "2px" },
  // Caption typography. captionSize controls the bold title below the node;
  // captionBodySize defaults to ~85% of captionSize if omitted.
  captionSize: { type: String, default: "9.2pt" },
  captionBodySize: { type: String, default: "8.15pt" },
  // Snake / boustrophedon connectors.
  // tailEnd adds a spacer after the last node that extends the connector line
  // to the right edge of the container (use with StepSeriesJoin).
  // tailStart adds the same spacer before the first node (line from left edge).
  // Either prop causes the series to stretch to width: 100%.
  tailEnd: { type: Boolean, default: false },
  tailStart: { type: Boolean, default: false },
});

const slots = useSlots();

const normalizedItems = computed(() =>
  (Array.isArray(props.items) ? props.items : []).map((item, index) => {
    if (typeof item === "object" && item !== null) {
      if (import.meta.env.DEV && props.variant === "icon" && !item.icon && !slots.node) {
        console.warn(
          `[StepSeries] item at index ${index} has no icon value. ` +
          `A fallback placeholder will be shown. ` +
          `Provide an RO icon glyph name, e.g. icon: "check", or use the #node slot.`
        );
      }
      return {
        key: item.key || `${props.variant}-${index}`,
        label: item.label ?? "",
        icon: item.icon ?? "",
        // caption: bold title shown below the node
        // body: lighter sub-label shown below caption
        caption: item.caption ?? "",
        body: item.body ?? "",
      };
    }

    return {
      key: `${props.variant}-${index}`,
      label: String(item ?? ""),
      icon: "",
      caption: "",
      body: "",
    };
  }),
);

// Show caption row when prop-based captions exist OR a #caption slot is provided.
const hasCaptions = computed(() =>
  !!slots.caption || normalizedItems.value.some((item) => item.caption || item.body),
);
</script>

<template>
  <!--
    Per-step wrapper layout (Option B, v2):
    Outer container is a flex row with column-gap = stepGap.
    Each step is a wrapper div (flex column, align-items: center, fixed width = nodeSize).
    Node and caption are siblings in the same flex context — both centered against nodeSize.
    The connector line is drawn as ::after on the node itself (left: 100%, width: stepGap),
    anchored directly to the circle's right edge — no cross-element rounding gaps.
    The last wrapper's ::after is suppressed with :last-child CSS.
  -->
  <div
    class="bd-step-series"
    :class="[
      `bd-step-series--${variant}`,
      (tailEnd || tailStart) && 'bd-step-series--stretch',
    ]"
    :style="{
      '--bd-step-line-color': lineColor,
      '--bd-step-fill-color': fillColor,
      '--bd-step-border-color': borderColor,
      '--bd-step-text-color': textColor,
      '--bd-step-node-size': nodeSize,
      '--bd-step-gap': stepGap,
      '--bd-step-label-size': labelSize,
      '--bd-step-icon-size': iconSize,
      '--bd-step-stroke-width': strokeWidth,
      '--bd-step-caption-size': captionSize,
      '--bd-step-caption-body-size': captionBodySize,
    }"
  >
    <!--
      tailStart spacer: flex:1 div placed BEFORE the first node.
      ::after draws a full-width horizontal line at node-center height.
      The line extends from the LEFT edge of the container to the first dot.
    -->
    <div v-if="tailStart" class="bd-step-tail" aria-hidden="true" />

    <div
      v-for="(item, index) in normalizedItems"
      :key="item.key"
      class="bd-step-wrapper"
    >
      <!-- Circle node. ::after draws the connector to the next step. -->
      <div class="bd-step-series-node">
        <slot name="node" :item="item" :index="index">
          <span v-if="variant !== 'icon'" class="bd-step-series-label">{{ item.label }}</span>
          <template v-else>
            <span v-if="item.icon" class="bd-ro-icon bd-step-series-icon">{{ item.icon }}</span>
            <span v-else class="bd-step-series-icon-missing" aria-label="ontbrekend icoon">?</span>
          </template>
        </slot>
      </div>

      <!-- Caption below the circle — centered by the same flex context as the node -->
      <div v-if="hasCaptions" class="bd-step-series-caption-slot">
        <slot name="caption" :item="item" :index="index">
          <div v-if="item.caption || item.body" class="bd-step-series-caption">
            <span v-if="item.caption" class="bd-step-series-caption-title">{{ item.caption }}</span>
            <span v-if="item.body" class="bd-step-series-caption-body">{{ item.body }}</span>
          </div>
        </slot>
      </div>
    </div>

    <!--
      tailEnd spacer: flex:1 div placed AFTER the last node.
      ::after draws a full-width horizontal line at node-center height.
      The line extends from the last dot to the RIGHT edge of the container.
    -->
    <div v-if="tailEnd" class="bd-step-tail" aria-hidden="true" />
  </div>
</template>

<style scoped>
/*
 * Outer row: flex with column-gap = stepGap.
 * --stretch: width: 100% when tailEnd or tailStart is used so the tail
 * spacers can fill the remaining container width.
 */
.bd-step-series {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  column-gap: var(--bd-step-gap);
  width: max-content;
  min-width: 0;
}

.bd-step-series--stretch {
  width: 100%;
}

/*
 * Tail spacer — fills all remaining flex space.
 * ::after draws the horizontal connector line at the same vertical position
 * as the inter-node connectors (nodeSize/2 from the top).
 */
.bd-step-tail {
  flex: 1 0 0;
  position: relative;
  min-width: 0;
  /* tall enough to contain the ::after without clipping */
  min-height: var(--bd-step-node-size);
}

.bd-step-tail::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: calc(var(--bd-step-node-size) / 2 - var(--bd-step-stroke-width) / 2);
  height: var(--bd-step-stroke-width);
  background: var(--bd-step-line-color);
  z-index: 0;
}

/*
 * Per-step wrapper: flex column, width LOCKED to nodeSize.
 * min-width: 0 overrides flex's default min-width: auto so caption content
 * cannot force the wrapper wider than nodeSize. overflow: visible lets the
 * caption overflow symmetrically on both sides.
 * position: relative so ::after can be absolutely positioned.
 *
 * The connector ::after draws center-to-center:
 *   left: 50%           → starts at horizontal center of the node (wrapper = nodeSize wide)
 *   width: nodeSize + stepGap → spans to the center of the next node
 *   top: nodeSize/2 - stroke/2 → vertically aligned to circle midline
 * Circles are z-index: 1 so they paint on top of the line endpoints.
 */
.bd-step-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 var(--bd-step-node-size);
  min-width: 0;
  overflow: visible;
  row-gap: 0.45rem;
}

.bd-step-wrapper:not(:last-child)::after {
  content: "";
  position: absolute;
  left: 50%;
  width: calc(var(--bd-step-node-size) + var(--bd-step-gap));
  top: calc(var(--bd-step-node-size) / 2 - var(--bd-step-stroke-width) / 2);
  height: var(--bd-step-stroke-width);
  background: var(--bd-step-line-color);
  z-index: 0;
}

/* Node fills wrapper width; z-index: 1 sits on top of the connector line. */
.bd-step-series-node {
  position: relative;
  z-index: 1;
  width: var(--bd-step-node-size);
  aspect-ratio: 1;
  border-radius: 999px;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  flex-shrink: 0;
}

.bd-step-series--filled .bd-step-series-node {
  background: var(--bd-step-fill-color);
  color: var(--bd-step-text-color);
}

.bd-step-series--outline .bd-step-series-node,
.bd-step-series--icon .bd-step-series-node {
  background: #ffffff;
  border: var(--bd-step-stroke-width) solid var(--bd-step-border-color);
  color: var(--bd-step-text-color);
}

.bd-step-series-label {
  font-family: var(--bd-font-bold-stack);
  font-size: var(--bd-step-label-size);
  line-height: 1;
}

.bd-step-series-icon {
  font-size: var(--bd-step-icon-size);
  line-height: 1;
  color: var(--bd-contrastkleur-lintblauw);
}

/* Visual fallback: shown when item.icon is missing.
   The red "?" is immediately visible on the slide. */
.bd-step-series-icon-missing {
  font-size: var(--bd-step-icon-size);
  line-height: 1;
  font-weight: bold;
  color: var(--bd-signaalkleur-rood);
}

/*
 * Caption slot: width: max-content so text is not word-wrapped to nodeSize.
 * Centering is handled by the parent wrapper's align-items: center — the
 * caption overflows symmetrically when it is wider than the node column.
 */
.bd-step-series-caption-slot {
  width: max-content;
}

.bd-step-series-caption {
  min-width: var(--bd-step-node-size);
  width: max-content;
  display: grid;
  gap: 0.12rem;
  justify-items: center;
  text-align: center;
}

/*
 * Caption typography.
 * Selectors use :deep() so they work whether the content is rendered
 * by the component template (Level 1 props) OR injected via the #caption slot.
 * The non-:deep() scoped versions are kept as fallback for older Vite/Vue versions.
 */
.bd-step-series-caption-title,
.bd-step-series-caption-slot :deep(.bd-step-series-caption-title) {
  font-family: var(--bd-font-bold-stack);
  font-size: var(--bd-step-caption-size);
  line-height: 1.06;
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-step-series-caption-body,
.bd-step-series-caption-slot :deep(.bd-step-series-caption-body) {
  font-size: var(--bd-step-caption-body-size);
  line-height: 1.16;
  color: rgba(0, 37, 94, 0.84);
}

/* .bd-step-series-caption wrapper used inside #caption slot */
.bd-step-series-caption-slot :deep(.bd-step-series-caption) {
  min-width: var(--bd-step-node-size);
  width: max-content;
  display: grid;
  gap: 0.12rem;
  justify-items: center;
  text-align: center;
}

/*
 * In stretch mode (tailEnd / tailStart), wrappers share the full row width
 * equally so captions must stay within their column.
 */
.bd-step-series--stretch .bd-step-wrapper {
  flex: 1 1 0;
}

.bd-step-series--stretch .bd-step-series-caption-slot {
  width: 100%;
  overflow: hidden;
}

.bd-step-series--stretch .bd-step-series-caption,
.bd-step-series--stretch .bd-step-series-caption-slot :deep(.bd-step-series-caption) {
  width: 100%;
  max-width: 100%;
}

.bd-step-series--stretch .bd-step-series-caption-body,
.bd-step-series--stretch .bd-step-series-caption-slot :deep(.bd-step-series-caption-body) {
  white-space: normal;
  overflow-wrap: break-word;
  max-width: 100%;
}
</style>
