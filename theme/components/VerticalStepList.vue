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
    <template v-for="item in normalizedItems" :key="item.key">
      <!--
        Dot cell (column 1). Connector ::after anchored here:
        - top: 50% = dot center (dot is flex-centered in the full row height)
        - height: calc(100% + gap) = row height + gap = exact center-to-center
        Selector :not(:nth-last-child(2)) excludes the last dot cell.
        With alternating dot/label children (dot0 label0 dot1 label1 … dotN labelN),
        the last dot cell is always the second-to-last child.
      -->
      <div
        class="bd-vsl-dot-cell"
        :style="item.accentColor ? { '--bd-vsl-dot-override': item.accentColor } : {}"
      >
        <span class="bd-vsl-dot" aria-hidden="true" />
      </div>
      <div class="bd-vsl-label-cell">
        <span class="bd-vsl-label">{{ item.title }}</span>
        <span v-if="item.body" class="bd-vsl-body">{{ item.body }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
/*
 * Single flat grid: all items share one grid so row heights are
 * determined by the tallest cell in each row (label + body text).
 * The dot cell stretches to that same row height, giving a stable
 * 50% midpoint that equals the dot's visual center.
 */
.bd-vertical-step-list {
  display: grid;
  grid-template-columns: var(--bd-vertical-step-size) max-content;
  row-gap: var(--bd-vertical-step-gap);
  column-gap: var(--bd-vertical-step-label-gap);
  width: max-content;
}

.bd-vsl-dot-cell {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/*
 * Connector geometry — mirrors the StepSeries wrapper::after approach,
 * rotated 90°:
 *   top: 50%                  → starts at dot center (50% of row height)
 *   height: 100% + gap        → row height + gap = exactly center-to-center
 *   z-index: -1               → paints behind the dot's solid fill
 *
 * The next row's dot (solid, later in DOM, same z-index: 1 stacking level)
 * paints over and visually caps the connector endpoint.
 */
.bd-vsl-dot-cell:not(:nth-last-child(2))::after {
  content: "";
  position: absolute;
  left: calc(50% - 1px);
  top: 50%;
  width: 2px;
  height: calc(100% + var(--bd-vertical-step-gap));
  background: var(--bd-vertical-step-line);
  z-index: -1;
}

.bd-vsl-dot {
  display: block;
  width: var(--bd-vertical-step-size);
  height: var(--bd-vertical-step-size);
  border-radius: 999px;
  background: var(--bd-vsl-dot-override, var(--bd-vertical-step-dot));
  flex-shrink: 0;
}

.bd-vsl-label-cell {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bd-vsl-label {
  font-family: var(--bd-font-regular-stack);
  font-size: var(--bd-vertical-step-label-size);
  line-height: 1.12;
  color: var(--bd-vertical-step-text);
}

.bd-vsl-body {
  font-family: var(--bd-font-regular-stack);
  font-size: var(--bd-vertical-step-body-size);
  line-height: 1.2;
  color: rgba(0, 37, 94, 0.72);
}
</style>
