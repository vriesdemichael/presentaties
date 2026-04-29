<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  start: { type: Number, default: 1 },
})

const normalizedItems = computed(() =>
  (Array.isArray(props.items) ? props.items : []).map((item) =>
    typeof item === 'string' ? { label: item, detail: '' } : { label: item?.label || '', detail: item?.detail || '' },
  ),
)
</script>

<template>
  <div class="bd-numbered-list">
    <div v-for="(item, index) in normalizedItems" :key="`${index}-${item.label}`" class="bd-numbered-list-item">
      <slot name="item" :item="item" :index="start + index">
        <div class="bd-numbered-list-index">{{ start + index }}</div>
        <div class="bd-numbered-list-copy">
          <div class="bd-numbered-list-label">{{ item.label }}</div>
          <div v-if="item.detail" class="bd-numbered-list-detail">{{ item.detail }}</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.bd-numbered-list {
  display: grid;
  gap: 1rem;
  width: 100%;
}

.bd-numbered-list-item {
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: 0.85rem;
  align-items: start;
}

.bd-numbered-list-index {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  background: var(--bd-domeinkleur-lichtblauw);
  color: var(--bd-contrastkleur-lintblauw);
  font-family: var(--bd-font-bold-stack);
  font-size: 16pt;
}

.bd-numbered-list-label {
  font-family: var(--bd-font-bold-stack);
  font-size: 18pt;
  line-height: 1.15;
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-numbered-list-detail {
  margin-top: 0.12rem;
  font-family: var(--bd-font-regular-stack);
  font-size: 12pt;
  line-height: 1.25;
  color: var(--bd-contrastkleur-lintblauw);
}
</style>
