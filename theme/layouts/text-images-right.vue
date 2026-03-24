<script setup>
defineProps({
  gap: { type: String, default: '0.75rem' },
})
</script>

<template>
  <div class="slidev-layout bd-text-images-right">
    <div class="bd-content">
      <slot />
    </div>
    <div class="bd-images-panel">
      <slot name="images">
        <slot name="right" />
      </slot>
    </div>
  </div>
</template>

<style scoped>
.bd-text-images-right {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
  padding: 0;
}

.bd-content {
  padding: 2rem 2rem 2rem 3rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bd-images-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: v-bind(gap);
  padding: 1.5rem 1.5rem 1.5rem 0.5rem;
  overflow: hidden;
}

/* Images placed in the slot fill the column evenly */
.bd-images-panel :deep(img) {
  width: 100%;
  flex: 1 1 0;
  min-height: 0;
  object-fit: contain;
  border-radius: 6px;
}
</style>
