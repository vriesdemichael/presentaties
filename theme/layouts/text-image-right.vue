<script setup>
defineProps({
  image: { type: String, required: true },
  backgroundSize: { type: String, default: 'contain' },
  backgroundPosition: { type: String, default: 'center' },
  imageMaxWidth: { type: String, default: '100%' },
  imageMaxHeight: { type: String, default: '100%' },
})
</script>

<template>
  <div class="slidev-layout bd-text-image-right">
    <div class="bd-content">
      <slot />
    </div>
    <div class="bd-image-panel">
      <slot name="image">
        <slot name="right">
          <img :src="image" alt="" :style="{ maxWidth: imageMaxWidth, maxHeight: imageMaxHeight }" />
        </slot>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.bd-text-image-right {
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

.bd-image-panel {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.bd-image-panel img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  mix-blend-mode: multiply;
}
</style>
