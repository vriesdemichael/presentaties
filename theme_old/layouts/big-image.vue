<script setup>
defineProps({
  image: { type: String, default: '' },
  backgroundSize: { type: String, default: 'cover' },
  backgroundPosition: { type: String, default: 'center' },
})
</script>

<template>
  <div
    class="slidev-layout bd-big-image"
    :style="{
      backgroundImage: image ? `url(${image})` : undefined,
      backgroundSize,
      backgroundRepeat: 'no-repeat',
      backgroundPosition,
    }"
  >
    <div v-if="$slots.image" class="bd-big-image-media">
      <slot name="image" />
    </div>
    <div v-if="$slots.caption || $slots.default" class="bd-big-image-title">
      <slot name="caption">
        <slot />
      </slot>
    </div>
  </div>
</template>

<style scoped>
.bd-big-image {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
}

.bd-big-image-media {
  position: absolute;
  inset: 0;
}

.bd-big-image-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.2rem 3rem;
  background: rgba(21, 66, 115, 0.82);
  color: #fff;
}

.bd-big-image-title :deep(h1),
.bd-big-image-title :deep(h2),
.bd-big-image-title :deep(p) {
  color: #fff;
  margin: 0;
}
</style>
