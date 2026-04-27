<script setup>
/**
 * StepSeriesJoin — draws the rounded U-bend that connects two StepSeries rows
 * in a boustrophedon (snake) layout.
 *
 * Place it between two <StepSeries> elements in a vertical flex container.
 * The container must have NO row-gap — all vertical spacing is provided by
 * the `rowGap` prop, which controls how tall the join element is.
 *
 * The `nodeSize` prop must match the StepSeries nodeSize so the bend aligns
 * precisely with the dot-center connector lines above and below.
 *
 * Usage:
 *
 *   <div style="display: flex; flex-direction: column;">
 *     <StepSeries :items="row1" tail-end />
 *     <StepSeriesJoin row-gap="2rem" />
 *     <StepSeries :items="row2" tail-end />
 *   </div>
 *
 * Geometry:
 *   The join div has height = rowGap.
 *   Its ::after is absolutely positioned, overflowing upward by nodeSize/2
 *   (to reach row 1's connector line) and downward by nodeSize/2 (to reach
 *   row 2's connector line). Total pseudo-height = rowGap + nodeSize.
 *   The pseudo draws three sides of a rectangle (no left border) with a
 *   border-radius, creating the rounded C-curve.
 */

const props = defineProps({
  /** Vertical gap between the two StepSeries rows. Must match the container. */
  rowGap: { type: String, default: "1.8rem" },
  /** Must match the StepSeries nodeSize prop for line-center alignment. */
  nodeSize: { type: String, default: "2.95rem" },
  lineColor: { type: String, default: "var(--bd-domeinkleur-lichtblauw)" },
  strokeWidth: { type: String, default: "2px" },
  /** Corner radius of the bottom-left and bottom-right bends. */
  bendRadius: { type: String, default: "1.4rem" },
});
</script>

<template>
  <div
    class="bd-step-series-join"
    :style="{
      '--join-row-gap': rowGap,
      '--join-node-size': nodeSize,
      '--join-line-color': lineColor,
      '--join-stroke': strokeWidth,
      '--join-bend-r': bendRadius,
    }"
    aria-hidden="true"
  />
</template>

<style scoped>
/*
 * The join div has height = rowGap. It contains no content.
 * All visuals come from ::after, which uses overflow to extend
 * outside the element's bounds.
 */
.bd-step-series-join {
  width: 100%;
  height: var(--join-row-gap);
  position: relative;
  overflow: visible;
  pointer-events: none;
}

/*
 * Full-width ∪ connector geometry:
 *
 *   The pseudo spans the full width (left:0, right:0) and overflows
 *   upward by nodeSize/2 (to reach row 1's connector center) and
 *   downward by nodeSize/2 (to reach row 2's connector center).
 *
 *   Three borders: right leg ↓, bottom across, left leg ↑.
 *   No top border (the tail lines of each StepSeries provide those).
 *   Bottom corners are rounded (bottom-right and bottom-left).
 *
 *   This connects tailEnd of row 1 (right edge) → curves down the right
 *   side → crosses the full bottom → curves up the left side →
 *   tailStart of row 2 (left edge).
 */
.bd-step-series-join::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: calc(var(--join-node-size) / -2);
  bottom: calc(var(--join-node-size) / -2);
  border-right: var(--join-stroke) solid var(--join-line-color);
  border-bottom: var(--join-stroke) solid var(--join-line-color);
  border-left: var(--join-stroke) solid var(--join-line-color);
  border-top: none;
  border-radius: 0 0 var(--join-bend-r) var(--join-bend-r);
  box-sizing: border-box;
}
</style>
