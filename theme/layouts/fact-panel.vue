<script setup>
import { computed, useSlots } from 'vue'
import Ribbon from '../components/internal/Ribbon.vue'
import { withBase } from '../lib/with-base'
const slots = useSlots()

const props = defineProps({
  panelTitle: { type: String, default: '' },
  image: { type: String, default: '' },
  imageCropLeft: { type: [Number, String], default: 0 },
  imageCropRight: { type: [Number, String], default: 0 },
  logoSrc: { type: String, default: '' },
  rows: { type: Array, default: () => [] },
})

function toPercent(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function normalizeIconName(value) {
  return String(value || '')
    .trim()
    .replace(/^\d+_/, '')
}

function normalizeRow(row) {
  const icon = row?.icon ? String(row.icon) : ''
  const iconName = normalizeIconName(row?.iconName)
  const lead = row?.lead ? String(row.lead) : ''
  const body = row?.body ? String(row.body) : ''
  const reverse = Boolean(row?.reverse || row?.reverseOrder)

  if (!icon && !iconName && !lead && !body) {
    return null
  }

  return {
    icon,
    iconName,
    lead,
    body,
    reverse,
  }
}

const hasTitle = computed(() => Boolean(props.panelTitle || slots.title))

const normalizedRows = computed(() => {
  const configuredRows = Array.isArray(props.rows)
    ? props.rows.map(normalizeRow).filter(Boolean)
    : []

  return configuredRows.slice(0, 4)
})

const photoStyle = computed(() => {
  const cropLeft = Math.max(0, toPercent(props.imageCropLeft))
  const cropRight = Math.max(0, toPercent(props.imageCropRight))
  const visiblePercent = 100 - cropLeft - cropRight

  if (!props.image || visiblePercent <= 0) {
    return {}
  }

  return {
    left: `${-(cropLeft / visiblePercent) * 100}%`,
    width: `${(100 / visiblePercent) * 100}%`,
  }
})

const resolvedImage = computed(() => withBase(props.image))
</script>

<template>
  <div class="slidev-layout bd-fact-panel bd-layout-canvas">
    <div class="bd-fact-panel-left" aria-hidden="true" />

    <div class="bd-fact-panel-photo">
      <slot name="photo">
        <img v-if="image" :src="resolvedImage" alt="" :style="photoStyle" />
      </slot>
    </div>

    <slot name="logo">
      <Ribbon :logo-src="logoSrc" />
    </slot>

    <!--
      Left panel content column.
      Uses CSS grid (auto 1fr) so the optional title claims its natural height
      and the rows container fills the remaining space.
      padding-top: ribbon-content-top clears the ribbon band;
      horizontal padding matches the theme's half-pane inset token.
    -->
    <div class="bd-fact-panel-panel">
      <div v-if="hasTitle" class="bd-fact-panel-title" role="heading" aria-level="1">
        <slot name="title">{{ panelTitle }}</slot>
      </div>

      <!--
        Rows are distributed with space-evenly so they fill the available
        height uniformly regardless of how many rows (1–4) are present.
      -->
      <div class="bd-fact-panel-rows">
        <div
          v-for="(row, index) in normalizedRows"
          :key="`${index}-${row.iconName}-${row.lead}-${row.body}`"
          class="bd-fact-panel-row"
        >
          <div class="bd-fact-panel-icon">
            <img v-if="row.icon" :src="row.icon" alt="" />
            <span v-else class="bd-fact-panel-icon-glyph bd-ro-icon" aria-hidden="true">{{ row.iconName }}</span>
          </div>

          <div class="bd-fact-panel-copy">
            <template v-if="row.reverse">
              <div v-if="row.body" class="bd-fact-panel-regular">{{ row.body }}</div>
              <div v-if="row.lead" class="bd-fact-panel-strong">{{ row.lead }}</div>
            </template>
            <template v-else>
              <div v-if="row.lead" class="bd-fact-panel-strong">{{ row.lead }}</div>
              <div v-if="row.body" class="bd-fact-panel-regular">{{ row.body }}</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bd-fact-panel {
  --ribbon-side-margin: var(--ribbon-x-half);
  --ribbon-content-inset: var(--ribbon-x-half);
  --ribbon-half-pane-inset: calc(var(--ribbon-side-margin) + var(--ribbon-content-inset));
}

.bd-fact-panel-left {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  background: var(--bd-domeinkleur-lichtblauw-30);
  z-index: 1;
}

.bd-fact-panel-photo {
  position: absolute;
  left: 50%;
  top: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.bd-fact-panel-photo img {
  position: absolute;
  top: 0;
  height: 100%;
  max-width: none;
  display: block;
}

/*
 * Content column: covers the left half, sits above the coloured background.
 * grid-template-rows: auto 1fr — title takes natural height, rows fill the rest.
 * When there is no title, the single grid child (rows) fills the full height.
 */
.bd-fact-panel-panel {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  padding: var(--ribbon-content-top) var(--ribbon-half-pane-inset) var(--ribbon-half-pane-inset);
  box-sizing: border-box;
  z-index: 3;
}

.bd-fact-panel-title {
  font-family: var(--bd-font-bold-stack);
  color: var(--bd-contrastkleur-lintblauw);
  font-size: 36pt;
  font-weight: 400;
  line-height: 1;
}

.bd-fact-panel-title :deep(*) {
  margin: 0;
  color: inherit;
  font: inherit;
  line-height: inherit;
}

/* Rows container fills the 1fr grid area and distributes rows evenly */
.bd-fact-panel-rows {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-height: 0;
}

.bd-fact-panel-row {
  display: grid;
  grid-template-columns: 13.4% minmax(0, 1fr);
  column-gap: 8.1%;
  align-items: center;
}

.bd-fact-panel-icon {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  aspect-ratio: 1 / 1;
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-fact-panel-icon img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.bd-fact-panel-icon-glyph {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 4.1rem;
  text-rendering: geometricPrecision;
}

.bd-fact-panel-copy {
  width: 100%;
}

.bd-fact-panel-copy :deep(*) {
  margin: 0;
}

.bd-fact-panel-strong,
.bd-fact-panel-copy :deep(.fact-panel-strong) {
  font-family: var(--bd-font-bold-stack);
  color: var(--bd-contrastkleur-lintblauw);
  font-size: 22.5pt;
  font-weight: 400;
  line-height: 1;
  overflow-wrap: break-word;
}

.bd-fact-panel-regular,
.bd-fact-panel-copy :deep(.fact-panel-regular) {
  font-family: var(--bd-font-regular-stack);
  color: #000000;
  font-size: 17.6pt;
  font-weight: 400;
  line-height: 1;
  overflow-wrap: break-word;
}

.bd-fact-panel-copy :deep(.fact-panel-strong + .fact-panel-regular),
.bd-fact-panel-copy :deep(.fact-panel-regular + .fact-panel-strong),
.bd-fact-panel-strong + .bd-fact-panel-regular,
.bd-fact-panel-regular + .bd-fact-panel-strong {
  margin-top: 0.18rem;
}
</style>
