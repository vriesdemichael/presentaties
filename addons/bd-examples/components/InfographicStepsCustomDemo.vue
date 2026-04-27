<script setup>
/**
 * InfographicStepsCustomDemo
 *
 * Demonstrates the slot-based and prop-based customisation API of VerticalStepList:
 *
 * - dashStart / dashEnd  → dashed overhangs above first / below last dot,
 *                          signalling that the process continues outside this slide
 * - highlight: true      → per-item card highlight (accent background across full row)
 * - accentColor          → per-item dot colour override (signaalkleur etc.)
 * - #content slot        → custom row layout; here: bold date header + description body
 *
 * The list on the left is the simple plain-text version (InfographicStepsDemo).
 * The list on the right uses all advanced features to show the customisation range.
 */

const timelineItems = [
  {
    title: "Q1 2023",
    body: "Verkenningsfase: interviews met uitvoerende teams.",
    accentColor: "var(--bd-signaalkleur-groen)",
    highlight: false,
  },
  {
    title: "Q2 2023",
    body: "Prototype eerste versie aanmeldportaal.",
    accentColor: "var(--bd-signaalkleur-groen)",
    highlight: false,
  },
  {
    title: "Q3 2023",
    body: "Pilotperiode met selecte groep gebruikers.",
    accentColor: "var(--bd-signaalkleur-geel)",
    highlight: true,
  },
  {
    title: "Q4 2023",
    body: "Evaluatie pilotresultaten, verbeteringen doorgevoerd.",
    accentColor: "var(--bd-signaalkleur-geel)",
    highlight: true,
  },
  {
    title: "Q1 2024",
    body: "Landelijke uitrol naar alle regio's.",
    accentColor: "var(--bd-signaalkleur-groen)",
    highlight: false,
  },
];
</script>

<template>
  <div class="tl-demo">
    <div class="tl-demo__intro">
      <p class="tl-demo__caption">
        De <code>#content</code> slot vervangt het label+body gebied. Gebruik
        <code>dashStart</code>/<code>dashEnd</code> voor verwijzing naar stappen buiten
        dit overzicht. <code>highlight</code> markeert een rij met een lichte achtergrond.
      </p>
    </div>

    <VerticalStepList
      dash-start
      dash-end
      dash-length="1.8rem"
      :items="timelineItems"
      dot-size="0.95rem"
      gap="0.55rem"
      label-gap="1rem"
    >
      <!--
        #content slot — receives { item, index }.
        Here we render the title as a bold date and body as a muted description.
      -->
      <template #content="{ item }">
        <span class="tl-date">{{ item.title }}</span>
        <span class="tl-body">{{ item.body }}</span>
      </template>
    </VerticalStepList>
  </div>
</template>

<style scoped>
.tl-demo {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  padding: 0.2rem 0;
}

.tl-demo__intro {
  max-width: 50ch;
}

.tl-demo__caption {
  font-size: 0.72rem;
  line-height: 1.45;
  color: rgba(0, 37, 94, 0.65);
}

.tl-demo__caption code {
  font-family: "Consolas", monospace;
  background: rgba(0, 118, 182, 0.09);
  border-radius: 3px;
  padding: 0 0.25em;
  font-size: 0.95em;
}

/* Custom row layout inside the #content slot */
.tl-date {
  display: block;
  font-family: var(--bd-font-bold-stack);
  font-weight: 700;
  font-size: 13.5pt;
  line-height: 1.1;
  color: var(--bd-contrastkleur-lintblauw);
}

.tl-body {
  display: block;
  font-family: var(--bd-font-regular-stack);
  font-size: 0.8rem;
  line-height: 1.25;
  color: rgba(0, 37, 94, 0.68);
  max-width: 38ch;
}
</style>
