<script setup>
import { computed } from 'vue'
import Ribbon from './Ribbon.vue'

const props = defineProps({
  mirror: { type: Boolean, default: false },
  primaryBackground: { type: String, default: 'var(--bd-domeinkleur-lichtblauw-30)' },
  secondaryBackground: { type: String, default: '#ffffff' },
})

const rootClass = computed(() => ({
  'bd-split-surface--mirrored': props.mirror,
}))
</script>

<template>
  <div class="slidev-layout bd-split-surface bd-surface-base" :class="rootClass">
    <div class="bd-split-surface-primary-bg" :style="{ background: primaryBackground }" aria-hidden="true" />
    <div class="bd-split-surface-secondary-bg" :style="{ background: secondaryBackground }" aria-hidden="true" />

    <slot name="logo">
      <Ribbon />
    </slot>

    <div class="bd-split-surface-primary">
      <slot name="primary" />
    </div>

    <div class="bd-split-surface-secondary">
      <slot name="secondary" />
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

.bd-split-surface-primary-bg,
.bd-split-surface-secondary-bg,
.bd-split-surface-primary,
.bd-split-surface-secondary {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
}

.bd-split-surface-primary-bg,
.bd-split-surface-primary {
  left: 0;
}

.bd-split-surface-secondary-bg,
.bd-split-surface-secondary {
  right: 0;
}

.bd-split-surface-primary-bg,
.bd-split-surface-secondary-bg {
  z-index: 1;
}

.bd-split-surface-primary,
.bd-split-surface-secondary {
  z-index: 3;
}

.bd-split-surface--mirrored .bd-split-surface-primary-bg,
.bd-split-surface--mirrored .bd-split-surface-primary {
  left: auto;
  right: 0;
}

.bd-split-surface--mirrored .bd-split-surface-secondary-bg,
.bd-split-surface--mirrored .bd-split-surface-secondary {
  right: auto;
  left: 0;
}
</style>
