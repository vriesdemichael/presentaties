<script setup>
import { computed } from 'vue'
import MerktegelBase from './MerktegelBase.vue'
import Ribbon from './Ribbon.vue'

const props = defineProps({
  mirror: { type: Boolean, default: false },
  topBackground: { type: String, default: 'var(--bd-domeinkleur-lichtblauw)' },
  bottomBackground: { type: String, default: 'var(--bd-domeinkleur-lichtblauw-30)' },
  oppositeBackground: { type: String, default: '#ffffff' },
  topWidth: { type: String, default: 'calc(50% + 1px)' },
  topHeight: { type: String, default: 'calc(var(--ribbon-x) * 8.25)' },
  tabWidth: { type: String, default: 'calc(var(--ribbon-x) * 13)' },
  tabHeight: { type: String, default: 'calc(var(--ribbon-x) * 1.75)' },
  topPadding: { type: String, default: '0' },
  bottomPadding: { type: String, default: '0' },
  oppositePadding: { type: String, default: '0' },
})

const rootClass = computed(() => ({
  'bd-split-merktegel-surface--mirrored': props.mirror,
}))

const tabSide = computed(() => (props.mirror ? 'right' : 'left'))
const shapeClip = computed(() =>
  props.mirror
    ? 'polygon(0 0, 100% 0, 100% 100%, 50.28% 100%, 50.28% 87.84%, 0 87.84%)'
    : 'polygon(0 0, 100% 0, 100% 87.84%, 49.72% 87.84%, 49.72% 100%, 0 100%)',
)

const rootStyle = computed(() => ({
  '--bd-split-merktegel-top-width': props.topWidth,
  '--bd-split-merktegel-top-height': props.topHeight,
  '--bd-split-merktegel-top-padding': props.topPadding,
  '--bd-split-merktegel-bottom-padding': props.bottomPadding,
  '--bd-split-merktegel-opposite-padding': props.oppositePadding,
}))
</script>

<template>
  <div class="slidev-layout bd-split-merktegel-surface bd-surface-base" :class="rootClass" :style="rootStyle">
    <div class="bd-split-merktegel-surface-bottom-bg" :style="{ background: bottomBackground }" aria-hidden="true" />
    <div class="bd-split-merktegel-surface-opposite-bg" :style="{ background: oppositeBackground }" aria-hidden="true" />

    <slot name="logo">
      <Ribbon />
    </slot>

    <div class="bd-split-merktegel-surface-opposite">
      <slot name="opposite" />
    </div>

    <MerktegelBase
      class="bd-split-merktegel-surface-top-shape"
      :fill="topBackground"
      tab-edge="bottom"
      :tab-side="tabSide"
      :tab-width="tabWidth"
      :tab-height="tabHeight"
      :shape-clip="shapeClip"
      aria-hidden="true"
    />

    <div class="bd-split-merktegel-surface-top">
      <slot name="top" />
    </div>

    <div class="bd-split-merktegel-surface-bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style scoped>
.bd-split-merktegel-surface {
  /* All base tokens and structural reset live in .bd-surface-base (index.css). */
  /* Override: uses 1X for half-pane inset (SplitSurface uses a calculated value). */
  --ribbon-half-pane-inset: var(--ribbon-x);
}

.bd-split-merktegel-surface-bottom-bg,
.bd-split-merktegel-surface-opposite-bg,
.bd-split-merktegel-surface-opposite,
.bd-split-merktegel-surface-top-shape,
.bd-split-merktegel-surface-top,
.bd-split-merktegel-surface-bottom {
  position: absolute;
}

.bd-split-merktegel-surface-bottom-bg,
.bd-split-merktegel-surface-top-shape,
.bd-split-merktegel-surface-top,
.bd-split-merktegel-surface-bottom {
  left: 0;
  width: calc(50% + 1px);
}

.bd-split-merktegel-surface-bottom-bg {
  top: 0;
  bottom: 0;
  z-index: 1;
}

.bd-split-merktegel-surface-opposite-bg,
.bd-split-merktegel-surface-opposite {
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
}

.bd-split-merktegel-surface-opposite-bg {
  z-index: 1;
}

.bd-split-merktegel-surface-opposite {
  z-index: 2;
  padding: var(--bd-split-merktegel-opposite-padding);
  box-sizing: border-box;
}

.bd-split-merktegel-surface-top-shape {
  top: 0;
  width: var(--bd-split-merktegel-top-width);
  height: var(--bd-split-merktegel-top-height);
  z-index: 2;
}

.bd-split-merktegel-surface-top {
  top: 0;
  height: var(--bd-split-merktegel-top-height);
  z-index: 3;
  padding: var(--bd-split-merktegel-top-padding);
  box-sizing: border-box;
}

.bd-split-merktegel-surface-bottom {
  top: var(--bd-split-merktegel-top-height);
  bottom: 0;
  z-index: 3;
  padding: var(--bd-split-merktegel-bottom-padding);
  box-sizing: border-box;
}

.bd-split-merktegel-surface--mirrored .bd-split-merktegel-surface-bottom-bg,
.bd-split-merktegel-surface--mirrored .bd-split-merktegel-surface-top-shape,
.bd-split-merktegel-surface--mirrored .bd-split-merktegel-surface-top,
.bd-split-merktegel-surface--mirrored .bd-split-merktegel-surface-bottom {
  left: auto;
  right: 0;
}

.bd-split-merktegel-surface--mirrored .bd-split-merktegel-surface-opposite-bg,
.bd-split-merktegel-surface--mirrored .bd-split-merktegel-surface-opposite {
  right: auto;
  left: 0;
}
</style>
