<script setup>
/**
 * InfographicSnakeDemo — boustrophedon (snake) step series demo.
 *
 * Shows an 8-step process across two rows connected by an S-shaped SVG connector.
 * The bridge runs from the right side of row 1 across the gap to the left side of row 2.
 * The SVG connector is measured on mount so it aligns with the actual connector
 * lines regardless of caption height.
 */

import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  rowGap: { type: String, default: '4rem' },
});

const row1 = [
  { label: "1", caption: "Aangifte",    body: "Belastingplichtige doet aangifte online" },
  { label: "2", caption: "Ontvangst",   body: "Belastingdienst ontvangt het verzoek" },
  { label: "3", caption: "Controle",    body: "Gegevens worden gevalideerd" },
  { label: "4", caption: "Beoordeling", body: "Inhoudelijke toetsing door de inspecteur" },
];

const row2 = [
  { label: "5", caption: "Uitspraak",   body: "Bezwaar afgehandeld" },
  { label: "6", caption: "Beschikking", body: "Definitieve aanslag vastgesteld" },
  { label: "7", caption: "Uitbetaling", body: "Teruggaaf overgemaakt" },
  { label: "8", caption: "Archief",     body: "Dossier afgesloten en opgeslagen" },
];

const demo = ref(null);
const connPath = ref('');
const viewBox = ref('0 0 100 100');

const SIDE_MARGIN = 48; // horizontal arm length past the circle/caption edge (layout px)
let ro = null;

function measure() {
  const el = demo.value;
  if (!el) return;

  const rows = el.querySelectorAll(':scope > .bd-step-series');
  if (rows.length < 2) return;

  // First node in each row determines the connector-line center Y.
  const n1 = rows[0].querySelector('.bd-step-series-node');
  const n2 = rows[1].querySelector('.bd-step-series-node');
  if (!n1 || !n2) return;

  const dR  = el.getBoundingClientRect();
  const n1R = n1.getBoundingClientRect();
  const n2R = n2.getBoundingClientRect();

  // Scale factor: viewport CSS px → element layout px.
  const scale = dR.width / el.offsetWidth;
  if (!scale) return; // not yet laid out

  const H  = el.offsetHeight;
  const y1 = ((n1R.top + n1R.bottom) / 2 - dR.top) / scale;
  const y2 = ((n2R.top + n2R.bottom) / 2 - dR.top) / scale;

  // Right arm: clear the caption text of the last step on row 1.
  const lastNodes = rows[0].querySelectorAll('.bd-step-series-node');
  const lastNode  = lastNodes[lastNodes.length - 1];
  const xLastCircle  = ((lastNode.getBoundingClientRect().left + lastNode.getBoundingClientRect().right) / 2 - dR.left) / scale;
  const xFirstCircle = ((n2R.left + n2R.right) / 2 - dR.left) / scale;

  const lastWrapper = lastNode.closest('.bd-step-wrapper');
  const lastCaption = lastWrapper?.querySelector('.bd-step-series-caption');
  const xRight = lastCaption
    ? (lastCaption.getBoundingClientRect().right - dR.left) / scale + SIDE_MARGIN
    : xLastCircle + SIDE_MARGIN;

  // Left arm: keep the return C clear of the first step/caption on row 2.
  const firstWrapper = n2.closest('.bd-step-wrapper');
  const firstCaption = firstWrapper?.querySelector('.bd-step-series-caption');
  const xLeftByCaption = firstCaption
    ? (firstCaption.getBoundingClientRect().left - dR.left) / scale - SIDE_MARGIN
    : xFirstCircle - SIDE_MARGIN;
  const xLeft = Math.max(2, Math.min(xFirstCircle - SIDE_MARGIN, xLeftByCaption));

  // Proper snake: right C → bridge line → left C.
  const yMid = (y1 + y2) / 2;
  const bendR = (y2 - y1) / 4;

  connPath.value = [
    `M ${xLastCircle} ${y1}`,
    `L ${xRight - bendR} ${y1}`,
    `Q ${xRight} ${y1} ${xRight} ${y1 + bendR}`,
    `L ${xRight} ${yMid - bendR}`,
    `Q ${xRight} ${yMid} ${xRight - bendR} ${yMid}`,
    `L ${xLeft + bendR} ${yMid}`,
    `Q ${xLeft} ${yMid} ${xLeft} ${yMid + bendR}`,
    `L ${xLeft} ${y2 - bendR}`,
    `Q ${xLeft} ${y2} ${xLeft + bendR} ${y2}`,
    `L ${xFirstCircle} ${y2}`,
  ].join(' ');

  viewBox.value = `0 0 ${el.offsetWidth} ${H}`;
}

onMounted(() => {
  measure();
  ro = new ResizeObserver(measure);
  if (demo.value) ro.observe(demo.value);
});

onBeforeUnmount(() => ro?.disconnect());
</script>

<template>
  <div ref="demo" class="snake-demo" :style="{ gap: props.rowGap }">
    <StepSeries :items="row1" stretch />
    <StepSeries :items="row2" stretch />
    <!-- SVG connector: drawn after mount so it aligns with measured node centers -->
    <svg
      v-if="connPath"
      class="snake-connector"
      :viewBox="viewBox"
      aria-hidden="true"
    >
      <path
        :d="connPath"
        fill="none"
        stroke="var(--bd-domeinkleur-lichtblauw)"
        stroke-width="2"
      />
    </svg>
  </div>
</template>

<style scoped>
.snake-demo {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 1.5rem;
}

/* No CSS tail suppressors needed — neither row uses tail-end or tail-start,
   so there are no ::after lines to conflict with the SVG connector. */

.snake-connector {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  /* overflow visible so the path can extend to edges even if the SVG clip is tight */
  overflow: visible;
}
</style>

