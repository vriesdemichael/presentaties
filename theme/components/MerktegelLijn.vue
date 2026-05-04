<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  /**
   * 'outline' renders only the step-profile border line.
   * 'filled'  renders a solid filled shape with the step cut into the top edge.
   */
  variant: { type: String, default: 'outline' },

  /** Fill / stroke color. Accepts any CSS color or custom property. */
  color: { type: String, default: 'var(--bd-domeinkleur-lichtblauw)' },

  /**
   * Which side is elevated by 1X:
   *   'left'  – left half is taller; step drops right-ward  (default)
   *   'right' – right half is taller; step drops left-ward
   * The step always falls at exactly 50% of the component width.
   */
  stepSide: { type: String, default: 'left' },

  /**
   * Height of the lower strip as a multiplier of ribbon-x.
   * The elevated tab is always 1×ribbon-x tall; total height = (1 + stripHeight) × ribbon-x.
   *   1    → lower strip = 1×  (default, fills the 1X bottom margin)
   *   0.5  → lower strip = ½×
   *   0.25 → lower strip = ¼×
   */
  stripHeight: { type: Number, default: 1 },

  /**
   * Stroke width in CSS pixels for the 'outline' variant.
   * Uses vector-effect="non-scaling-stroke" so it is display-pixel-accurate.
   */
  strokeWidth: { type: Number, default: 1.5 },
})

/*
 * SVG viewBox is "0 0 100 H" where H = 1 (tab) + stripHeight (strip):
 *   X: 0–100  (maps to 100% of component width)
 *   Y: 0      → top of elevated side
 *   Y: 1      → shelf level (1 ribbon-x below top)
 *   Y: H      → component bottom
 * The vertical step always occurs at X=50 (horizontal midpoint).
 */
const totalH = computed(() => 1 + props.stripHeight)

const svgPoints = computed(() => {
  const H = totalH.value

  if (props.stepSide === 'right') {
    return props.variant === 'filled'
      ? `0,${H} 0,1 50,1 50,0 100,0 100,${H}`
      : `0,1 50,1 50,0 100,0`
  }

  // Left side elevated (default)
  return props.variant === 'filled'
    ? `0,0 50,0 50,1 100,1 100,${H} 0,${H}`
    : `0,0 50,0 50,1 100,1`
})

const isOutline = computed(() => props.variant === 'outline')

const rootStyle = computed(() => ({
  '--bd-ml-total-h': String(totalH.value),
}))
</script>

<template>
  <div
    class="bd-merktegel-lijn"
    :class="`bd-merktegel-lijn--${variant} bd-merktegel-lijn--${stepSide}`"
    :style="rootStyle"
  >
    <svg
      class="bd-merktegel-lijn-shape"
      :viewBox="`0 0 100 ${totalH}`"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        v-if="isOutline"
        :points="svgPoints"
        :stroke="color"
        :stroke-width="strokeWidth"
        fill="none"
        vector-effect="non-scaling-stroke"
        stroke-linejoin="miter"
      />
      <polygon
        v-else
        :points="svgPoints"
        :fill="color"
      />
    </svg>

    <div v-if="$slots.default" class="bd-merktegel-lijn-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/*
 * Total height = (1 + stripHeight) × ribbon-x.
 * The elevated tab (always 1×) sticks up above the lower strip.
 *
 * Typical use — break out of layout insets to reach the true slide bottom:
 *
 *   <div style="position: absolute;
 *               bottom: calc(-1 * var(--ribbon-x));
 *               left:   calc(-1 * var(--ribbon-x));
 *               right:  calc(-1 * var(--ribbon-x));
 *               z-index: 10;">
 *     <MerktegelLijn variant="filled">Hoofdstuk 1</MerktegelLijn>
 *   </div>
 *
 * The negative ribbon-x offsets cancel the layout's side-margin inset so the
 * component spans the full slide canvas width and aligns flush to the bottom.
 */
.bd-merktegel-lijn {
  position: relative;
  width: 100%;
  height: calc(var(--ribbon-x) * var(--bd-ml-total-h));
  overflow: visible;
}

.bd-merktegel-lijn-shape {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/*
 * Content sits in the elevated half (left for stepSide=left, right for stepSide=right).
 * It spans the full component height so text starts at the top of the tab.
 */
.bd-merktegel-lijn-content {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 var(--ribbon-x);
  color: var(--bd-contrastkleur-lintblauw);
  font-family: var(--bd-font-regular-stack);
  font-size: calc(var(--ribbon-x) * 0.5);
  line-height: 1;
  pointer-events: none;
}

.bd-merktegel-lijn--left .bd-merktegel-lijn-content {
  left: 0;
  right: 50%;
}

.bd-merktegel-lijn--right .bd-merktegel-lijn-content {
  left: 50%;
  right: 0;
}
</style>
