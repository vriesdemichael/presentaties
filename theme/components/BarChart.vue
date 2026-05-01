<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  rows: { type: Array, default: () => [] },
  legend: { type: Array, default: () => [] },
})

const normalizedRows = computed(() =>
  (Array.isArray(props.rows) ? props.rows : []).map((row) => ({
    label: row?.label || '',
    segments: Array.isArray(row?.segments)
      ? row.segments.map((segment) => ({
          width: segment?.width || '',
          color: segment?.color || '',
        }))
      : [],
  })),
)

const normalizedLegend = computed(() =>
  (Array.isArray(props.legend) ? props.legend : []).map((item) => ({
    label: item?.label || '',
    color: item?.color || '',
  })),
)
</script>

<template>
  <div class="bd-bar-chart">
    <div v-if="title" class="bd-bar-chart-title">{{ title }}</div>
    <div class="bd-bar-chart-grid">
      <div
        v-for="(row, rowIndex) in normalizedRows"
        :key="`chart-row-${rowIndex}`"
        class="bd-bar-chart-row"
      >
        <div class="bd-bar-chart-label">{{ row.label }}</div>
        <div class="bd-bar-chart-bars">
          <span
            v-for="(segment, segmentIndex) in row.segments"
            :key="`segment-${rowIndex}-${segmentIndex}`"
            class="bd-bar-chart-segment"
            :style="{ width: segment.width, background: segment.color }"
          />
        </div>
      </div>
    </div>
    <div v-if="normalizedLegend.length" class="bd-bar-chart-legend">
      <span
        v-for="(item, itemIndex) in normalizedLegend"
        :key="`legend-${itemIndex}`"
        class="bd-bar-chart-legend-item"
      >
        <span class="bd-bar-chart-swatch" :style="{ background: item.color }" />
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.bd-bar-chart {
  width: 100%;
  color: var(--bd-contrastkleur-lintblauw);
  font-family: var(--bd-font-regular-stack);
}

.bd-bar-chart-title {
  font-family: var(--bd-font-bold-stack);
  font-size: var(--bd-h3-size);
  margin-bottom: 0.75rem;
}

.bd-bar-chart-grid {
  display: grid;
  gap: 0.75rem;
}

.bd-bar-chart-row {
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: 0.7rem;
  align-items: center;
}

.bd-bar-chart-label {
  font-size: 9pt;
  color: var(--bd-tekst-secundair);
}

.bd-bar-chart-bars {
  display: flex;
  gap: 0.08rem;
  align-items: center;
  height: 1.1rem;
}

.bd-bar-chart-segment {
  height: 100%;
}

.bd-bar-chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.65rem;
  margin-top: 0.95rem;
  font-size: 9pt;
  color: var(--bd-tekst-secundair);
}

.bd-bar-chart-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.22rem;
}

.bd-bar-chart-swatch {
  width: 0.4rem;
  height: 0.4rem;
  display: inline-block;
}
</style>
