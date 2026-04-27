<script setup>
/**
 * InfographicSnakeDemo — boustrophedon (snake) step series demo.
 *
 * Shows an 8-step process across two rows connected by a ∪-shaped SVG connector.
 * Row 1: steps 1–4, tailEnd (horizontal line extends to the right edge).
 * Row 2: steps 5–8, tailStart (horizontal line from the left edge to step 5).
 * The SVG connector is measured on mount so it aligns with the actual connector
 * lines regardless of caption height.
 */

import { ref, onMounted, onBeforeUnmount } from 'vue';

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

const BEND_R = 20; // corner radius in layout px
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

  const r1R = rows[0].getBoundingClientRect();
  const r2R = rows[1].getBoundingClientRect();

  // Scale factor: viewport CSS px → element layout px.
  // getBoundingClientRect is in viewport px; offsetWidth is in layout px.
  // Dividing by scale converts viewport measurements to the SVG coordinate space.
  const scale = dR.width / el.offsetWidth;

  const W  = el.offsetWidth;
  const H  = el.offsetHeight;
  const y1 = ((n1R.top + n1R.bottom) / 2 - dR.top) / scale;
  const y2 = ((n2R.top + n2R.bottom) / 2 - dR.top) / scale;

  // Place the horizontal bridge in the middle of the gap between the two rows
  // (below row 1's captions, above row 2's content), not at the midpoint of
  // the two dot-center y values which would fall inside the caption text.
  const row1Bottom = (r1R.bottom - dR.top) / scale;
  const row2Top    = (r2R.top    - dR.top) / scale;
  const yH = (row1Bottom + row2Top) / 2;

  const r  = BEND_R;
  // Full 4-corner path:
  //  (W-r, y1) ← top-right corner → right vertical → bottom-right corner
  //  → horizontal bridge → bottom-left corner → left vertical
  //  → row2-corner → (r, y2) [overlaps tailStart's first r px, invisible]
  //
  // tailEnd on row 1 provides the horizontal line to (W, y1).
  // tailStart on row 2 provides the horizontal line from (0, y2) rightward.
  // The SVG path overlaps each tail by BEND_R px at the junction (same
  // color + stroke, so the overlap is invisible).
  connPath.value = [
    `M ${W - r} ${y1}`,
    `Q ${W} ${y1} ${W} ${y1 + r}`,
    `L ${W} ${yH - r}`,
    `Q ${W} ${yH} ${W - r} ${yH}`,
    `L ${r} ${yH}`,
    `Q 0 ${yH} 0 ${yH + r}`,
    `L 0 ${y2 - r}`,
    `Q 0 ${y2} ${r} ${y2}`,
  ].join(' ');

  viewBox.value = `0 0 ${W} ${H}`;
}

onMounted(() => {
  measure();
  ro = new ResizeObserver(measure);
  if (demo.value) ro.observe(demo.value);
});

onBeforeUnmount(() => ro?.disconnect());
</script>

<template>
  <div ref="demo" class="snake-demo">
    <StepSeries :items="row1" tail-end step-gap="4.5rem" />
    <StepSeries :items="row2" tail-start step-gap="4.5rem" />
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
  gap: 2rem;
  width: 100%;
  padding: 0.5rem 1.5rem;
}

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

