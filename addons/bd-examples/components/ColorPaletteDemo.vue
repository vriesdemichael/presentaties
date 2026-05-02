<template>
  <div class="color-palette">
    <div class="color-group-label">Contrast &amp; tekst</div>
    <div class="color-row">
      <div v-for="s in contrast" :key="s.color" class="color-swatch">
        <div class="color-swatch-chip" :style="{ background: s.color, border: s.border ? '1px solid #ccc' : 'none' }"></div>
        <span>{{ s.label }}<br><span class="color-hex">{{ s.color }}</span></span>
      </div>
    </div>

    <div class="color-group-label">Lichtblauw tints</div>
    <div class="color-row">
      <div v-for="s in lichtblauw" :key="s.color" class="color-swatch">
        <div class="color-swatch-chip" :style="{ background: s.color, border: s.border ? '1px solid #ccc' : 'none' }"></div>
        <span>{{ s.label }}<br><span class="color-hex">{{ s.color }}</span></span>
      </div>
    </div>

    <div class="color-group-label">Accent &amp; signaal</div>
    <div class="color-row">
      <div v-for="s in accent" :key="s.color" class="color-swatch">
        <div class="color-swatch-chip" :style="{ background: s.color, border: s.border ? '1px solid #ccc' : 'none' }"></div>
        <span>{{ s.label }}<br><span class="color-hex">{{ s.color }}</span></span>
      </div>
    </div>
  </div>
</template>

<script setup>
const contrast = [
  { color: '#154273', label: 'lintblauw' },
  { color: '#1f2f3f', label: 'tekst-primair' },
]
const lichtblauw = [
  { color: '#8fcae7', label: 'lichtblauw', border: true },
  { color: '#cce7f4', label: 'lichtblauw-45', border: true },
  { color: '#ddeff8', label: 'lichtblauw-30', border: true },
  { color: '#eef7fc', label: 'lichtblauw-15', border: true },
]
const accent = [
  { color: '#007bc7', label: 'hemelblauw' },
  { color: '#ffb612', label: 'donkergeel' },
  { color: '#e17000', label: 'oranje' },
  { color: '#a90061', label: 'violet' },
  { color: '#d52b1e', label: 'rood' },
  { color: '#39870c', label: 'groen' },
]
</script>

<style scoped>
.color-palette {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 9pt;
  font-family: monospace;
  align-content: start;
}

.color-group-label {
  font-size: 10pt;
  font-family: sans-serif;
  font-weight: bold;
  color: #154273;
  margin-top: 0.2rem;
}

.color-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
}

.color-swatch {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.color-swatch-chip {
  width: 2.2rem;
  height: 1.1rem;
  border-radius: 2px;
  flex-shrink: 0;
}

.color-hex {
  opacity: 0.6;
}
</style>
