<script setup>
/*
  StepSeriesJoin — boustrophedon (snake) step series across two rows.

  Renders two StepSeries rows in a column connected by an S-shaped SVG line:
    row 1 last circle → right arm → horizontal bridge → left arm → row 2 first circle

  The SVG path is measured on mount (and on resize) so it always aligns with the
  actual connector lines regardless of caption height, node size, or zoom level.

  ─────────────────────────────────────────────────────────
  Usage
  ─────────────────────────────────────────────────────────

  <StepSeriesJoin
    :row1="[
      { label: '1', caption: 'Aangifte',    body: 'Belastingplichtige doet aangifte online' },
      { label: '2', caption: 'Ontvangst',   body: 'Belastingdienst ontvangt het verzoek' },
    ]"
    :row2="[
      { label: '3', caption: 'Controle',    body: 'Gegevens worden gevalideerd' },
      { label: '4', caption: 'Beoordeling', body: 'Inhoudelijke toetsing' },
    ]"
    row-gap="5rem"
  />

  ─────────────────────────────────────────────────────────
  Props
  ─────────────────────────────────────────────────────────

  row1 / row2       Arrays of step items (same shape as StepSeries :items).
  rowGap            CSS gap between the two rows (default: "4rem").
                    Increase for more breathing room around the bridge line.

  All StepSeries visual props are forwarded identically to both rows:
  variant, lineColor, fillColor, borderColor, textColor, nodeSize, stepGap,
  labelSize, iconSize, strokeWidth, captionSize, captionBodySize.
*/

import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  row1: { type: Array, default: () => [] },
  row2: { type: Array, default: () => [] },

  // Visual — forwarded to both StepSeries rows
  variant:         { type: String, default: 'filled' },
  lineColor:       { type: String, default: 'var(--bd-domeinkleur-lichtblauw)' },
  fillColor:       { type: String, default: 'var(--bd-domeinkleur-lichtblauw)' },
  borderColor:     { type: String, default: 'var(--bd-domeinkleur-lichtblauw)' },
  textColor:       { type: String, default: 'var(--bd-contrastkleur-lintblauw)' },
  nodeSize:        { type: String, default: '2.95rem' },
  stepGap:         { type: String, default: '6.2rem' },
  labelSize:       { type: String, default: '16pt' },
  iconSize:        { type: String, default: '1.15rem' },
  strokeWidth:     { type: String, default: '2px' },
  captionSize:     { type: String, default: '9.2pt' },
  captionBodySize: { type: String, default: '8.15pt' },

  // Layout
  rowGap: { type: String, default: '4rem' },
});

const container = ref(null);
const connPath  = ref('');
const viewBox   = ref('0 0 100 100');

const SIDE_MARGIN = 48; // horizontal arm extension past caption edge (layout px)
let ro = null;

function measure() {
  const el = container.value;
  if (!el) return;

  const rows = el.querySelectorAll(':scope > .bd-step-series');
  if (rows.length < 2) return;

  const n1 = rows[0].querySelector('.bd-step-series-node');
  const n2 = rows[1].querySelector('.bd-step-series-node');
  if (!n1 || !n2) return;

  const dR  = el.getBoundingClientRect();
  const n1R = n1.getBoundingClientRect();
  const n2R = n2.getBoundingClientRect();

  // Scale factor: viewport CSS px → layout px (Slidev CSS-transforms slides).
  const scale = dR.width / el.offsetWidth;
  if (!scale) return;

  const H  = el.offsetHeight;
  const y1 = ((n1R.top + n1R.bottom) / 2 - dR.top) / scale;
  const y2 = ((n2R.top + n2R.bottom) / 2 - dR.top) / scale;

  // Right arm: extend past the last caption on row 1.
  const lastNodes   = rows[0].querySelectorAll('.bd-step-series-node');
  const lastNode    = lastNodes[lastNodes.length - 1];
  const xLastCircle = ((lastNode.getBoundingClientRect().left + lastNode.getBoundingClientRect().right) / 2 - dR.left) / scale;
  const xFirstCircle = ((n2R.left + n2R.right) / 2 - dR.left) / scale;

  const lastCaption = lastNode.closest('.bd-step-wrapper')?.querySelector('.bd-step-series-caption');
  const xRightRaw = lastCaption
    ? (lastCaption.getBoundingClientRect().right - dR.left) / scale + SIDE_MARGIN
    : xLastCircle + SIDE_MARGIN;
  const xRight = Math.min(xRightRaw, el.offsetWidth - 4);

  // Left arm: clear past the first caption on row 2.
  const firstCaption = n2.closest('.bd-step-wrapper')?.querySelector('.bd-step-series-caption');
  const xLeftByCaption = firstCaption
    ? (firstCaption.getBoundingClientRect().left - dR.left) / scale - SIDE_MARGIN
    : xFirstCircle - SIDE_MARGIN;
  const xLeft = Math.max(2, Math.min(xFirstCircle - SIDE_MARGIN, xLeftByCaption));

  // S-shape: right C → horizontal bridge at midpoint → left C.
  const yMid  = (y1 + y2) / 2;
  const bendR = (y2 - y1) / 4;

  connPath.value = [
    `M ${xLastCircle} ${y1}`,
    `L ${xRight - bendR} ${y1}`,
    `Q ${xRight} ${y1}  ${xRight} ${y1 + bendR}`,
    `L ${xRight} ${yMid - bendR}`,
    `Q ${xRight} ${yMid}  ${xRight - bendR} ${yMid}`,
    `L ${xLeft + bendR} ${yMid}`,
    `Q ${xLeft} ${yMid}  ${xLeft} ${yMid + bendR}`,
    `L ${xLeft} ${y2 - bendR}`,
    `Q ${xLeft} ${y2}  ${xLeft + bendR} ${y2}`,
    `L ${xFirstCircle} ${y2}`,
  ].join(' ');

  viewBox.value = `0 0 ${el.offsetWidth} ${H}`;
}

onMounted(() => {
  measure();
  ro = new ResizeObserver(measure);
  if (container.value) ro.observe(container.value);
});

onBeforeUnmount(() => ro?.disconnect());
</script>

<template>
  <div ref="container" class="bd-step-series-join" :style="{ gap: rowGap }">
    <StepSeries
      :items="row1"
      stretch
      :variant="variant"
      :line-color="lineColor"
      :fill-color="fillColor"
      :border-color="borderColor"
      :text-color="textColor"
      :node-size="nodeSize"
      :step-gap="stepGap"
      :label-size="labelSize"
      :icon-size="iconSize"
      :stroke-width="strokeWidth"
      :caption-size="captionSize"
      :caption-body-size="captionBodySize"
    />
    <StepSeries
      :items="row2"
      stretch
      :variant="variant"
      :line-color="lineColor"
      :fill-color="fillColor"
      :border-color="borderColor"
      :text-color="textColor"
      :node-size="nodeSize"
      :step-gap="stepGap"
      :label-size="labelSize"
      :icon-size="iconSize"
      :stroke-width="strokeWidth"
      :caption-size="captionSize"
      :caption-body-size="captionBodySize"
    />
    <svg
      v-if="connPath"
      class="bd-step-series-join__connector"
      :viewBox="viewBox"
      aria-hidden="true"
    >
      <path
        :d="connPath"
        fill="none"
        :stroke="lineColor"
        stroke-width="2"
      />
    </svg>
  </div>
</template>

<style scoped>
.bd-step-series-join {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 1.5rem;
}

.bd-step-series-join__connector {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: visible;
}
</style>
