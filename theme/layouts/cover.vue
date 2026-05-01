<script setup>
import { computed } from 'vue'
import beeldmerkSvg from '../assets/beeldmerk-rijksoverheid.svg?raw'
import woordmerkPng from '../assets/woordmerk-belastingdienst.png'
import MerktegelBase from '../components/internal/MerktegelBase.vue'

const beeldmerkUrl = `data:image/svg+xml,${encodeURIComponent(beeldmerkSvg)}`

const props = defineProps({
  coverBg: { type: String, default: '' },
  coverBgRightHalf: { type: Boolean, default: false },
  coverTitle: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  date: { type: [String, Number], default: '' },
  spreker: { type: String, default: '' },
  meeting: { type: String, default: '' },
  brandText: { type: String, default: 'Belastingdienst' },
})

const subtitleLines = computed(() => (props.subtitle ? props.subtitle.split('\n') : []))
</script>

<template>
  <div class="slidev-layout bd-cover bd-layout-canvas">
    <div
      v-if="$slots.background"
      class="bd-cover-bg-slot"
      :class="{ 'bd-cover-bg-slot--right-half': coverBgRightHalf }"
    >
      <slot name="background" />
    </div>
    <img
      v-else-if="coverBg"
      class="bd-cover-bg"
      :class="{ 'bd-cover-bg--right-half': coverBgRightHalf }"
      :src="coverBg"
      alt=""
    />

    <MerktegelBase
      class="bd-cover-panel"
      fill="var(--bd-domeinkleur-lichtblauw)"
      tab-edge="bottom"
      tab-side="left"
      tab-width="49.72%"
      tab-height="12.16%"
      shape-clip="polygon(0 0, 95.02% 0, 95.02% 30.8%, 100% 30.8%, 100% 87.84%, 49.72% 87.84%, 49.72% 100%, 0 100%)"
      aria-hidden="true"
    />

    <div class="bd-cover-brand">
      <slot name="brand">
        <div class="bd-cover-brand-mark" aria-hidden="true">
          <img :src="beeldmerkUrl" alt="" />
        </div>
        <div v-if="brandText" class="bd-cover-brand-wordmark" aria-hidden="true">
          <img :src="woordmerkPng" alt="" />
        </div>
      </slot>
    </div>

    <div class="bd-cover-content">
      <div class="bd-cover-title" role="heading" aria-level="1">
        <slot name="title">{{ coverTitle }}</slot>
      </div>
      <p v-if="$slots.subtitle || subtitleLines.length" class="bd-cover-subtitle">
        <slot name="subtitle">
          <span v-for="(line, i) in subtitleLines" :key="i">
            {{ line }}<br v-if="i < subtitleLines.length - 1" />
          </span>
        </slot>
      </p>
      <div v-if="$slots.default" class="bd-cover-body">
        <slot />
      </div>
    </div>

    <div v-if="$slots.footer || date || spreker || meeting" class="bd-cover-footer-wrap">
      <div class="bd-cover-footer">
        <slot name="footer">
          <div v-if="date" class="bd-cover-date">{{ date }}</div>
          <div v-if="spreker">{{ spreker }}</div>
          <div v-if="meeting">{{ meeting }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bd-cover {
  background: #edf4f8;
  --cover-title-size: 48pt;
  --cover-title-autofit-scale: 0.705;
  --cover-title-line-height: 1.07;
  --cover-title-box-height: 26.6663%;
  --cover-title-letter-spacing: -0.02em;
  --cover-title-padding-top: 0.25%;
  --cover-title-padding-right: 1.76%;
  --cover-title-padding-bottom: 1.2%;
  --cover-title-padding-left: 1.76%;
  --cover-subtitle-size: 14pt;
  --cover-footer-size: 14pt;
  --cover-date-scale: 0.96;
}

.bd-cover-bg,
.bd-cover-bg-slot {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.bd-cover-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

.bd-cover-bg-slot {
  overflow: hidden;
}

.bd-cover-bg-slot--right-half {
  left: auto;
  right: 0;
  width: 50%;
}

.bd-cover-bg--right-half {
  left: auto;
  right: 0;
  width: 50%;
  object-fit: contain;
  object-position: right bottom;
}

.bd-cover-panel {
  position: absolute;
  inset: 0 auto auto 0;
  width: 49.99%;
  height: 56.92%;
  z-index: 2;
}

.bd-cover-brand {
  position: absolute;
  inset: 0;
  z-index: 5;
}

.bd-cover-brand-mark {
  position: absolute;
  left: 47.5%;
  top: 0;
  width: 4.93%;
  height: 17.53%;
  overflow: hidden;
}

.bd-cover-brand-mark img {
  width: 100%;
  height: auto;
  display: block;
}

.bd-cover-brand-wordmark {
  position: absolute;
  left: 53.74%;
  top: 9.34%;
  width: 9.24%;
  height: 2.66%;
}

.bd-cover-brand-wordmark img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.bd-cover-content {
  position: absolute;
  left: var(--ribbon-side-margin);
  top: 16.46%;
  width: calc(50% - (var(--ribbon-side-margin) * 2));
  height: var(--cover-title-box-height);
  z-index: 4;
}

.bd-cover-title {
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin: 0;
  padding:
    var(--cover-title-padding-top)
    var(--cover-title-padding-right)
    var(--cover-title-padding-bottom)
    var(--cover-title-padding-left);
  box-sizing: border-box;
  font-family: var(--bd-font-bold-stack);
  color: var(--bd-contrastkleur-lintblauw);
  font-size: calc(var(--cover-title-size) * var(--cover-title-autofit-scale));
  font-weight: 400;
  line-height: var(--cover-title-line-height);
  letter-spacing: var(--cover-title-letter-spacing);
  font-synthesis: none;
  font-kerning: normal;
  white-space: normal;
  overflow-wrap: normal;
}

.bd-cover-title :deep(*) {
  margin: 0;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  line-height: inherit;
}

.bd-cover-title :deep(p) {
  margin: 0;
  max-width: 100%;
}

.bd-cover-subtitle {
  margin: 0.95rem 0 0;
  color: var(--bd-contrastkleur-lintblauw);
  font-size: var(--cover-subtitle-size);
  font-weight: 400;
  line-height: 1.3;
  max-width: 22ch;
}

.bd-cover-body {
  margin-top: 1rem;
}

.bd-cover-footer-wrap {
  position: absolute;
  left: var(--ribbon-side-margin);
  top: 51.8382%;
  width: 20.6697%;
  z-index: 4;
}

.bd-cover-footer {
  padding: 0;
  font-family: var(--bd-font-regular-stack);
  color: var(--bd-contrastkleur-lintblauw);
  font-size: var(--cover-footer-size);
  font-weight: 400;
  line-height: 1.08;
}

.bd-cover-footer > :first-child,
.bd-cover-date {
  font-size: calc(var(--cover-footer-size) * var(--cover-date-scale));
}

.bd-cover-date {
  margin-bottom: 0.12rem;
}
</style>
