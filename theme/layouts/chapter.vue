<script setup>
import SplitMerktegelSurface from '../components/SplitMerktegelSurface.vue'

defineProps({
  variant: { type: String, default: 'full-bleed-image' },
  chapterNumber: { type: String, default: '' },
  chapterTitle: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  image: { type: String, default: '' },
  mirror: { type: Boolean, default: false },
})
</script>

<template>
  <SplitMerktegelSurface
    class="bd-chapter-bd"
    :class="`bd-chapter-bd--${variant}`"
    :mirror="mirror"
    top-background="var(--bd-domeinkleur-lichtblauw)"
    bottom-background="#edf4f8"
    opposite-background="#ffffff"
  >
    <template #top>
      <div class="bd-chapter-bd-top">
        <div class="bd-chapter-bd-title" role="heading" aria-level="1">
          <slot name="title">{{ chapterTitle }}</slot>
        </div>
      </div>
    </template>

    <template #bottom>
      <div v-if="$slots.chapterNumber || chapterNumber || $slots.subtitle || subtitle || $slots.bottom" class="bd-chapter-bd-bottom">
        <div v-if="$slots.chapterNumber || chapterNumber" class="bd-chapter-bd-kicker">
          <slot name="chapterNumber">{{ chapterNumber }}</slot>
        </div>
        <div v-if="$slots.subtitle || subtitle" class="bd-chapter-bd-subtitle">
          <slot name="subtitle">{{ subtitle }}</slot>
        </div>
        <slot name="bottom" />
      </div>
    </template>

    <template #opposite>
      <div v-if="variant === 'content-right'" class="bd-chapter-bd-opposite bd-chapter-bd-opposite--content-right">
        <slot name="opposite">
          <slot />
        </slot>
      </div>
      <div v-else-if="image" class="bd-chapter-bd-image">
        <img :src="image" alt="" />
      </div>
    </template>
  </SplitMerktegelSurface>
</template>

<style scoped>
.bd-chapter-bd-top,
.bd-chapter-bd-bottom {
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-chapter-bd-top {
  width: calc(var(--bd-split-merktegel-top-width) - (var(--ribbon-half-pane-inset) * 2));
  margin-top: var(--ribbon-content-top);
  margin-left: var(--ribbon-half-pane-inset);
}

.bd-chapter-bd-title {
  margin: 0;
  font-family: var(--bd-font-bold-stack);
  font-size: var(--bd-text-display);
  line-height: 1.08;
}

.bd-chapter-bd-bottom {
  width: calc(100% - (var(--ribbon-half-pane-inset) * 2));
  margin-top: var(--ribbon-x-half);
  margin-left: var(--ribbon-half-pane-inset);
  font-family: var(--bd-font-regular-stack);
}

.bd-chapter-bd-kicker {
  font-family: var(--bd-font-bold-stack);
  font-size: var(--bd-h3-size);
  line-height: 1.08;
}

.bd-chapter-bd-subtitle {
  margin-top: 0.28rem;
  font-size: var(--bd-body-size);
  line-height: 1.28;
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-chapter-bd-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bd-chapter-bd-opposite {
  width: 100%;
  height: 100%;
}

.bd-chapter-bd-opposite--content-right {
  display: flex;
  align-items: flex-start;
  padding: calc(var(--ribbon-content-top) + var(--ribbon-x)) var(--ribbon-half-pane-inset) var(--ribbon-half-pane-inset);
  box-sizing: border-box;
}

.bd-chapter-bd-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.bd-chapter-bd-title :deep(*),
.bd-chapter-bd-kicker :deep(*),
.bd-chapter-bd-subtitle :deep(*) {
  margin: 0;
  color: inherit;
  font: inherit;
  line-height: inherit;
}

.bd-chapter-bd-opposite--content-right :deep(*) {
  box-sizing: border-box;
}
</style>
