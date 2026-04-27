<script setup>
/**
 * InfographicSnakeDemo — boustrophedon (snake) step series demo.
 *
 * Shows an 8-step process across two rows connected by a U-bend.
 * Row 1: steps 1–4, tailEnd (line extends to right edge).
 * Join: StepSeriesJoin(side="right") curves around the right.
 * Row 2: steps 5–8 in REVERSE (8→5) so they read left-to-right on the page
 *         while narrative flow continues from right-to-left across the row.
 *         tailEnd (line extends to right edge where the join connects).
 */

const row1 = [
  { label: "1", caption: "Aangifte", body: "Belastingplichtige doet aangifte online" },
  { label: "2", caption: "Ontvangst",  body: "Belastingdienst ontvangt het verzoek" },
  { label: "3", caption: "Controle",   body: "Gegevens worden gevalideerd" },
  { label: "4", caption: "Beoordeling", body: "Inhoudelijke toetsing door de inspecteur" },
];

// Row 2 continues in narrative order (5→6→7→8), left to right.
// tailStart adds a lead-in line from the left edge (where the ∪ join arrives).
const row2 = [
  { label: "5", caption: "Uitspraak",   body: "Bezwaar afgehandeld" },
  { label: "6", caption: "Beschikking", body: "Definitieve aanslag vastgesteld" },
  { label: "7", caption: "Uitbetaling", body: "Teruggaaf overgemaakt" },
  { label: "8", caption: "Archief",     body: "Dossier afgesloten en opgeslagen" },
];
</script>

<template>
  <div class="snake-demo">
    <StepSeries
      :items="row1"
      tail-end
      step-gap="4.5rem"
    />
    <StepSeriesJoin
      row-gap="2rem"
      node-size="2.95rem"
      bend-radius="1.4rem"
    />
    <StepSeries
      :items="row2"
      tail-start
      step-gap="4.5rem"
    />
  </div>
</template>

<style scoped>
.snake-demo {
  display: flex;
  flex-direction: column;
  gap: 0; /* StepSeriesJoin provides all vertical spacing */
  width: 100%;
  padding: 0.5rem 1.5rem;
}
</style>
