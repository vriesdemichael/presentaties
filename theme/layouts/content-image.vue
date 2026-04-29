<script setup>
import SplitSurface from '../components/SplitSurface.vue'

defineProps({
  contentTitle: { type: String, default: '' },
  intro: { type: String, default: '' },
  body: { type: String, default: '' },
  image: { type: String, default: '' },
  imageFit: { type: String, default: 'cover' },
})
</script>

<template>
  <SplitSurface class="bd-content-image-bd" primary-background="#edf4f8" secondary-background="#ffffff">
    <template #primary>
      <div class="bd-content-image-bd-copy">
        <div v-if="contentTitle || $slots.title" class="bd-content-image-bd-title" role="heading" aria-level="1">
          <slot name="title">{{ contentTitle }}</slot>
        </div>
        <div v-if="intro || $slots.intro" class="bd-content-image-bd-intro">
          <slot name="intro">{{ intro }}</slot>
        </div>
        <div class="bd-content-image-bd-body">
          <slot>{{ body }}</slot>
        </div>
      </div>
    </template>

    <template #secondary>
      <div class="bd-content-image-bd-media">
        <slot name="media">
          <img v-if="image" :src="image" alt="" :style="{ objectFit: imageFit }" />
        </slot>
      </div>
    </template>
  </SplitSurface>
</template>

<style scoped>
.bd-content-image-bd-copy {
  box-sizing: border-box;
  height: 100%;
  padding:
    var(--ribbon-content-top)
    var(--ribbon-half-pane-inset)
    var(--ribbon-half-pane-inset)
    var(--ribbon-half-pane-inset);
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-content-image-bd-title {
  font-family: var(--bd-font-bold-stack);
  font-size: var(--bd-text-display);
  line-height: 1.08;
}

.bd-content-image-bd-intro {
  margin-top: 0.7rem;
  max-width: 24rem;
  font-family: var(--bd-font-regular-stack);
  font-size: var(--bd-body-size);
  line-height: 1.28;
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-content-image-bd-body {
  margin-top: 1rem;
  font-family: var(--bd-font-regular-stack);
  font-size: var(--bd-h4-size);
  line-height: 1.32;
}

.bd-content-image-bd-copy :deep(*) {
  color: inherit;
}

.bd-content-image-bd-media {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bd-content-image-bd-media img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
