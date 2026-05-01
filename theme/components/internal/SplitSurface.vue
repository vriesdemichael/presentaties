<!-- internal: layout primitive — used by layouts, not for direct slide use -->
<script setup>
import Ribbon from './Ribbon.vue'

defineProps({
  leftBackground: { type: String, default: 'var(--bd-domeinkleur-lichtblauw-30)' },
  rightBackground: { type: String, default: '#ffffff' },
})
</script>

<template>
  <div class="slidev-layout bd-split-surface bd-surface-base">
    <div class="bd-split-surface-left-bg" :style="{ background: leftBackground }" aria-hidden="true" />
    <div class="bd-split-surface-right-bg" :style="{ background: rightBackground }" aria-hidden="true" />

    <slot name="logo">
      <Ribbon />
    </slot>

    <div class="bd-split-surface-left">
      <slot name="left" />
    </div>

    <div class="bd-split-surface-right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.bd-split-surface {
  /* All base tokens and structural reset live in .bd-surface-base (index.css). */
  /* Override: SplitSurface uses ½X side margin, not the default 1X. */
  --ribbon-side-margin: var(--ribbon-x-half);
  --ribbon-content-inset: var(--ribbon-x-half);
  --ribbon-half-pane-inset: calc(var(--ribbon-side-margin) + var(--ribbon-content-inset));
  --ribbon-grid-gap: var(--ribbon-x-half);
}

.bd-split-surface-left-bg,
.bd-split-surface-right-bg,
.bd-split-surface-left,
.bd-split-surface-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
}

.bd-split-surface-left-bg,
.bd-split-surface-left {
  left: 0;
}

.bd-split-surface-right-bg,
.bd-split-surface-right {
  right: 0;
}

.bd-split-surface-left-bg,
.bd-split-surface-right-bg {
  z-index: 1;
}

.bd-split-surface-left,
.bd-split-surface-right {
  z-index: 3;
}
</style>
