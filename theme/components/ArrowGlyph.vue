<script setup>
import { computed, getCurrentInstance, useSlots } from "vue";

const props = defineProps({
  direction: { type: String, default: "right" },
  weight: { type: String, default: "bold" },
  shape: { type: String, default: "standard" },
  joinLeft: { type: Boolean, default: false },
  joinRight: { type: Boolean, default: false },
  dashed: { type: Boolean, default: false },
  headOnly: { type: Boolean, default: false },
  width: { type: String, default: "4rem" },
  height: { type: String, default: "" },
  color: { type: String, default: "var(--bd-contrastkleur-lintblauw)" },
  contentColor: { type: String, default: "var(--bd-contrastkleur-lintblauw)" },
  contentPadding: { type: String, default: "" },
  joinOverlap: { type: String, default: "var(--ribbon-x-quarter)" },
});

const isBold = computed(() => props.weight === "bold");
const isBlock = computed(() => props.shape === "block");
const instance = getCurrentInstance();
const slots = useSlots();
const markerBaseId = `bd-arrow-${instance?.uid ?? "x"}`;
const hasDefaultSlot = computed(() => Boolean(slots.default));
const baseStyle = computed(() => ({
  "--bd-arrow-content-color": props.contentColor,
}));
const resolvedHeight = computed(() => props.height || "1.5rem");
const svgStyle = computed(() => ({
  ...baseStyle.value,
  width: props.width,
  height: resolvedHeight.value,
  color: props.color,
}));
const blockSvgStyle = computed(() => ({
  color: props.color,
}));
const blockQuarterInset = "var(--ribbon-x-quarter)";
const blockFlatInset = `calc(var(--bd-block-arrow-flat-boundary) + ${blockQuarterInset})`;
const blockChevronInset = `calc(var(--bd-block-arrow-chevron-boundary) + ${blockQuarterInset})`;
const blockLeftContentInset = computed(() => {
  if (props.direction === "left") {
    return blockChevronInset;
  }

  return props.joinLeft ? blockChevronInset : blockFlatInset;
});
const blockRightContentInset = computed(() => {
  if (props.direction === "left") {
    return props.joinRight ? blockChevronInset : blockFlatInset;
  }

  return blockChevronInset;
});
const blockContentPadding = computed(() => {
  if (props.contentPadding) return props.contentPadding;

  return `${blockQuarterInset} ${blockRightContentInset.value} ${blockQuarterInset} ${blockLeftContentInset.value}`;
});
const blockStyle = computed(() => ({
  ...baseStyle.value,
  width: props.width,
  ...(props.height ? { minHeight: props.height } : {}),
  "--bd-block-arrow-width": props.width,
  "--bd-block-arrow-flat-boundary": "calc(var(--bd-block-arrow-width) * 0.0350877193)",
  "--bd-block-arrow-chevron-boundary": "calc(var(--bd-block-arrow-width) * 0.1578947368)",
  "--bd-block-arrow-content-padding": blockContentPadding.value,
  "--bd-block-arrow-join-overlap": props.joinOverlap,
}));
const svgViewBox = computed(() => (isBlock.value ? "0 0 114 48" : "0 0 120 48"));
const svgPreserveAspectRatio = computed(() => (isBlock.value ? "none" : "xMidYMid meet"));

const strokeDasharray = computed(() => (props.dashed ? "8 6" : "none"));
const standardStrokeWidth = computed(() => (isBold.value ? 3 : 2));
const markerPath = "M 5 5 L 19 12 L 5 19 L 10 12 Z";
const markerViewBox = "0 0 24 24";
const markerId = `${markerBaseId}-head`;
const markerRefX = 11;
const markerRefY = 12;
const markerStart = computed(() =>
  props.direction === "left" || props.direction === "both"
    ? `url(#${markerId})`
    : undefined,
);
const markerEnd = computed(() =>
  props.direction === "right" || props.direction === "both"
    ? `url(#${markerId})`
    : undefined,
);
const lineGeometry = computed(() => {
  if (!props.headOnly) return { x1: 12, x2: 108 };

  if (props.direction === "left") return { x1: 24, x2: 38 };
  if (props.direction === "both") return { x1: 48, x2: 72 };
  return { x1: 82, x2: 96 };
});
const lineStyle = computed(() => ({
  strokeWidth: standardStrokeWidth.value,
  strokeOpacity: props.headOnly ? 0 : 1,
}));
</script>

