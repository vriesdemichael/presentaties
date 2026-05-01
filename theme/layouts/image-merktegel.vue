<script setup>
import { computed, useSlots } from 'vue'
import Ribbon from '../components/internal/Ribbon.vue'
import MerktegelOverlay from '../components/MerktegelOverlay.vue'
import { resolveObjectPosition, toLength, toScale } from '../lib/media-positioning'

const slots = useSlots()
const contentMidline = 'calc(var(--ribbon-content-top) + ((100% - var(--ribbon-content-top)) / 2))'

const variantFrames = {
  statement: {
    width: 'calc(var(--ribbon-x) * 10.2)',
    height: 'calc(var(--ribbon-x) * 3.5)',
  },
  detail: {
    width: 'calc(var(--ribbon-x) * 13.4453594771)',
    height: 'calc(var(--ribbon-x) * 6.1747058824)',
  },
}

const placementFrames = {
  'bottom-right': {
    width: 'calc(50% - var(--ribbon-x))',
    right: 'var(--ribbon-x)',
    bottom: 'var(--ribbon-x)',
  },
  'bottom-left': {
    width: 'calc(50% - var(--ribbon-x))',
    left: 'var(--ribbon-x)',
    bottom: 'var(--ribbon-x)',
  },
  'middle-right': {
    right: 'var(--ribbon-x)',
    top: contentMidline,
    transform: 'translateY(-50%)',
  },
  'middle-left': {
    left: 'var(--ribbon-x)',
    top: contentMidline,
    transform: 'translateY(-50%)',
  },
}

const props = defineProps({
  backgroundImage: { type: String, default: '' },
  backgroundFit: { type: String, default: 'cover' },
  backgroundPosition: { type: String, default: '' },
  backgroundOffsetX: { type: [Number, String], default: '' },
  backgroundOffsetY: { type: [Number, String], default: '' },
  backgroundScale: { type: [Number, String], default: 1 },
  logoSrc: { type: String, default: '' },
  placement: { type: String, default: 'bottom-right' },
  variant: { type: String, default: 'statement' },
  eyebrow: { type: String, default: '' },
  headline: { type: String, default: '' },
  cardBackground: { type: String, default: 'var(--bd-domeinkleur-lichtblauw)' },
  textColor: { type: String, default: 'var(--bd-contrastkleur-lintblauw)' },
  showTab: { type: Boolean, default: true },
  tabFill: { type: String, default: '' },
})

const resolvedBackgroundImage = computed(() => props.backgroundImage)
const normalizedBackgroundScale = computed(() => toScale(props.backgroundScale))
const normalizedBackgroundOffsetX = computed(() => toLength(props.backgroundOffsetX))
const normalizedBackgroundOffsetY = computed(() => toLength(props.backgroundOffsetY))
const resolvedFrame = computed(() => variantFrames[props.variant] || variantFrames.statement)
const resolvedPlacement = computed(() => placementFrames[props.placement] || placementFrames['bottom-right'])
const overlayStyle = computed(() => ({
  width: toLength(resolvedFrame.value.width),
  height: toLength(resolvedFrame.value.height),
  ...resolvedPlacement.value,
}))

const backgroundStyle = computed(() => {
  if (!resolvedBackgroundImage.value) {
    return {}
  }

  return {
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: props.backgroundFit || 'cover',
    objectPosition: resolveObjectPosition(
      props.backgroundPosition || 'center center',
      normalizedBackgroundOffsetX.value,
      normalizedBackgroundOffsetY.value,
    ),
    transform: `scale(${normalizedBackgroundScale.value})`,
    transformOrigin: 'center center',
  }
})
</script>

<template>
  <div class="slidev-layout bd-image-merktegel bd-layout-canvas">
    <div class="bd-image-merktegel-background">
      <slot name="background">
        <slot name="photo">
          <img v-if="resolvedBackgroundImage" :src="resolvedBackgroundImage" alt="" :style="backgroundStyle" />
        </slot>
      </slot>
    </div>

    <slot name="logo">
      <Ribbon :logo-src="logoSrc" />
    </slot>

    <MerktegelOverlay
      class="bd-image-merktegel-card"
      :variant="variant"
      :fill="cardBackground"
      :tab-fill="tabFill || cardBackground"
      :text-color="textColor"
      :tab-text="eyebrow"
      :body-text="headline"
      :show-tab="showTab"
      :style="overlayStyle"
    >
      <template v-if="slots.tab || slots.eyebrow || slots.label || eyebrow" #tab>
        <slot name="tab">
          <slot name="eyebrow">
            <slot name="label">{{ eyebrow }}</slot>
          </slot>
        </slot>
      </template>

      <slot>
        <slot name="body">
          <slot name="headline">
            <slot name="statement">{{ headline }}</slot>
          </slot>
        </slot>
      </slot>
    </MerktegelOverlay>
  </div>
</template>

<style scoped>
.bd-image-merktegel-background {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.bd-image-merktegel-background img {
  position: absolute;
  max-width: none;
  display: block;
}

.bd-image-merktegel-card {
  position: absolute;
  z-index: 2;
}
</style>
