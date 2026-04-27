<script setup>
import { computed } from "vue";

const props = defineProps({
  items: { type: Array, default: () => [] },
  variant: { type: String, default: "filled" },
  lineColor: { type: String, default: "var(--bd-domeinkleur-lichtblauw)" },
  fillColor: { type: String, default: "var(--bd-domeinkleur-lichtblauw)" },
  borderColor: { type: String, default: "var(--bd-domeinkleur-lichtblauw)" },
  textColor: { type: String, default: "var(--bd-contrastkleur-lintblauw)" },
  nodeSize: { type: String, default: "2.95rem" },
  stepGap: { type: String, default: "6.2rem" },
  labelSize: { type: String, default: "16pt" },
  iconSize: { type: String, default: "1.15rem" },
  strokeWidth: { type: String, default: "2px" },
  // Caption typography. captionSize controls the bold title below the node;
  // captionBodySize defaults to ~85% of captionSize if omitted.
  captionSize: { type: String, default: "9.2pt" },
  captionBodySize: { type: String, default: "8.15pt" },
});

const normalizedItems = computed(() =>
  (Array.isArray(props.items) ? props.items : []).map((item, index) => {
    if (typeof item === "object" && item !== null) {
      if (import.meta.env.DEV && props.variant === "icon" && !item.icon) {
        console.warn(
          `[StepSeries] item at index ${index} has no icon value. ` +
          `A fallback placeholder will be shown. ` +
          `Provide an RO icon glyph name, e.g. icon: "check".`
        );
      }
      return {
        key: item.key || `${props.variant}-${index}`,
        label: item.label ?? "",
        icon: item.icon ?? "",
        // caption: bold title shown below the node
        // body: lighter sub-label shown below caption
        caption: item.caption ?? "",
        body: item.body ?? "",
      };
    }

    return {
      key: `${props.variant}-${index}`,
      label: String(item ?? ""),
      icon: "",
      caption: "",
      body: "",
    };
  }),
);

const hasCaptions = computed(() =>
  normalizedItems.value.some((item) => item.caption || item.body),
);
</script>

