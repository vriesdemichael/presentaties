<script setup>
defineProps({
  color: { type: String, default: 'var(--bd-domeinkleur-lichtblauw)' },
  size: { type: String, default: '20px' },
  strokeWidth: { type: String, default: '1.5px' },
})
</script>

<template>
  <div class="bd-vlak-chevron" :style="{ '--chev-color': color, '--chev-size': size, '--chev-stroke': strokeWidth }">
    <div class="bd-vlak-chevron-inner" />
  </div>
</template>

<style scoped>
/* A standalone ">" arrow that sits in the gap between two Vlak boxes.
   Place it as a flex sibling between <Vlak> elements.
   Parent flex container should have align-items: stretch (default).          */
.bd-vlak-chevron {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Width accommodates the rotated square: size * √2 */
  width: calc(var(--chev-size) * 1.42);
}

/* A square rotated 45° — two of its sides form the ">" shape */
.bd-vlak-chevron-inner {
  width: var(--chev-size);
  height: var(--chev-size);
  border-top: var(--chev-stroke) solid var(--chev-color);
  border-right: var(--chev-stroke) solid var(--chev-color);
  transform: rotate(45deg);
  flex-shrink: 0;
}
</style>
