<script setup>
defineProps({
  image: { type: String, required: true },
  captionPosition: { type: String, default: 'bottom' }, // 'top' | 'bottom'
  backgroundSize: { type: String, default: 'contain' },
  backgroundPosition: { type: String, default: 'center' },
})
</script>

<template>
  <div
    class="slidev-layout bd-image-caption"
    :class="`bd-caption-${captionPosition}`"
  >
    <div v-if="captionPosition === 'top'" class="bd-caption">
      <slot />
    </div>
    <div
      class="bd-image-area"
      :style="{
        backgroundImage: `url(${image})`,
        backgroundSize,
        backgroundRepeat: 'no-repeat',
        backgroundPosition,
      }"
    />
    <div v-if="captionPosition === 'bottom'" class="bd-caption">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.bd-image-caption {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
}

.bd-caption {
  flex: 0 0 auto;
  padding: 1.2rem 3rem;
  color: var(--bd-tekst);
}

/* Caption at top: slightly less top padding so text sits close to slide edge */
.bd-caption-top .bd-caption {
  padding-top: 1.6rem;
  padding-bottom: 0.6rem;
}

.bd-caption-bottom .bd-caption {
  padding-top: 0.6rem;
  padding-bottom: 1.6rem;
}

.bd-image-area {
  flex: 1 1 0;
  min-height: 0;
  width: 100%;
}
</style>
