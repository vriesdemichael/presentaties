<script setup>
import SplitSurface from '../components/internal/SplitSurface.vue'
import Ribbon from '../components/internal/Ribbon.vue'

defineProps({
  pageTitle: { type: String, default: '' },
  leftBackground: { type: String, default: '#ffffff' },
  rightBackground: { type: String, default: 'var(--bd-domeinkleur-lichtblauw-30)' },
  leftInset: { type: String, default: '' },
  rightInset: { type: String, default: '' },
})
</script>

<template>
  <SplitSurface
    class="bd-text-heavy-bd"
    :left-background="leftBackground"
    :right-background="rightBackground"
  >
    <template #logo>
      <Ribbon />
    </template>

    <template #left>
      <div class="bd-text-heavy-bd-copy" :style="leftInset ? { '--bd-text-heavy-left-padding': leftInset } : undefined">
        <div class="bd-text-heavy-bd-title" role="heading" aria-level="1">
          <slot name="title">{{ pageTitle }}</slot>
        </div>
        <div class="bd-text-heavy-bd-body">
          <slot name="left" />
        </div>
      </div>
    </template>

    <template #right>
      <div class="bd-text-heavy-bd-right" :style="rightInset ? { '--bd-text-heavy-right-padding': rightInset } : undefined">
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
  --bd-text-heavy-left-padding: var(--bd-text-heavy-pane-padding);
  --bd-text-heavy-right-padding: var(--bd-text-heavy-pane-padding);
}

.bd-text-heavy-bd-copy,
.bd-text-heavy-bd-right {
  box-sizing: border-box;
  height: 100%;
}

.bd-text-heavy-bd-copy {
  display: flex;
  flex-direction: column;
  padding: var(--bd-text-heavy-left-padding);
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-text-heavy-bd-title {
  font-family: var(--bd-font-bold-stack);
  font-size: var(--bd-text-display);
  line-height: 1.06;
  letter-spacing: -0.01em;
  max-width: 100%;
}

.bd-text-heavy-bd-body {
  flex: 1 1 0;
  min-height: 0;
  width: 100%;
  margin-top: 0.6rem;
  font-family: var(--bd-font-regular-stack);
  font-size: var(--bd-body-size);
  line-height: 1.33;
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-text-heavy-bd-body :deep(h2) {
  max-width: 27rem;
  margin: 1rem 0 0.2rem;
  font-family: var(--bd-font-bold-stack);
  font-size: var(--bd-h2-size);
  line-height: 1.12;
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-text-heavy-bd-body :deep(h2:first-child) {
  margin-top: 0;
}

.bd-text-heavy-bd-body :deep(p) {
  max-width: 27rem;
  margin: 0;
}

.bd-text-heavy-bd-body :deep(ul) {
  max-width: 27rem;
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
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: var(--bd-text-heavy-right-padding);
}
</style>
