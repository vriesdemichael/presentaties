<script setup>
import { computed } from 'vue'

const props = defineProps({
  shape: { type: String, default: 'plain' },
  variant: { type: String, default: 'plain' },
  fill: { type: String, default: 'var(--bd-domeinkleur-lichtblauw-30)' },
  // border: explicit border color. Defaults to fill (invisible border).
  // Set to a different color for a visible outline.
  border: { type: String, default: null },
  // borderWidth: set > 0 to show a border. Default 0 = no border (backward-compatible).
  borderWidth: { type: String, default: '0' },
  textColor:{ type: String, default: 'var(--bd-contrastkleur-lintblauw)' },
  padding: { type: String, default: 'var(--ribbon-x-quarter)' },
  tipSize: { type: String, default: 'var(--ribbon-x-half)' },
  columns: { type: [Number, String], default: 2 },
  items: { type: Array, default: () => [] },
})

const borderColor = computed(() => props.border ?? props.fill)

const rootClass = computed(() => ({
  'bd-vlak--speech-bottom-right': props.shape === 'speech-bottom-right',
  'bd-vlak--arrow-right': props.shape === 'arrow-right',
  'bd-vlak--chevron-right': props.shape === 'chevron-right',
  'bd-vlak--chevron-left': props.shape === 'chevron-left',
  'bd-vlak--info-grid': props.variant === 'info-grid',
}))

const rootStyle = computed(() => ({
  '--vlak-fill': props.fill,
  '--vlak-border': borderColor.value,
  '--vlak-border-width': props.borderWidth,
  '--vlak-text-color': props.textColor,
  '--vlak-padding': props.padding,
  '--vlak-tip-size': props.tipSize,
  '--vlak-columns': String(Math.max(1, Number(props.columns) || 1)),
}))
</script>

<template>
  <div class="bd-vlak" :class="rootClass" :style="rootStyle">
    <div class="bd-vlak-body">
      <div v-if="variant === 'info-grid'" class="bd-vlak-info-grid">
        <div
          v-for="(item, index) in items"
          :key="`vlak-item-${index}`"
          class="bd-vlak-info-item"
        >
          <slot name="item" :item="item" :index="index">{{ item }}</slot>
        </div>
        <slot v-if="!items.length" />
      </div>
      <slot v-else />
    </div>
  </div>
</template>

<style scoped>
.bd-vlak {
  position: relative;
  background: var(--vlak-fill);
  color: var(--vlak-text-color);
  box-sizing: border-box;
  /* Plain shape border — rendered via standard CSS border.
     When border === fill (default) it is visually invisible. */
  border: var(--vlak-border-width) solid var(--vlak-border);
}

.bd-vlak-body {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: var(--vlak-padding);
}

.bd-vlak-info-grid {
  display: grid;
  grid-template-columns: repeat(var(--vlak-columns), minmax(0, 1fr));
  column-gap: var(--ribbon-x);
  row-gap: var(--ribbon-x-quarter);
}

.bd-vlak-info-item {
  min-width: 0;
}

.bd-vlak-info-item :slotted(strong),
.bd-vlak-info-item :slotted(h3),
.bd-vlak-info-item :slotted(h4) {
  display: block;
  margin-bottom: 0.08rem;
  font-family: var(--bd-font-bold-stack);
  font-size: 10.5pt;
  line-height: 1.02;
}

.bd-vlak-info-item :slotted(span),
.bd-vlak-info-item :slotted(p),
.bd-vlak-info-item :slotted(div) {
  display: block;
  font-family: var(--bd-font-regular-stack);
  font-size: 11.5pt;
  line-height: 1.22;
  color: inherit;
}

.bd-vlak--speech-bottom-right::after,
.bd-vlak--arrow-right::after {
  content: '';
  position: absolute;
  background: inherit;
}

.bd-vlak--speech-bottom-right::after {
  right: 0;
  bottom: calc(var(--vlak-tip-size) * -0.92);
  width: var(--vlak-tip-size);
  height: var(--vlak-tip-size);
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}

.bd-vlak--arrow-right::after {
  right: calc(var(--vlak-tip-size) * -0.82);
  top: 50%;
  width: var(--vlak-tip-size);
  height: var(--vlak-tip-size);
  transform: translateY(-50%);
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}

