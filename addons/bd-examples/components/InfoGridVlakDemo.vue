<script setup>
const items = [
  {
    label: "Type slide",
    text: "1 groot contentvlak over de hele breedte, binnen de vaste 1X buitenmarge.",
  },
  {
    label: "Gebruik",
    text: "Voor kerncijfers, themas en korte boodschappen. Werk per icoon met 1 hoofdwaarde en 1 korte toelichting.",
  },
  {
    label: "Iconen",
    text: "Gebruik namen als: financien, groep_mensen, gebouw_vws, zakenman, zzp, gebouw, belasting. Volledige lijst via RO Icons catalogus.",
  },
  {
    label: "In Slidev",
    text: "Gebruik onder items: per item iconName, label en sublabel. Voor een eigen pictogram gebruik je icon.",
  },
];
</script>

<template>
  <Vlak fill="var(--bd-domeinkleur-lichtblauw-30)" variant="info-grid" :items="items">
    <template #item="{ item }">
      <strong>{{ item.label }}</strong>
      <span>{{ item.text }}</span>
    </template>
  </Vlak>
</template>
