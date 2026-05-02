<!--
  BarChart — horizontal stacked bars or vertical grouped bars.

  HORIZONTAL STACKED (default)
  ─────────────────────────────
  Each bar is a row of stacked segments. Values are proportional to max
  (default: largest bar total). Good for survey results and distributions.

  <BarChart
    :bars="[
      { label: 'Telefonie', values: { Tevreden: 70, Neutraal: 20, Ontevreden: 10 } },
      { label: 'Post',      values: { Tevreden: 45, Neutraal: 30, Ontevreden: 25 } },
    ]"
  />

  VERTICAL GROUPED
  ─────────────────
  Each bar group shows one column per series, side-by-side. Heights are
  proportional to max (default: largest single value). Good for comparisons.

  <BarChart
    direction="vertical"
    :bars="[
      { label: 'Q1', values: { Kanaal A: 42, 'Kanaal B': 28 } },
      { label: 'Q2', values: { Kanaal A: 55, 'Kanaal B': 37 } },
    ]"
  />

  PROPS
  ──────
  bars          {label: string, values: {[seriesKey]: number}}[]   required
  direction     'horizontal' | 'vertical'                          default: 'horizontal'
  max           number                                             auto
  series        {[seriesKey]: {color?: string}}                    optional color overrides
  title         string                                             ''
  showValues    boolean                                            false
  legend        boolean                                            true (hidden when 1 series)
  labelWidth    string                                             '5rem' (horizontal only)
-->
<script setup>
import { computed } from 'vue'

const PALETTE = [
  'var(--bd-domeinkleur-lichtblauw)',
  'var(--bd-contrastkleur-lintblauw)',
  'var(--bd-accentkleur-hemelblauw)',
  'var(--bd-accentkleur-violet)',
  'var(--bd-accentkleur-oranje)',
  'var(--bd-accentkleur-donkergeel)',
  'var(--bd-signaalkleur-groen)',
  'var(--bd-signaalkleur-rood)',
]

const props = defineProps({
  bars:       { type: Array,   default: () => [] },
  direction:  { type: String,  default: 'horizontal' },
  max:        { type: Number,  default: null },
  series:     { type: Object,  default: () => ({}) },
  title:      { type: String,  default: '' },
  showValues: { type: Boolean, default: false },
  legend:     { type: Boolean, default: true },
  labelWidth: { type: String,  default: '5rem' },
})

// Collect all series keys in order of first appearance across all bars.
const seriesKeys = computed(() => {
  const seen = new Set()
  for (const bar of props.bars) {
    if (bar?.values && typeof bar.values === 'object') {
      for (const key of Object.keys(bar.values)) seen.add(key)
    }
  }
  return [...seen]
})

// Warn in dev if a bar has keys not in the global key set (mismatched data).
if (import.meta.env.DEV) {
  const globalKeys = new Set(seriesKeys.value)
  for (const bar of props.bars) {
    for (const key of Object.keys(bar?.values ?? {})) {
      if (!globalKeys.has(key)) {
        console.warn(`[BarChart] Unknown series key "${key}" in bar "${bar.label}".`)
      }
    }
  }
}

function colorFor(key, index) {
  return props.series?.[key]?.color ?? PALETTE[index % PALETTE.length]
}

// Horizontal: max = largest sum of all values in a bar.
const maxHorizontal = computed(() => {
  if (props.max != null) return props.max
  return Math.max(1, ...props.bars.map((b) =>
    Object.values(b?.values ?? {}).reduce((s, v) => s + (v || 0), 0),
  ))
})

// Vertical: max = largest single value across all bars and series.
const maxVertical = computed(() => {
  if (props.max != null) return props.max
  let m = 1
  for (const bar of props.bars) {
    for (const v of Object.values(bar?.values ?? {})) {
      if ((v || 0) > m) m = v
    }
  }
  return m
})

const showLegend = computed(() => props.legend && seriesKeys.value.length > 1)

const legendItems = computed(() =>
  seriesKeys.value.map((key, i) => ({ key, color: colorFor(key, i) })),
)
</script>