/*
 * chevron-right: pentagon shape where the right side forms a ">" pointing
 * right. The tip is the rightmost point of the element itself — no separate
 * connector component needed. Use a small gap between items in a flex row.
 *
 * Two-layer technique for the border:
 *   outer .bd-vlak  = border color, clip-path to pentagon shape
 *   inner .bd-vlak-body = fill color, clip-path to inset pentagon
 *
 * Pentagon coordinates (all within 0–100%):
 *   rect body: x = 0 … 100% - tipSize
 *   tip apex:  x = 100% (right edge of element), y = 50%
 */
.bd-vlak--chevron-right {
  border: none;
  background: var(--vlak-border);
  clip-path: polygon(
    0 0,
    calc(100% - var(--vlak-tip-size)) 0,
    calc(100% - var(--vlak-tip-size)) calc(50% - var(--vlak-tip-size)),
    100% 50%,
    calc(100% - var(--vlak-tip-size)) calc(50% + var(--vlak-tip-size)),
    calc(100% - var(--vlak-tip-size)) 100%,
    0 100%
  );
}

/* Fill layer: same pentagon inset by border-width on each edge.
   The 45° diagonal edges require √2 ≈ 1.414× the border-width as inset. */
.bd-vlak--chevron-right .bd-vlak-body {
  position: absolute;
  inset: 0;
  background: var(--vlak-fill);
  /* Keep content well clear of the tip column */
  padding: var(--vlak-padding);
  padding-right: var(--vlak-tip-size);
  clip-path: polygon(
    var(--vlak-border-width) var(--vlak-border-width),
    calc(100% - var(--vlak-tip-size) - var(--vlak-border-width)) var(--vlak-border-width),
    calc(100% - var(--vlak-tip-size) - var(--vlak-border-width)) calc(50% - var(--vlak-tip-size) + calc(var(--vlak-border-width) * 0.4142)),
    calc(100% - calc(var(--vlak-border-width) * 1.4142)) 50%,
    calc(100% - var(--vlak-tip-size) - var(--vlak-border-width)) calc(50% + var(--vlak-tip-size) - calc(var(--vlak-border-width) * 0.4142)),
    calc(100% - var(--vlak-tip-size) - var(--vlak-border-width)) calc(100% - var(--vlak-border-width)),
    var(--vlak-border-width) calc(100% - var(--vlak-border-width))
  );
}

/*
 * chevron-left: pentagon shape where the left side forms a "<" pointing left.
 * Mirror of chevron-right — tip at x=0, body from tipSize to 100%.
 */
.bd-vlak--chevron-left {
  border: none;
  background: var(--vlak-border);
  clip-path: polygon(
    100% 0,
    var(--vlak-tip-size) 0,
    var(--vlak-tip-size) calc(50% - var(--vlak-tip-size)),
    0 50%,
    var(--vlak-tip-size) calc(50% + var(--vlak-tip-size)),
    var(--vlak-tip-size) 100%,
    100% 100%
  );
}

.bd-vlak--chevron-left .bd-vlak-body {
  position: absolute;
  inset: 0;
  background: var(--vlak-fill);
  padding: var(--vlak-padding);
  padding-left: calc(var(--vlak-tip-size) + var(--vlak-padding));
  clip-path: polygon(
    calc(100% - var(--vlak-border-width)) var(--vlak-border-width),
    calc(var(--vlak-tip-size) + var(--vlak-border-width)) var(--vlak-border-width),
    calc(var(--vlak-tip-size) + var(--vlak-border-width)) calc(50% - var(--vlak-tip-size) + calc(var(--vlak-border-width) * 0.4142)),
    calc(var(--vlak-border-width) * 1.4142) 50%,
    calc(var(--vlak-tip-size) + var(--vlak-border-width)) calc(50% + var(--vlak-tip-size) - calc(var(--vlak-border-width) * 0.4142)),
    calc(var(--vlak-tip-size) + var(--vlak-border-width)) calc(100% - var(--vlak-border-width)),
    calc(100% - var(--vlak-border-width)) calc(100% - var(--vlak-border-width))
  );
}
</style>
