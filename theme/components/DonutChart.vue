<script setup>
import { computed } from 'vue'

// Ordered brand-palette fallback — used when a segment has no explicit color.
const PALETTE = [
  'var(--bd-domeinkleur-lichtblauw)',
  'var(--bd-contrastkleur-lintblauw)',
  'var(--bd-accentkleur-violet)',
  'var(--bd-domeinkleur-lichtblauw-45)',
  'var(--bd-accentkleur-hemelblauw)',
  'var(--bd-accentkleur-oranje)',
  'var(--bd-accentkleur-donkergeel)',
  'var(--bd-signaalkleur-groen)',
]

// Fixed SVG design geometry (SVG user units, viewBox is dynamic)
const CX = 50
const CY = 50
const OUTER_R = 36
const LABEL_GAP = 5  // gap between outer ring edge and label anchor

const props = defineProps({
  // Required: array of segment descriptors
  segments: { type: Array, default: () => [] },

  // Ring geometry: inner radius as fraction of outer (thick brand ring = 0.55)
  innerRatio: { type: Number, default: 0.55 },

  // Outside-ring labels
  showLabels: { type: Boolean, default: true },
  // 'percent' shows "79%"; 'value' shows the raw value. Per-segment valueLabel overrides this.
  labelFormat: { type: String, default: 'percent' },

  // How far highlighted slices are pushed outward (SVG units)
  highlightOffset: { type: Number, default: 7 },

  // Legend panel
  legend: { type: Boolean, default: false },
  legendTitle: { type: String, default: '' },
  legendSubtitle: { type: String, default: '' },
  // Controls which side the legend appears relative to the chart.
  // 'right' (default) | 'left' | 'below' | 'above'
  legendPosition: { type: String, default: 'right' },
})

const innerR = computed(() => OUTER_R * props.innerRatio)
const midR  = computed(() => (OUTER_R + innerR.value) / 2)
const strokeW = computed(() => OUTER_R - innerR.value)
const circ  = computed(() => 2 * Math.PI * midR.value)

const total = computed(() =>
  props.segments.reduce((s, seg) => s + (seg.value ?? 0), 0) || 1,
)

const segData = computed(() => {
  let cumAngleDeg = 0
  return props.segments.map((seg, i) => {
    const color    = seg.color ?? PALETTE[i % PALETTE.length]
    const fraction = (seg.value ?? 0) / total.value
    const arcAngleDeg = fraction * 360
    const arcLen   = fraction * circ.value

    // Rotate each segment to start at 12 o'clock (-90°) + cumulative offset.
    const startAngleDeg = -90 + cumAngleDeg
    const midAngleDeg   = startAngleDeg + arcAngleDeg / 2
    const midAngleRad   = midAngleDeg * (Math.PI / 180)

    // Highlight: translate segment radially outward from center.
    const hOff = seg.highlighted ? props.highlightOffset : 0
    const hdx  = Math.cos(midAngleRad) * hOff
    const hdy  = Math.sin(midAngleRad) * hOff

    const transform = hOff > 0
      ? `translate(${hdx.toFixed(3)},${hdy.toFixed(3)}) rotate(${startAngleDeg},${CX},${CY})`
      : `rotate(${startAngleDeg},${CX},${CY})`

    // Label anchor: outside ring, shifted outward for highlighted slices.
    const labelR = OUTER_R + LABEL_GAP + hOff
    const lx = CX + Math.cos(midAngleRad) * labelR
    const ly = CY + Math.sin(midAngleRad) * labelR
    // Align text anchor based on left/right half of circle.
    const textAnchor = lx > CX + 3 ? 'start' : lx < CX - 3 ? 'end' : 'middle'

    // Label text: per-segment valueLabel wins; else apply labelFormat.
    let labelText
    if (seg.valueLabel != null) {
      labelText = seg.valueLabel
    } else if (props.labelFormat === 'percent') {
      labelText = `${Math.round(fraction * 100)}%`
    } else {
      labelText = String(seg.value)
    }

    cumAngleDeg += arcAngleDeg
    return { color, arcLen, transform, lx, ly, textAnchor, labelText, fraction }
  })
})

// Only render labels for segments large enough to be legible.
const labelData = computed(() => segData.value.filter(s => s.fraction > 0.02))

// viewBox grows to accommodate labels + highlight offset on all sides.
const viewBox = computed(() => {
  const pad = OUTER_R + LABEL_GAP + props.highlightOffset + 10
  return `${CX - pad} ${CY - pad} ${pad * 2} ${pad * 2}`
})
</script>

