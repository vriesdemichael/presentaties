<script setup>
defineProps({
  image: { type: String, default: '' },
  backgroundSize: { type: String, default: 'contain' },
  backgroundPosition: { type: String, default: 'center' },
  backgroundOpacity: { type: Number, default: 1 },
})
</script>

<template>
  <div class="slidev-layout bd-text-decor-right">
    <div class="bd-content">
      <slot />
    </div>

    <div class="bd-right-panel">
      <div
        v-if="image"
        class="bd-decor-image"
        :style="{
          backgroundImage: `url(${image})`,
          backgroundSize,
          backgroundRepeat: 'no-repeat',
          backgroundPosition,
          opacity: backgroundOpacity,
        }"
      />
      <div class="bd-right-foreground">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bd-text-decor-right {
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
  position: relative;
  z-index: 2;
}

.bd-right-panel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bd-decor-image {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.bd-right-foreground {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
