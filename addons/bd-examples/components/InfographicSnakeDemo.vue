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

// Row 2 items are ordered so step 8 is at the LEFT (where the U-bend arrives)
// and step 5 is at the RIGHT (where a next join would depart, or the tail ends).
const row2 = [
  { label: "8", caption: "Archief",   body: "Dossier afgesloten en opgeslagen" },
  { label: "7", caption: "Uitbetaling", body: "Teruggaaf overgemaakt" },
  { label: "6", caption: "Beschikking", body: "Definitieve aanslag vastgesteld" },
  { label: "5", caption: "Uitspraak",  body: "Bezwaar afgehandeld" },
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
      tail-end
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