<template>
  <div class="bd-donut" :class="[{ 'bd-donut--with-legend': legend }, legend ? `bd-donut--${legendPosition}` : '']">

    <!-- SVG donut (always first = left side) -->
    <div class="bd-donut-chart-wrap">
      <svg
        class="bd-donut-svg"
        :viewBox="viewBox"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
      >
        <!-- Background track (unfilled ring) -->
        <circle
          :cx="CX" :cy="CY" :r="midR"
          fill="none"
          stroke="var(--bd-domeinkleur-lichtblauw-15)"
          :stroke-width="strokeW"
        />

        <!-- Coloured segments -->
        <circle
          v-for="(seg, i) in segData"
          :key="i"
          :cx="CX" :cy="CY" :r="midR"
          fill="none"
          :stroke="seg.color"
          :stroke-width="strokeW"
          :stroke-dasharray="`${seg.arcLen} ${circ}`"
          stroke-dashoffset="0"
          :transform="seg.transform"
          stroke-linecap="butt"
        />

        <!-- Outside-ring labels -->
        <text
          v-for="(seg, i) in labelData"
          v-show="showLabels"
          :key="`l${i}`"
          :x="seg.lx"
          :y="seg.ly"
          :text-anchor="seg.textAnchor"
          dominant-baseline="middle"
          class="bd-donut-label"
        >{{ seg.labelText }}</text>
      </svg>

      <!-- Center slot: overlaid on top of the SVG -->
      <div v-if="$slots.center" class="bd-donut-center">
        <slot name="center" />
      </div>
    </div>

    <!-- Optional legend panel (right side of chart) -->
    <div v-if="legend" class="bd-donut-legend">
      <div v-if="legendTitle" class="bd-donut-legend-title">{{ legendTitle }}</div>
      <div v-if="legendSubtitle" class="bd-donut-legend-subtitle">{{ legendSubtitle }}</div>
      <div class="bd-donut-legend-items">
        <div v-for="(seg, i) in segData" :key="i" class="bd-donut-legend-item">
          <span class="bd-donut-legend-swatch" :style="{ background: seg.color }" />
          <span class="bd-donut-legend-text">
            <strong v-if="segments[i].valueLabel" class="bd-donut-legend-value">
              {{ segments[i].valueLabel }}
            </strong>
            <span v-if="segments[i].label" class="bd-donut-legend-desc">
              {{ segments[i].label }}
            </span>
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/*
 * Size is driven by --donut-size (default 200px).
 * Override with style="--donut-size: 180px" on the component.
 * With legendPosition="right"|"left" the chart and legend sit side-by-side.
 * With legendPosition="below"|"above" the legend stacks under/over the chart.
 */
.bd-donut {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  /* Fill parent so legend flex:1 gets all remaining horizontal space */
  width: 100%;
  /* Prevent flex parents with align-items:stretch from overriding alignment */
  align-self: center;
}

/* ── Legend position variants ────────────────────────────── */
.bd-donut--left {
  flex-direction: row-reverse;
}

.bd-donut--below,
.bd-donut--above {
  flex-direction: column;
  align-items: flex-start;
}

.bd-donut--above {
  flex-direction: column-reverse;
}

/* ── Legend ──────────────────────────────────────────────── */
.bd-donut-legend {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.bd-donut-legend-title {
  font-family: var(--bd-font-bold-stack);
  font-size: 14pt;
  color: var(--bd-contrastkleur-lintblauw);
  line-height: 1.1;
}

.bd-donut-legend-subtitle {
  font-family: var(--bd-font-regular-stack);
  font-size: 11pt;
  color: var(--bd-tekst-primair);
  line-height: 1.3;
  margin-bottom: 0.2rem;
}

.bd-donut-legend-items {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.bd-donut-legend-item {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
}

.bd-donut-legend-swatch {
  display: inline-block;
  width: 13px;
  height: 13px;
  border-radius: 2px;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.bd-donut-legend-value {
  font-family: var(--bd-font-bold-stack);
  font-size: 11pt;
  color: var(--bd-contrastkleur-lintblauw);
  display: block;
  line-height: 1.15;
}

.bd-donut-legend-desc {
  font-family: var(--bd-font-regular-stack);
  font-size: 10pt;
  color: var(--bd-tekst-primair);
  display: block;
  line-height: 1.2;
}

/* ── Chart wrap + SVG ────────────────────────────────────── */
.bd-donut-chart-wrap {
  position: relative;
  /*
   * Chart is always a fixed square driven by --donut-size.
   * Using explicit width+height (not height:100%+aspect-ratio) so the chart
   * renders correctly regardless of parent flex direction or height.
   */
  flex: 0 0 auto;
  width: var(--donut-size, 200px);
  height: var(--donut-size, 200px);
}

.bd-donut-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* ── SVG text labels ─────────────────────────────────────── */
.bd-donut-label {
  font-family: var(--bd-font-bold-stack);
  font-size: 4px;
  fill: var(--bd-contrastkleur-lintblauw);
}

/* ── Center slot overlay ─────────────────────────────────── */
.bd-donut-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
}
</style>
