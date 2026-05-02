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
const useIconify = ref(false)
const copiedName = ref<string | null>(null)

const filtered = computed<string[]>(() =>
  filter.value
    ? names.filter((n: string) => n.toLowerCase().includes(filter.value.toLowerCase()))
    : names
)

/** man_vooraanzicht → RoManVooraanzicht */
function toPascal(name: string): string {
  return 'Ro' + name.split(/[_-]/).map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

function tagFor(name: string): string {
  return useIconify.value
    ? `<${toPascal(name)} />`
    : `<RoIcon name="${name}" />`
}

async function copyTag(name: string) {
  await navigator.clipboard.writeText(tagFor(name))
  copiedName.value = name
  setTimeout(() => { copiedName.value = null }, 1200)
}
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
      <label class="ro-icon-gallery-toggle" title="Selecteer de tag-stijl die wordt gekopieerd bij klikken op een icoon">
        <span :class="{ 'ro-icon-gallery-toggle-active': !useIconify }">RoIcon</span>
        <span class="ro-icon-gallery-toggle-track" @click="useIconify = !useIconify">
          <span class="ro-icon-gallery-toggle-thumb" :class="{ 'is-right': useIconify }" />
        </span>
        <span :class="{ 'ro-icon-gallery-toggle-active': useIconify }">Iconify</span>
        <span class="ro-icon-gallery-toggle-hint">kopieert bij klik</span>
      </label>
      <span class="ro-icon-gallery-count">{{ filtered.length }} / {{ names.length }}</span>
      <a
        class="ro-icon-gallery-docs-link"
        href="https://sli.dev/features/icons"
        target="_blank"
        rel="noopener"
        title="Slidev Icons documentatie"
      >docs ↗</a>
    </div>
    <div class="ro-icon-gallery-grid">
      <div
        v-for="name in filtered"
        :key="name"
        class="ro-icon-gallery-item"
        :class="{ 'is-copied': copiedName === name }"
        :title="tagFor(name)"
        @click="copyTag(name)"
      >
        <span
          class="bd-ro-icon ro-icon-gallery-glyph"
          :style="{ fontSize: iconSize }"
          aria-hidden="true"
        >{{ name }}</span>
        <span class="ro-icon-gallery-label">
          {{ copiedName === name ? '✓ gekopieerd' : name }}
        </span>
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

/* Toggle */
.ro-icon-gallery-toggle {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.6rem;
  color: var(--bd-grijs-90, #666);
  user-select: none;
  cursor: pointer;
}

.ro-icon-gallery-toggle-active {
  color: var(--bd-domeinkleur-donkerblauw, #154273);
  font-weight: 600;
}

.ro-icon-gallery-toggle-track {
  position: relative;
  width: 2rem;
  height: 1rem;
  background: var(--bd-grijs-midden, #ccc);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.ro-icon-gallery-toggle-thumb {
  position: absolute;
  top: 0.1rem;
  left: 0.1rem;
  width: 0.8rem;
  height: 0.8rem;
  background: white;
  border-radius: 50%;
  transition: left 0.2s;
}

.ro-icon-gallery-toggle-thumb.is-right {
  left: calc(100% - 0.9rem);
}

.ro-icon-gallery-toggle-hint {
  font-size: 0.5rem;
  color: var(--bd-grijs-90, #999);
  font-style: italic;
  white-space: nowrap;
}

.ro-icon-gallery-docs-link {
  font-size: 0.6rem;
  color: var(--bd-domeinkleur-lichtblauw, #007bc7);
  text-decoration: none;
  white-space: nowrap;
  opacity: 0.7;
}

.ro-icon-gallery-docs-link:hover {
  opacity: 1;
  text-decoration: underline;
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
  cursor: pointer;
  transition: background 0.15s;
}

.ro-icon-gallery-item:hover {
  background: var(--bd-grijs-licht, #f5f5f5);
}

.ro-icon-gallery-item.is-copied {
  background: var(--bd-status-success-licht, #e8f5e9);
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

.ro-icon-gallery-item.is-copied .ro-icon-gallery-label {
  color: var(--bd-status-success, #2e7d32);
  font-weight: 600;
}
</style>

