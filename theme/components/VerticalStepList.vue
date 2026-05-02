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
  // Dashed overhangs above first / below last dot — indicate continuation
  dashStart: { type: Boolean, default: false },
  dashEnd: { type: Boolean, default: false },
  dashLength: { type: String, default: "1.2rem" },
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
        // highlight: draws a subtle card background across the full row
        highlight: !!item.highlight,
      };
    }
    return {
      key: `item-${index}`,
      title: String(item ?? ""),
      body: "",
      accentColor: "",
      highlight: false,
    };
  }),
);
</script>

<template>
  <div
    class="bd-vertical-step-list"
    :class="{
      'bd-vsl--dash-start': dashStart,
      'bd-vsl--dash-end': dashEnd,
    }"
    :style="{
      '--bd-vertical-step-dot': dotColor,
      '--bd-vertical-step-line': lineColor,
      '--bd-vertical-step-text': textColor,
      '--bd-vertical-step-size': dotSize,
      '--bd-vertical-step-gap': gap,
      '--bd-vertical-step-label-size': labelSize,
      '--bd-vertical-step-label-gap': labelGap,
      '--bd-vertical-step-body-size': bodySize,
      '--bd-vsl-dash-length': dashLength,
    }"
  >
    <template v-for="(item, index) in normalizedItems" :key="item.key">
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
        :data-highlight="item.highlight || undefined"
        :style="item.accentColor ? { '--bd-vsl-dot-override': item.accentColor } : {}"
      >
        <!--
          #dot slot: replace the circle entirely.
          Default: filled circle respecting dotColor / accentColor.
        -->
        <slot name="dot" :item="item" :index="index">
          <span class="bd-vsl-dot" aria-hidden="true" />
        </slot>
      </div>
      <div class="bd-vsl-label-cell" :data-highlight="item.highlight || undefined">
        <!--
          #content slot: replace the label + body area entirely.
          Default: bd-vsl-label (title) + optional bd-vsl-body.
          Use :deep(.bd-vsl-label) / :deep(.bd-vsl-body) to inherit theme styles.
        -->
        <slot name="content" :item="item" :index="index">
          <span class="bd-vsl-label">{{ item.title }}</span>
          <span v-if="item.body" class="bd-vsl-body">{{ item.body }}</span>
        </slot>
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
  grid-template-columns: var(--bd-vertical-step-size) 1fr;
  row-gap: var(--bd-vertical-step-gap);
  column-gap: var(--bd-vertical-step-label-gap);
  width: 100%;
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

/*
 * Dashed overhang above the first dot (dashStart).
 * Indicates the process started before this slide.
 * Uses ::before so it does not conflict with the connector ::after.
 */
.bd-vsl--dash-start .bd-vsl-dot-cell:first-child::before {
  content: "";
  position: absolute;
  left: calc(50% - 1px);
  bottom: 50%;
  width: 2px;
  height: var(--bd-vsl-dash-length);
  background: repeating-linear-gradient(
    to bottom,
    var(--bd-vertical-step-line) 0,
    var(--bd-vertical-step-line) 4px,
    transparent 4px,
    transparent 8px
  );
  z-index: -1;
}

/*
 * Dashed overhang below the last dot (dashEnd).
 * Indicates the process continues beyond this slide.
 * The normal connector rule excludes :nth-last-child(2), so ::after is free here.
 */
.bd-vsl--dash-end .bd-vsl-dot-cell:nth-last-child(2)::after {
  content: "";
  position: absolute;
  left: calc(50% - 1px);
  top: 50%;
  width: 2px;
  height: var(--bd-vsl-dash-length);
  background: repeating-linear-gradient(
    to bottom,
    var(--bd-vertical-step-line) 0,
    var(--bd-vertical-step-line) 4px,
    transparent 4px,
    transparent 8px
  );
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

/*
 * Highlight row: seamless card background across both columns.
 *
 * Instead of styling each cell separately (which creates gap artifacts from
 * the column-gap), we style only the label cell and use a box-shadow with a
 * large negative X-offset to paint the background "backward" over the gap
 * and dot column. The shadow matches the element height (spread: 0), so it
 * covers exactly the same row height as the label cell — which equals the
 * dot cell height because both cells stretch to the same grid row height.
 * The dot (z-index: 1) paints on top of this shadow, so the circle always
 * appears inside the card. No border-radius — matches the square vlak style.
 */
.bd-vsl-label-cell[data-highlight] {
  position: relative;
  background: color-mix(in srgb, var(--bd-accentkleur-hemelblauw) 10%, transparent);
  /*
   * Left: extend background over the gap + dot column + ribbon breathing room.
   */
  box-shadow: calc(-1 * (var(--bd-vertical-step-label-gap) + var(--bd-vertical-step-size) + var(--ribbon-x-quarter))) 0 0 0 color-mix(in srgb, var(--bd-accentkleur-hemelblauw) 10%, transparent);
  padding-inline-end: 0.6rem;
  padding-block: 0.4rem;
}

/*
 * Extend the highlight band to the right.
 *
 * ::after is absolutely positioned starting from the label cell's right edge
 * and extends 9999px rightward. The nearest overflow:hidden ancestor
 * (slidev-layout) clips it at the slide boundary — creating a seamless band
 * that fills to the slide edge regardless of the container's max-width.
 */
.bd-vsl-label-cell[data-highlight]::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 100%;
  width: 9999px;
  background: color-mix(in srgb, var(--bd-accentkleur-hemelblauw) 10%, transparent);
  pointer-events: none;
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
  color: var(--bd-tekst-secundair);
}
</style>