<template>
  <div
    v-if="isBold && isBlock"
    class="bd-arrow-glyph-block"
    :class="{
      'bd-arrow-glyph-block--join-left': joinLeft,
      'bd-arrow-glyph-block--join-right': joinRight,
      'bd-arrow-glyph-block--has-content': hasDefaultSlot,
    }"
    :style="blockStyle"
  >
    <svg
      class="bd-arrow-glyph bd-arrow-glyph--block bd-arrow-glyph--bold"
      :style="blockSvgStyle"
      :viewBox="svgViewBox"
      :preserveAspectRatio="svgPreserveAspectRatio"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path
        v-if="direction === 'right'"
        class="bd-arrow-glyph-fill"
        :d="
          joinLeft
            ? 'M4 6H96L110 24L96 42H4L18 24Z'
            : 'M4 6H96L110 24L96 42H4Z'
        "
      ></path>
      <path
        v-else-if="direction === 'left'"
        class="bd-arrow-glyph-fill"
        :d="
          joinRight
            ? 'M116 6H24L10 24L24 42H116L102 24Z'
            : 'M116 6H18L4 24L18 42H116Z'
        "
      ></path>
      <path
        v-else
        class="bd-arrow-glyph-fill"
        d="M18 6H96L110 24L96 42H18L4 24Z"
      ></path>
    </svg>
    <div v-if="hasDefaultSlot" class="bd-arrow-glyph-block-content">
      <slot></slot>
    </div>
  </div>
  <svg
    v-else
    class="bd-arrow-glyph"
    :class="{ 'bd-arrow-glyph--bold': isBold }"
    :style="svgStyle"
    :viewBox="svgViewBox"
    :preserveAspectRatio="svgPreserveAspectRatio"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <defs>
      <marker
        :id="markerId"
        :viewBox="markerViewBox"
        markerWidth="24"
        markerHeight="24"
        :refX="markerRefX"
        :refY="markerRefY"
        orient="auto-start-reverse"
        markerUnits="userSpaceOnUse"
      >
        <path
          class="bd-arrow-glyph-head"
          :d="markerPath"
          fill="currentColor"
          stroke="currentColor"
          stroke-linejoin="round"
          :style="{ strokeWidth: standardStrokeWidth }"
        ></path>
      </marker>
    </defs>

    <line
      class="bd-arrow-glyph-standard-line"
      :x1="lineGeometry.x1"
      y1="24"
      :x2="lineGeometry.x2"
      y2="24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-dasharray="strokeDasharray"
      :marker-start="markerStart"
      :marker-end="markerEnd"
      :style="lineStyle"
    ></line>
  </svg>
</template>

<style scoped>
.bd-arrow-glyph {
  display: block;
  overflow: visible;
}

.bd-arrow-glyph--block {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.bd-arrow-glyph-block {
  position: relative;
  display: block;
  overflow: visible;
}

.bd-arrow-glyph-block--join-left {
  margin-left: calc(var(--bd-block-arrow-join-overlap) * -1);
}

.bd-arrow-glyph-block--join-right {
  margin-right: calc(var(--bd-block-arrow-join-overlap) * -1);
}

.bd-arrow-glyph-block-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: var(--bd-block-arrow-content-padding);
  color: var(--bd-arrow-content-color);
  min-width: 0;
  min-height: 100%;
}

.bd-arrow-glyph-fill {
  fill: currentColor;
}

.bd-arrow-glyph-standard-line {
  fill: none;
  stroke: currentColor;
}

.bd-arrow-glyph-head {
  fill: currentColor;
  stroke: currentColor;
  stroke-linejoin: round;
}

.bd-arrow-glyph--bold {
  filter: saturate(0.98);
}
</style>