<template>
  <!--
    Single shared grid: columns alternate nodeSize / stepGap (last stepGap unused).
    Nodes → row 1, odd columns (1, 3, 5…)
    Connectors → row 1, even columns (2, 4, 6…)
    Captions → row 2, same odd columns as their node.
    This guarantees node and caption centers are literally in the same column —
    no separate containers to drift out of sync.
  -->
  <div
    class="bd-step-series"
    :class="[`bd-step-series--${variant}`]"
    :style="{
      '--bd-step-line-color': lineColor,
      '--bd-step-fill-color': fillColor,
      '--bd-step-border-color': borderColor,
      '--bd-step-text-color': textColor,
      '--bd-step-count': normalizedItems.length,
      '--bd-step-node-size': nodeSize,
      '--bd-step-gap': stepGap,
      '--bd-step-label-size': labelSize,
      '--bd-step-icon-size': iconSize,
      '--bd-step-stroke-width': strokeWidth,
      '--bd-step-caption-size': captionSize,
      '--bd-step-caption-body-size': captionBodySize,
    }"
  >
    <template v-for="(item, index) in normalizedItems" :key="item.key">
      <!-- Node: row 1, odd column -->
      <div
        class="bd-step-series-node"
        :style="{ gridColumn: index * 2 + 1, gridRow: 1 }"
      >
        <span v-if="variant !== 'icon'" class="bd-step-series-label">{{ item.label }}</span>
        <!--
          icon variant: render the glyph name as an RO icon font span.
          The glyph name is the descriptive part after the four-digit prefix
          in the Rijksoverheid icon font catalogue, e.g.:
            2019_formulier    → icon: "formulier"
            3900_bewerken     → icon: "bewerken"
            1034_tevredenheid → icon: "tevredenheid"

          If item.icon is empty or the glyph is not found in the font,
          the fallback "?" renders in red so the problem is immediately
          visible on the slide (not just in the console).
        -->
        <template v-else>
          <span v-if="item.icon" class="bd-ro-icon bd-step-series-icon">{{ item.icon }}</span>
          <span v-else class="bd-step-series-icon-missing" aria-label="ontbrekend icoon">?</span>
        </template>
      </div>

      <!-- Connector: row 1, even column between this node and the next -->
      <div
        v-if="index < normalizedItems.length - 1"
        :key="`${item.key}-connector`"
        class="bd-step-series-connector"
        :style="{ gridColumn: index * 2 + 2, gridRow: 1 }"
        aria-hidden="true"
      ></div>

      <!-- Caption: row 2, same odd column as its node -->
      <div
        v-if="hasCaptions"
        :key="`${item.key}-caption`"
        class="bd-step-series-caption-slot"
        :style="{ gridColumn: index * 2 + 1, gridRow: 2 }"
      >
        <div v-if="item.caption || item.body" class="bd-step-series-caption">
          <span v-if="item.caption" class="bd-step-series-caption-title">{{ item.caption }}</span>
          <span v-if="item.body" class="bd-step-series-caption-body">{{ item.body }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
/*
 * Single shared grid. Columns alternate: nodeSize / stepGap / nodeSize / stepGap …
 * The last stepGap column is always empty; it is harmless and avoids a
 * calc(2N-1) expression that CSS cannot derive from a single count variable.
 *
 * repeat() with an integer custom property is well-supported in all Chromium,
 * Firefox, and Safari versions that can run Slidev.
 */
.bd-step-series {
  display: grid;
  grid-template-columns: repeat(var(--bd-step-count), var(--bd-step-node-size) var(--bd-step-gap));
  align-items: start;
  row-gap: 0.45rem;
  width: max-content;
  min-width: 0;
}

/* Node sits in its grid cell; grid column width = nodeSize so it fills exactly. */
.bd-step-series-node {
  position: relative;
  z-index: 1;
  width: var(--bd-step-node-size);
  aspect-ratio: 1;
  border-radius: 999px;
  display: grid;
  place-items: center;
  box-sizing: border-box;
}

.bd-step-series--filled .bd-step-series-node {
  background: var(--bd-step-fill-color);
  color: var(--bd-step-text-color);
}

.bd-step-series--outline .bd-step-series-node,
.bd-step-series--icon .bd-step-series-node {
  background: #ffffff;
  border: var(--bd-step-stroke-width) solid var(--bd-step-border-color);
  color: var(--bd-step-text-color);
}

/*
 * Connector occupies the gap column between two nodes.
 * height = nodeSize so ::before top-percentage lands on the horizontal midline.
 * ::before extends left/right by strokeWidth to touch the adjacent circle edges.
 */
.bd-step-series-connector {
  position: relative;
  width: 100%;
  height: var(--bd-step-node-size);
}

.bd-step-series-connector::before {
  content: "";
  position: absolute;
  left: calc(var(--bd-step-stroke-width) * -1);
  right: calc(var(--bd-step-stroke-width) * -1);
  top: calc((var(--bd-step-node-size) / 2) - (var(--bd-step-stroke-width) / 2));
  height: var(--bd-step-stroke-width);
  background: var(--bd-step-line-color);
}

.bd-step-series-label {
  font-family: var(--bd-font-bold-stack);
  font-size: var(--bd-step-label-size);
  line-height: 1;
}

.bd-step-series-icon {
  font-size: var(--bd-step-icon-size);
  line-height: 1;
  color: var(--bd-contrastkleur-lintblauw);
}

/* Visual fallback: shown when item.icon is missing.
   The red "?" is immediately visible on the slide. */
.bd-step-series-icon-missing {
  font-size: var(--bd-step-icon-size);
  line-height: 1;
  font-weight: bold;
  color: var(--bd-signaalkleur-rood);
}

/*
 * Caption slot: same column as its node (set via inline gridColumn).
 * display: flex + justify-content: center lets wide caption text overflow
 * symmetrically to both sides of the node column.
 */
.bd-step-series-caption-slot {
  display: flex;
  justify-content: center;
  overflow: visible;
}

.bd-step-series-caption {
  min-width: var(--bd-step-node-size);
  width: max-content;
  display: grid;
  gap: 0.12rem;
  justify-items: center;
  text-align: center;
}

.bd-step-series-caption-title {
  font-family: var(--bd-font-bold-stack);
  font-size: var(--bd-step-caption-size);
  line-height: 1.06;
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-step-series-caption-body {
  font-size: var(--bd-step-caption-body-size);
  line-height: 1.16;
  color: rgba(0, 37, 94, 0.84);
}
</style>
