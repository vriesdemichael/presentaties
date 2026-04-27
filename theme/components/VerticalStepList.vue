<script setup>
import { computed } from "vue";

const props = defineProps({
  items: { type: Array, default: () => [] },
  dotColor: { type: String, default: "var(--bd-domeinkleur-lichtblauw)" },
  lineColor: { type: String, default: "var(--bd-domeinkleur-lichtblauw)" },
  textColor: { type: String, default: "var(--bd-contrastkleur-lintblauw)" },
  dotSize: { type: String, default: "1.1rem" },
  gap: { type: String, default: "0.78rem" },
  labelSize: { type: String, default: "16pt" },
  labelGap: { type: String, default: "1rem" },
  bodySize: { type: String, default: "0.85em" },
});

const normalizedItems = computed(() =>
  (Array.isArray(props.items) ? props.items : []).map((item, index) => {
    if (typeof item === "object" && item !== null) {
      // title: primary bold text. Falls back to legacy `label` field.
      const title = String(item.title ?? item.label ?? "");
      return {
        key: item.key || `item-${index}`,
        title,
        // body: optional secondary line below the title
        body: item.body ? String(item.body) : "",
        // accentColor: per-item dot colour override (e.g. a signaalkleur)
        accentColor: item.accentColor ? String(item.accentColor) : "",
      };
    }
    return {
      key: `item-${index}`,
      title: String(item ?? ""),
      body: "",
      accentColor: "",
    };
  }),
);
</script>

<template>
  <div
    class="bd-vertical-step-list"
    :style="{
      '--bd-vertical-step-dot': dotColor,
      '--bd-vertical-step-line': lineColor,
      '--bd-vertical-step-text': textColor,
      '--bd-vertical-step-size': dotSize,
      '--bd-vertical-step-gap': gap,
      '--bd-vertical-step-label-size': labelSize,
      '--bd-vertical-step-label-gap': labelGap,
      '--bd-vertical-step-body-size': bodySize,
    }"
  >
    <div
      v-for="item in normalizedItems"
      :key="item.key"
      class="bd-vertical-step-list-item"
    >
      <span
        class="bd-vertical-step-list-dot"
        :style="item.accentColor ? { background: item.accentColor } : {}"
        aria-hidden="true"
      ></span>
      <span class="bd-vertical-step-list-label">{{ item.title }}</span>
      <span v-if="item.body" class="bd-vertical-step-list-body">{{ item.body }}</span>
    </div>
  </div>
</template>

<style scoped>
.bd-vertical-step-list {
  position: relative;
  display: grid;
  gap: var(--bd-vertical-step-gap);
  width: max-content;
  /* Clips the oversized connector pseudo-element below the last item */
  overflow: clip;
}

.bd-vertical-step-list-item {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: var(--bd-vertical-step-size) minmax(0, 1fr);
  align-items: center;
  column-gap: var(--bd-vertical-step-label-gap);
}

.bd-vertical-step-list-dot {
  grid-column: 1;
  grid-row: 1;
  position: relative;
  z-index: 1;
  width: var(--bd-vertical-step-size);
  aspect-ratio: 1;
  border-radius: 999px;
  background: var(--bd-vertical-step-dot);
}

/*
 * Connector: lives on the item (not the dot) so the dot's z-index: 1
 * paints above it without any stacking-context trickery.
 * top: 0 starts at the item top; the sub-pixel gap above the dot
 * (~0.6 DOM px) is invisible. height: 100vh is clipped by the list's
 * overflow: clip. Subsequent items (later in DOM, same z-index: 1)
 * also paint on top of this connector where it extends into their space.
 */
.bd-vertical-step-list-item:not(:last-child)::after {
  content: "";
  position: absolute;
  left: calc(var(--bd-vertical-step-size) / 2 - 1px);
  top: 0;
  width: 2px;
  height: 100vh;
  background: var(--bd-vertical-step-line);
}

/* Label and body are in separate grid rows so the dot only aligns with the label row */
.bd-vertical-step-list-label {
  grid-column: 2;
  grid-row: 1;
  font-family: var(--bd-font-regular-stack);
  font-size: var(--bd-vertical-step-label-size);
  line-height: 1.12;
  color: var(--bd-vertical-step-text);
}

.bd-vertical-step-list-body {
  grid-column: 2;
  grid-row: 2;
  font-family: var(--bd-font-regular-stack);
  font-size: var(--bd-vertical-step-body-size);
  line-height: 1.2;
  color: rgba(0, 37, 94, 0.72);
}
</style>
