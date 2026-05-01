<!-- internal: layout primitive — used by layouts, not for direct slide use -->
<script setup>
import Ribbon from './Ribbon.vue'

defineProps({
  background: { type: String, default: '#ffffff' },
})
</script>

<template>
  <div class="slidev-layout bd-surface bd-surface-base">
    <div class="bd-surface-background" :style="{ background }" aria-hidden="true" />

    <slot name="logo">
      <Ribbon />
    </slot>

    <div class="bd-surface-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* All base tokens and structural reset live in .bd-surface-base (index.css). */

.bd-surface-background {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.bd-surface-content {
  position: absolute;
  left: var(--ribbon-side-margin);
  right: var(--ribbon-side-margin);
  top: var(--ribbon-content-top);
  bottom: var(--ribbon-side-margin);
  z-index: 3;
}
</style>
