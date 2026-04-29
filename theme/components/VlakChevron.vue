<script setup>
defineProps({
  color: { type: String, default: 'var(--bd-domeinkleur-lichtblauw)' },
  // size: side length of the rotated square; determines visual height of the ">"
  size: { type: String, default: '48px' },
  strokeWidth: { type: String, default: '3px' },
  // gap: horizontal padding on both sides, creating breathing room in the gap
  gap: { type: String, default: '14px' },
})
</script>

<template>
  <div
    class="bd-vlak-chevron"
    :style="{ '--chev-color': color, '--chev-size': size, '--chev-stroke': strokeWidth, '--chev-gap': gap }"
  >
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
  /* Total width = rotated square span + horizontal padding on each side */
  width: calc(var(--chev-size) * 1.42 + var(--chev-gap) * 2);
  padding: 0 var(--chev-gap);
}

/* A square rotated 45° — two of its sides form the ">" shape */
.bd-vlak-chevron-inner {
  flex-shrink: 0;
  width: var(--chev-size);
  height: var(--chev-size);
  border-top: var(--chev-stroke) solid var(--chev-color);
  border-right: var(--chev-stroke) solid var(--chev-color);
  transform: rotate(45deg);
}
</style>
