<script setup>
import { computed } from 'vue'
import logoTileSvg from '../assets/beeldmerk-rijksoverheid.svg?raw'
import bgPng from '../assets/speaker-layout-background.png'
import { withBase } from '../lib/with-base'

const logoTileUrl = `data:image/svg+xml,${encodeURIComponent(logoTileSvg)}`

const props = defineProps({
  speakerName: { type: String, default: '' },
  speakerRole: { type: String, default: '' },
  speakerTeam: { type: String, default: '' },
  logoSrc: { type: String, default: '' },
})

const resolvedLogoSrc = computed(() => withBase(props.logoSrc) || logoTileUrl)
</script>

<template>
  <div class="slidev-layout bd-speaker bd-layout-canvas">
    <img class="bd-speaker-background" :src="bgPng" alt="" aria-hidden="true" />

    <div class="bd-speaker-logo">
      <slot name="logo">
        <img :src="resolvedLogoSrc" alt="" />
      </slot>
    </div>

    <div class="bd-speaker-content">
      <div class="bd-speaker-title" role="heading" aria-level="1">
        <slot name="title">{{ speakerName }}</slot>
      </div>

      <div v-if="$slots.default || speakerRole || speakerTeam" class="bd-speaker-body">
        <slot>
          <p v-if="speakerRole">{{ speakerRole }}</p>
          <p v-if="speakerTeam" class="bd-speaker-team">{{ speakerTeam }}</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bd-speaker {
  --speaker-title-size: 28pt;
  --speaker-body-size: 20pt;
}

.bd-speaker-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.bd-speaker-logo {
  position: absolute;
  left: var(--ribbon-left);
  top: 0;
  width: var(--ribbon-width);
  height: var(--ribbon-height);
  z-index: 5;
  overflow: hidden;
}

.bd-speaker-logo img {
  width: 100%;
  height: auto;
  display: block;
}

.bd-speaker-content {
  position: absolute;
  left: calc(50% + var(--ribbon-side-margin));
  right: var(--ribbon-side-margin);
  top: var(--ribbon-content-top);
  z-index: 5;
}

.bd-speaker-title {
  margin: 0;
  font-family: var(--bd-font-bold-stack);
  color: var(--bd-contrastkleur-lintblauw);
  font-size: var(--speaker-title-size);
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
}

.bd-speaker-title :deep(*) {
  margin: 0;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  line-height: inherit;
}

.bd-speaker-title :deep(p) {
  margin: 0;
}

.bd-speaker-body {
  margin-top: 2.55rem;
  font-family: var(--bd-font-regular-stack);
  color: var(--bd-contrastkleur-lintblauw);
  font-size: var(--speaker-body-size);
  font-weight: 400;
  line-height: 1;
}

.bd-speaker-body :deep(*) {
  margin: 0;
  color: inherit;
}

.bd-speaker-body :deep(p + p) {
  margin-top: 5pt;
}
</style>
