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
  /** Which side the bend curves on. 'right' for the normal boustrophedon. */
  side: { type: String, default: "right" },
  /** Vertical gap between the two StepSeries rows. Must match the container. */
  rowGap: { type: String, default: "1.8rem" },
  /** Must match the StepSeries nodeSize prop for line-center alignment. */
  nodeSize: { type: String, default: "2.95rem" },
  lineColor: { type: String, default: "var(--bd-domeinkleur-lichtblauw)" },
  strokeWidth: { type: String, default: "2px" },
  /** Corner radius of the U-bend. */
  bendRadius: { type: String, default: "1.4rem" },
});
</script>

<template>
  <div
    class="bd-step-series-join"
    :class="`bd-step-series-join--${side}`"
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
  /* Allow the ::after to extend above/below the element bounds */
  overflow: visible;
  pointer-events: none;
}

/*
 * U-bend geometry:
 *
 *   top: -(nodeSize/2)
 *     → start at the connector line center of the row ABOVE
 *       (which is nodeSize/2 above the bottom edge of that series,
 *        which is the top edge of this join div)
 *
 *   height: rowGap + nodeSize
 *     → spans from row-above's line center to row-below's line center
 *       (row-below's center is nodeSize/2 below the top of that series,
 *        which is the bottom edge of this join div)
 *
 *   border on three sides (no left) + border-radius = rounded C-curve
 */
.bd-step-series-join--right::after {
  content: "";
  position: absolute;
  right: 0;
  top: calc(var(--join-node-size) / -2);
  height: calc(var(--join-node-size) + var(--join-row-gap));
  width: var(--join-bend-r);
  border-top: var(--join-stroke) solid var(--join-line-color);
  border-right: var(--join-stroke) solid var(--join-line-color);
  border-bottom: var(--join-stroke) solid var(--join-line-color);
  border-left: none;
  border-radius: 0 var(--join-bend-r) var(--join-bend-r) 0;
  box-sizing: border-box;
}

.bd-step-series-join--left::after {
  content: "";
  position: absolute;
  left: 0;
  top: calc(var(--join-node-size) / -2);
  height: calc(var(--join-node-size) + var(--join-row-gap));
  width: var(--join-bend-r);
  border-top: var(--join-stroke) solid var(--join-line-color);
  border-left: var(--join-stroke) solid var(--join-line-color);
  border-bottom: var(--join-stroke) solid var(--join-line-color);
  border-right: none;
  border-radius: var(--join-bend-r) 0 0 var(--join-bend-r);
  box-sizing: border-box;
}
</style>
