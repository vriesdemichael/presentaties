<script setup>
import { computed } from "vue";

const props = defineProps({
  title: { type: String, default: "" },
  rows: { type: Array, default: () => [] },
  legend: { type: Array, default: () => [] },
});

const normalizedRows = computed(() =>
  (Array.isArray(props.rows) ? props.rows : []).map((row) => ({
    label: row?.label || "",
    segments: Array.isArray(row?.segments)
      ? row.segments.map((segment) => ({
          width: segment?.width || "",
          color: segment?.color || "",
        }))
      : [],
  })),
);

const normalizedLegend = computed(() =>
  (Array.isArray(props.legend) ? props.legend : []).map((item) => ({
    label: item?.label || "",
    color: item?.color || "",
  })),
);
</script>

<template>
  <div class="split-chart">
    <div v-if="title" class="split-chart-title">{{ title }}</div>
    <div class="split-chart-grid">
      <div
        v-for="(row, rowIndex) in normalizedRows"
        :key="`chart-row-${rowIndex}`"
        class="split-chart-row"
      >
        <div class="split-chart-label">{{ row.label }}</div>
        <div class="split-chart-bars">
          <span
            v-for="(segment, segmentIndex) in row.segments"
            :key="`segment-${rowIndex}-${segmentIndex}`"
            class="split-chart-segment"
            :style="{ width: segment.width, background: segment.color }"
          />
        </div>
      </div>
    </div>
    <div v-if="normalizedLegend.length" class="split-chart-legend">
      <span
        v-for="(item, itemIndex) in normalizedLegend"
        :key="`legend-${itemIndex}`"
        class="split-chart-legend-item"
      >
        <span class="split-chart-swatch" :style="{ background: item.color }" />
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.split-chart {
  width: 100%;
  color: var(--bd-contrastkleur-lintblauw);
  font-family: var(--bd-font-regular-stack);
}

.split-chart-title {
  font-family: var(--bd-font-bold-stack);
  font-size: 16pt;
  margin-bottom: 0.75rem;
}

.split-chart-grid {
  display: grid;
  gap: 0.75rem;
}

.split-chart-row {
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: 0.7rem;
  align-items: center;
}

.split-chart-label {
  font-size: 9pt;
  color: rgba(21, 66, 115, 0.8);
}

.split-chart-bars {
  display: flex;
  gap: 0.08rem;
  align-items: center;
  height: 1.1rem;
}

.split-chart-segment {
  height: 100%;
}

.split-chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.65rem;
  margin-top: 0.95rem;
  font-size: 9pt;
  color: rgba(21, 66, 115, 0.82);
}

.split-chart-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.22rem;
}

.split-chart-swatch {
  width: 0.4rem;
  height: 0.4rem;
  display: inline-block;
}
</style>