<template>
  <div class="bd-bar-chart" :class="`bd-bar-chart--${direction}`">
    <div v-if="title" class="bd-bar-chart-title">{{ title }}</div>

    <!-- HORIZONTAL STACKED -->
    <div v-if="direction === 'horizontal'" class="bd-bar-chart-grid" :style="{ '--label-width': labelWidth }">
      <div
        v-for="(bar, barIndex) in bars"
        :key="`bar-${barIndex}`"
        class="bd-bar-chart-row"
      >
        <div class="bd-bar-chart-label">{{ bar.label }}</div>
        <div class="bd-bar-chart-track">
          <span
            v-for="(key, keyIndex) in seriesKeys"
            :key="`seg-${barIndex}-${keyIndex}`"
            class="bd-bar-chart-segment"
            :style="{
              width: `${((bar.values?.[key] || 0) / maxHorizontal) * 100}%`,
              background: colorFor(key, keyIndex),
            }"
          >
            <span v-if="showValues && bar.values?.[key]" class="bd-bar-chart-value">
              {{ bar.values[key] }}
            </span>
          </span>
        </div>
      </div>
    </div>

    <!-- VERTICAL GROUPED -->
    <div v-else class="bd-bar-chart-vertical">
      <div class="bd-bar-chart-columns">
        <div
          v-for="(bar, barIndex) in bars"
          :key="`group-${barIndex}`"
          class="bd-bar-chart-group"
        >
          <div class="bd-bar-chart-columns-inner">
            <div
              v-for="(key, keyIndex) in seriesKeys"
              :key="`col-${barIndex}-${keyIndex}`"
              class="bd-bar-chart-column-wrap"
            >
              <span v-if="showValues && bar.values?.[key]" class="bd-bar-chart-column-value">
                {{ bar.values[key] }}
              </span>
              <div
                class="bd-bar-chart-column"
                :style="{
                  height: `${((bar.values?.[key] || 0) / maxVertical) * 100}%`,
                  background: colorFor(key, keyIndex),
                }"
              />
            </div>
          </div>
          <div class="bd-bar-chart-group-label">{{ bar.label }}</div>
        </div>
      </div>
    </div>

    <!-- LEGEND -->
    <div v-if="showLegend" class="bd-bar-chart-legend">
      <span
        v-for="item in legendItems"
        :key="item.key"
        class="bd-bar-chart-legend-item"
      >
        <span class="bd-bar-chart-swatch" :style="{ background: item.color }" />
        {{ item.key }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.bd-bar-chart {
  width: 100%;
  color: var(--bd-contrastkleur-lintblauw);
  font-family: var(--bd-font-regular-stack);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.bd-bar-chart-title {
  font-family: var(--bd-font-bold-stack);
  font-size: var(--bd-h3-size);
}

/* ── Horizontal stacked ── */
.bd-bar-chart-grid {
  display: grid;
  gap: 0.6rem;
}

.bd-bar-chart-row {
  display: grid;
  grid-template-columns: var(--label-width, 5rem) 1fr;
  gap: 0.6rem;
  align-items: center;
}

.bd-bar-chart-label {
  font-size: 9pt;
  color: var(--bd-tekst-secundair);
  text-align: right;
}

.bd-bar-chart-track {
  display: flex;
  height: 1.25rem;
  gap: 1px;
}

.bd-bar-chart-segment {
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: width 0.3s ease;
}

.bd-bar-chart-value {
  font-size: 8pt;
  color: #fff;
  padding: 0 0.25rem;
  white-space: nowrap;
  overflow: hidden;
}

/* ── Vertical grouped ── */
.bd-bar-chart-vertical {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.bd-bar-chart-columns {
  display: flex;
  align-items: stretch;
  gap: 1.5rem;
  height: 10rem;
}

.bd-bar-chart-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  flex: 1;
}

.bd-bar-chart-columns-inner {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  flex: 1;
  min-height: 0;
  width: 100%;
}

.bd-bar-chart-column-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  height: 100%;
  gap: 0.15rem;
}

.bd-bar-chart-column-value {
  font-size: 8pt;
  color: var(--bd-tekst-secundair);
  white-space: nowrap;
}

.bd-bar-chart-column {
  width: 100%;
  transition: height 0.3s ease;
}

.bd-bar-chart-group-label {
  font-size: 9pt;
  color: var(--bd-tekst-secundair);
  text-align: center;
  white-space: nowrap;
}

/* ── Legend ── */
.bd-bar-chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 0.65rem;
  font-size: 9pt;
  color: var(--bd-tekst-secundair);
}

.bd-bar-chart-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.bd-bar-chart-swatch {
  width: 0.55rem;
  height: 0.55rem;
  display: inline-block;
  flex-shrink: 0;
}
</style>
