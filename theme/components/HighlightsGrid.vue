<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  compact: { type: Boolean, default: false },
})

function normalizeIconName(value) {
  return String(value || '').trim().replace(/^\d+_/, '')
}

function normalizeItem(item) {
  const iconSrc = item?.iconSrc ? String(item.iconSrc) : ''
  const iconName = normalizeIconName(item?.iconName)
  const label = item?.label ? String(item.label) : item?.value ? String(item.value) : ''
  const sublabel = item?.sublabel ? String(item.sublabel) : item?.body ? String(item.body) : ''

  if (!iconSrc && !iconName && !label && !sublabel) return null
  return { iconSrc, iconName, label, sublabel }
}

const renderedItems = computed(() => {
  const all = (Array.isArray(props.items) ? props.items : [])
    .map(normalizeItem)
    .filter(Boolean)

  if (import.meta.env.DEV && all.length > 6) {
    console.warn(
      `[HighlightsGrid] ${all.length} items provided but only 6 are supported. ` +
      `Items beyond index 5 will be silently dropped.`
    )
  }

  return all
    .slice(0, 6)
})

const gridStyle = computed(() => {
  const count = Math.max(1, renderedItems.value.length || 1)
  const compact = props.compact

  const iconSizes = compact
    ? { 1: '4.4rem', 2: '4.4rem', 3: '4rem', 4: '3.6rem', 5: '3.3rem', 6: '3rem' }
    : { 1: '4.8rem', 2: '4.8rem', 3: '4.7rem', 4: '4.5rem', 5: '4rem', 6: '3.5rem' }
  const labelSizes = compact
    ? { 1: '17pt', 2: '17pt', 3: '16.5pt', 4: '16pt', 5: '14.5pt', 6: '14pt' }
    : { 1: '19pt', 2: '19pt', 3: '18pt', 4: '18pt', 5: '16pt', 6: '15pt' }
  const sublabelSizes = compact
    ? { 1: '11pt', 2: '11pt', 3: '10.5pt', 4: '10pt', 5: '9.5pt', 6: '9pt' }
    : { 1: '12pt', 2: '12pt', 3: '11pt', 4: '11pt', 5: '10pt', 6: '9.5pt' }
  const gaps = compact
    ? { 1: '0rem', 2: '1.2rem', 3: '1rem', 4: '0.8rem', 5: '0.65rem', 6: '0.55rem' }
    : { 1: '0rem', 2: '1.5rem', 3: '1.2rem', 4: '1rem', 5: '0.8rem', 6: '0.65rem' }

  return {
    '--icon-highlights-count': String(count),
    '--icon-highlights-gap': gaps[count],
    '--icon-highlights-icon-size': iconSizes[count],
    '--icon-highlights-label-size': labelSizes[count],
    '--icon-highlights-sublabel-size': sublabelSizes[count],
  }
})
</script>

<template>
  <div class="bd-icon-highlights-grid" :style="gridStyle">
    <div
      v-for="(item, index) in renderedItems"
      :key="`${index}-${item.iconName}-${item.label}-${item.sublabel}`"
      class="bd-icon-highlights-grid-item"
    >
      <div class="bd-icon-highlights-grid-item-icon">
        <img v-if="item.iconSrc" :src="item.iconSrc" alt="" aria-hidden="true" />
        <span v-else class="bd-icon-highlights-grid-item-glyph bd-ro-icon" aria-hidden="true">{{ item.iconName }}</span>
      </div>
      <div v-if="item.label" class="bd-icon-highlights-grid-item-label">{{ item.label }}</div>
      <div v-if="item.sublabel" class="bd-icon-highlights-grid-item-sublabel">{{ item.sublabel }}</div>
    </div>
  </div>
</template>

<style scoped>
.bd-icon-highlights-grid {
  display: grid;
  grid-template-columns: repeat(var(--icon-highlights-count), minmax(0, 1fr));
  column-gap: var(--icon-highlights-gap);
  align-content: start;
  align-items: start;
}

.bd-icon-highlights-grid-item {
  display: flex;
  flex-direction: column;
  gap: 0.16rem;
  min-width: 0;
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-icon-highlights-grid-item-icon {
  height: var(--icon-highlights-icon-size);
  margin-bottom: 0.5rem;
}

.bd-icon-highlights-grid-item-icon img {
  display: block;
  width: auto;
  height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.bd-icon-highlights-grid-item-glyph {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  font-size: calc(var(--icon-highlights-icon-size) * 0.82);
}

.bd-icon-highlights-grid-item-label {
  font-family: var(--bd-font-bold-stack);
  font-size: var(--icon-highlights-label-size);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.02em;
  overflow-wrap: anywhere;
}

.bd-icon-highlights-grid-item-sublabel {
  font-family: var(--bd-font-regular-stack);
  font-size: var(--icon-highlights-sublabel-size);
  font-weight: 400;
  line-height: 1.12;
  white-space: pre-line;
  overflow-wrap: anywhere;
}
</style>
