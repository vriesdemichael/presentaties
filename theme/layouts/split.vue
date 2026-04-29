<script setup>
import SplitSurface from '../components/SplitSurface.vue'
import Ribbon from '../components/Ribbon.vue'

defineProps({
  pageTitle: { type: String, default: '' },
  mirror: { type: Boolean, default: false },
  leftBackground: { type: String, default: '#ffffff' },
  rightBackground: { type: String, default: 'var(--bd-domeinkleur-lichtblauw-30)' },
  rightPadding: { type: String, default: '' },
})
</script>

<template>
  <SplitSurface
    class="bd-text-heavy-bd"
    :mirror="mirror"
    :primary-background="leftBackground"
    :secondary-background="rightBackground"
  >
    <template #logo>
      <Ribbon />
    </template>

    <template #primary>
      <div class="bd-text-heavy-bd-copy">
        <div class="bd-text-heavy-bd-title" role="heading" aria-level="1">
          <slot name="title">{{ pageTitle }}</slot>
        </div>
        <div class="bd-text-heavy-bd-body">
          <slot />
        </div>
      </div>
    </template>

    <template #secondary>
      <div class="bd-text-heavy-bd-right" :style="rightPadding ? { '--bd-text-heavy-right-padding': rightPadding } : undefined">
        <slot name="right" />
      </div>
    </template>
  </SplitSurface>
</template>

<style scoped>
.bd-text-heavy-bd {
  --bd-text-heavy-gap: var(--ribbon-grid-gap);
  --bd-text-heavy-top-clearance: var(--ribbon-content-top);
  --bd-text-heavy-side-padding: var(--ribbon-half-pane-inset);
  --bd-text-heavy-pane-padding: var(--bd-text-heavy-top-clearance) var(--bd-text-heavy-side-padding) var(--bd-text-heavy-side-padding) var(--bd-text-heavy-side-padding);
  --bd-text-heavy-right-padding: var(--bd-text-heavy-pane-padding);
}

.bd-text-heavy-bd-copy,
.bd-text-heavy-bd-right {
  box-sizing: border-box;
  height: 100%;
}

.bd-text-heavy-bd-copy {
  padding: var(--bd-text-heavy-pane-padding);
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-text-heavy-bd-title {
  font-family: var(--bd-font-bold-stack);
  font-size: 34pt;
  line-height: 1.06;
  letter-spacing: -0.01em;
  max-width: 100%;
}

.bd-text-heavy-bd-body {
  margin-top: 0.6rem;
  max-width: 27rem;
  font-family: var(--bd-font-regular-stack);
  font-size: 12pt;
  line-height: 1.33;
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-text-heavy-bd-body :deep(h2) {
  margin: 1rem 0 0.2rem;
  font-family: var(--bd-font-bold-stack);
  font-size: 24pt;
  line-height: 1.12;
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-text-heavy-bd-body :deep(h2:first-child) {
  margin-top: 0;
}

.bd-text-heavy-bd-body :deep(p) {
  margin: 0;
}

.bd-text-heavy-bd-body :deep(ul) {
  margin: 0.2rem 0 0;
  padding-left: 1rem;
}

.bd-text-heavy-bd-body :deep(li) {
  margin: 0.08rem 0;
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-text-heavy-bd-body :deep(li::marker) {
  color: var(--bd-domeinkleur-lichtblauw);
}

.bd-text-heavy-bd-right {
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  padding: var(--bd-text-heavy-right-padding);
}

.bd-text-heavy-bd-right > :deep(*) {
  flex: 1 1 auto;
  min-height: 0;
}
</style>
