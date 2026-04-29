<script setup lang="ts">
import { computed } from 'vue'
import { toLength } from '../lib/media-positioning'

const props = defineProps({
  showTab: { type: Boolean, default: true },
  fill: { type: String, default: 'var(--bd-domeinkleur-lichtblauw)' },
  bodyFill: { type: String, default: '' },
  tabFill: { type: String, default: '' },
  textColor: { type: String, default: 'var(--bd-contrastkleur-lintblauw)' },
  tabAlign: { type: String, default: '' },
  tabSide: { type: String, default: 'left' },
  tabEdge: { type: String, default: 'top' },
  tabWidth: { type: [Number, String], default: '50%' },
  tabHeight: { type: [Number, String], default: '25%' },
  shapeClip: { type: String, default: '' },
})

const tabSideValue = computed(() =>
  props.tabAlign === 'right' ? 'right' : props.tabAlign === 'left' ? 'left' : props.tabSide,
)
const tabEdgeValue = computed(() => (props.tabEdge === 'bottom' ? 'bottom' : 'top'))
const rootClass = computed(() => ({
  'bd-merktegel-base--no-tab': !props.showTab,
  'bd-merktegel-base--right': tabSideValue.value === 'right',
  'bd-merktegel-base--bottom': tabEdgeValue.value === 'bottom',
}))

const rootStyle = computed(() => {
  const tabSide = tabSideValue.value
  const tabEdge = tabEdgeValue.value
  const fill = props.fill || 'var(--bd-domeinkleur-lichtblauw)'
  const normalizedTabWidth = toLength(props.tabWidth)
  const normalizedTabHeight = props.showTab ? toLength(props.tabHeight) : '0%'

  let shapeClip = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
  let tabClip = 'polygon(0 0, 0 0, 0 0, 0 0)'

  if (props.showTab) {
    if (tabEdge === 'top' && tabSide === 'left') {
      shapeClip = `polygon(0 0, ${normalizedTabWidth} 0, ${normalizedTabWidth} ${normalizedTabHeight}, 100% ${normalizedTabHeight}, 100% 100%, 0 100%)`
      tabClip = `polygon(0 0, ${normalizedTabWidth} 0, ${normalizedTabWidth} ${normalizedTabHeight}, 0 ${normalizedTabHeight})`
    } else if (tabEdge === 'top' && tabSide === 'right') {
      shapeClip = `polygon(0 ${normalizedTabHeight}, calc(100% - ${normalizedTabWidth}) ${normalizedTabHeight}, calc(100% - ${normalizedTabWidth}) 0, 100% 0, 100% 100%, 0 100%)`
      tabClip = `polygon(calc(100% - ${normalizedTabWidth}) 0, 100% 0, 100% ${normalizedTabHeight}, calc(100% - ${normalizedTabWidth}) ${normalizedTabHeight})`
    } else if (tabEdge === 'bottom' && tabSide === 'left') {
      shapeClip = `polygon(0 0, 100% 0, 100% calc(100% - ${normalizedTabHeight}), ${normalizedTabWidth} calc(100% - ${normalizedTabHeight}), ${normalizedTabWidth} 100%, 0 100%)`
      tabClip = `polygon(0 calc(100% - ${normalizedTabHeight}), ${normalizedTabWidth} calc(100% - ${normalizedTabHeight}), ${normalizedTabWidth} 100%, 0 100%)`
    } else {
      shapeClip = `polygon(0 0, 100% 0, 100% 100%, calc(100% - ${normalizedTabWidth}) 100%, calc(100% - ${normalizedTabWidth}) calc(100% - ${normalizedTabHeight}), 0 calc(100% - ${normalizedTabHeight}))`
      tabClip = `polygon(calc(100% - ${normalizedTabWidth}) calc(100% - ${normalizedTabHeight}), 100% calc(100% - ${normalizedTabHeight}), 100% 100%, calc(100% - ${normalizedTabWidth}) 100%)`
    }
  }

  return {
    '--bd-merktegel-fill': fill,
    '--bd-merktegel-body-fill': props.bodyFill || fill,
    '--bd-merktegel-tab-fill': props.tabFill || fill,
    '--bd-merktegel-text-color': props.textColor || 'var(--bd-contrastkleur-lintblauw)',
    '--bd-merktegel-tab-width': normalizedTabWidth,
    '--bd-merktegel-tab-height': normalizedTabHeight,
    '--bd-merktegel-shape-clip': props.shapeClip || shapeClip,
    '--bd-merktegel-tab-clip': tabClip,
  }
})
</script>

<template>
  <div class="bd-merktegel-base" :class="rootClass" :style="rootStyle">
    <div class="bd-merktegel-base-shape" aria-hidden="true" />
    <div
      v-if="showTab && tabFill && tabFill !== (bodyFill || fill)"
      class="bd-merktegel-base-tab-fill"
      aria-hidden="true"
    />

    <div v-if="showTab" class="bd-merktegel-base-tab">
      <slot name="tab" />
    </div>

    <div class="bd-merktegel-base-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.bd-merktegel-base {
  position: relative;
  width: 100%;
  height: 100%;
  color: var(--bd-merktegel-text-color);
}

.bd-merktegel-base-shape,
.bd-merktegel-base-tab-fill {
  position: absolute;
  inset: 0;
  clip-path: var(--bd-merktegel-shape-clip);
}

.bd-merktegel-base-shape {
  background: var(--bd-merktegel-body-fill);
}

.bd-merktegel-base-tab-fill {
  background: var(--bd-merktegel-tab-fill);
  clip-path: var(--bd-merktegel-tab-clip);
}

.bd-merktegel-base-tab,
.bd-merktegel-base-body {
  position: absolute;
  box-sizing: border-box;
  min-width: 0;
  color: inherit;
}

.bd-merktegel-base-tab {
  overflow: hidden;
}

.bd-merktegel-base-body {
  overflow: hidden;
}

.bd-merktegel-base .bd-merktegel-base-tab :deep(*),
.bd-merktegel-base .bd-merktegel-base-body :deep(*) {
  color: inherit;
}

.bd-merktegel-base:not(.bd-merktegel-base--no-tab) .bd-merktegel-base-tab {
  width: var(--bd-merktegel-tab-width);
  height: var(--bd-merktegel-tab-height);
}

.bd-merktegel-base:not(.bd-merktegel-base--no-tab) .bd-merktegel-base-body {
  left: 0;
  right: 0;
}

.bd-merktegel-base.bd-merktegel-base--no-tab .bd-merktegel-base-body {
  inset: 0;
}

.bd-merktegel-base:not(.bd-merktegel-base--no-tab) .bd-merktegel-base-tab {
  top: 0;
  left: 0;
}

.bd-merktegel-base:not(.bd-merktegel-base--no-tab) .bd-merktegel-base-body {
  top: var(--bd-merktegel-tab-height);
  bottom: 0;
}

.bd-merktegel-base.bd-merktegel-base--right .bd-merktegel-base-tab {
  left: auto;
  right: 0;
}

.bd-merktegel-base.bd-merktegel-base--bottom .bd-merktegel-base-tab {
  top: auto;
  bottom: 0;
}

.bd-merktegel-base.bd-merktegel-base--bottom .bd-merktegel-base-body {
  top: 0;
  bottom: var(--bd-merktegel-tab-height);
}
</style>
