<script setup lang="ts">
import { ref, computed } from 'vue'

// Virtual module provided by the ro-icons Vite plugin.
// Names are fetched from the CDN SVG at startup and cached in theme/ro-icons-cache.json.
import names from 'virtual:ro-icons/names'

withDefaults(defineProps<{
  /** Font size of each icon glyph */
  iconSize?: string
}>(), {
  iconSize: '2rem',
})

const filter = ref('')

const filtered = computed<string[]>(() =>
  filter.value
    ? names.filter((n: string) => n.toLowerCase().includes(filter.value.toLowerCase()))
    : names
)
</script>

<script lang="ts">
// Declare the virtual module so TypeScript is happy in the addon context.
declare module 'virtual:ro-icons/names' {
  const names: string[]
  export default names
}
</script>

<template>
  <div class="ro-icon-gallery">
    <div class="ro-icon-gallery-header">
      <input
        v-model="filter"
        class="ro-icon-gallery-filter"
        placeholder="Zoek icoon…"
        type="search"
      />
      <span class="ro-icon-gallery-count">{{ filtered.length }} / {{ names.length }}</span>
    </div>
    <div class="ro-icon-gallery-grid">
      <div
        v-for="name in filtered"
        :key="name"
        class="ro-icon-gallery-item"
        :title="name"
      >
        <span
          class="bd-ro-icon ro-icon-gallery-glyph"
          :style="{ fontSize: iconSize }"
          aria-hidden="true"
        >{{ name }}</span>
        <span class="ro-icon-gallery-label">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ro-icon-gallery {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0.5rem;
}

.ro-icon-gallery-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.ro-icon-gallery-filter {
  flex: 1;
  max-width: 200px;
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
  border: 1px solid var(--bd-grijs-midden, #ccc);
  border-radius: 3px;
  outline: none;
}

.ro-icon-gallery-filter:focus {
  border-color: var(--bd-domeinkleur-lichtblauw, #007bc7);
}

.ro-icon-gallery-count {
  font-size: 0.65rem;
  color: var(--bd-grijs-90, #666);
  white-space: nowrap;
}

.ro-icon-gallery-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  padding: 0.25rem;
  align-content: flex-start;
}

.ro-icon-gallery-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  width: 6rem;
  text-align: center;
  padding: 0.3rem 0.2rem;
  border-radius: 4px;
  cursor: default;
  transition: background 0.15s;
}

.ro-icon-gallery-item:hover {
  background: var(--bd-grijs-licht, #f5f5f5);
}

.ro-icon-gallery-glyph {
  display: block;
  line-height: 1;
  color: var(--bd-domeinkleur-donkerblauw, #154273);
}

.ro-icon-gallery-label {
  font-size: 0.5rem;
  color: var(--bd-grijs-90, #404040);
  word-break: break-word;
  line-height: 1.2;
}
</style>

