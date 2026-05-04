<script setup>
import { computed } from "vue";
import beeldmerkSvg from "../assets/beeldmerk-rijksoverheid.svg?raw";

const props = defineProps({
  coverBg: { type: String, default: "" },
  coverBgRightHalf: { type: Boolean, default: false },
  coverTitle: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  date: { type: String, default: "" },
  spreker: { type: String, default: "" },
  meeting: { type: String, default: "" },
  brandText: { type: String, default: "Belastingdienst" },
});

const beeldmerkUrl = `data:image/svg+xml,${encodeURIComponent(beeldmerkSvg)}`;
const subtitleLines = computed(() =>
  props.subtitle ? props.subtitle.split("\n") : [],
);
</script>

<template>
  <div class="slidev-layout bd-cover">
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

    <div class="bd-cover-brand">
      <slot name="brand">
        <div class="bd-cover-brand-mark" aria-hidden="true">
          <img :src="beeldmerkUrl" alt="" />
        </div>
        <div v-if="brandText" class="bd-cover-brand-text">{{ brandText }}</div>
      </slot>
    </div>

    <div class="bd-cover-main">
      <div class="bd-cover-content">
        <h1 class="bd-cover-title">
          <slot name="title">{{ coverTitle }}</slot>
        </h1>
        <p v-if="$slots.subtitle || subtitleLines.length" class="bd-cover-sub">
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
    </div>

    <div class="bd-cover-bottom">
      <div
        v-if="$slots.footer || date || spreker || meeting"
        class="bd-cover-footer"
      >
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
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #edf4f8;
  padding: 0 !important;
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

.bd-cover-brand {
  position: absolute;
  left: 47.4%;
  top: 0;
  z-index: 3;
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.bd-cover-brand-mark {
  width: 4.3rem;
  min-width: 4.3rem;
  height: 8.35rem;
  min-height: 8.35rem;
  background: var(--bd-donkerblauw);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem;
  box-sizing: border-box;
}

.bd-cover-brand-mark img {
  width: 100%;
  display: block;
}

.bd-cover-brand-text {
  margin-top: 2.25rem;
  color: #000000;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.56rem;
  line-height: 1.1;
  white-space: nowrap;
}

.bd-cover-main {
  position: absolute;
  left: 0;
  top: 0;
  width: 49.93%;
  height: 56.77%;
  background: rgba(143, 202, 231, 0.95);
  z-index: 2;
}

.bd-cover-bottom {
  position: absolute;
  left: 0;
  top: 56.77%;
  width: 24.82%;
  height: 43.23%;
  background: rgba(219, 231, 241, 0.95);
  z-index: 2;
}

.bd-cover-content {
  position: absolute;
  left: 7.4%;
  top: 30.4%;
  right: 10.6%;
}

.bd-cover-title {
  margin: 0;
  color: var(--bd-donkerblauw);
  font-size: clamp(3.1rem, 4.2vw, 4.7rem);
  font-weight: 500;
  line-height: 1.18;
  letter-spacing: -0.02em;
  max-width: 8.1ch;
}

.bd-cover-sub {
  margin: 1.1rem 0 0;
  color: rgba(21, 66, 115, 0.72);
  font-size: clamp(1.05rem, 1.38vw, 1.38rem);
  line-height: 1.34;
  max-width: 22ch;
}

.bd-cover-body {
  margin-top: 1rem;
}

.bd-cover-footer {
  padding: 34.2% 0 0 14.8%;
  color: var(--bd-donkerblauw);
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.3;
}

.bd-cover-date {
  margin-bottom: 0.25rem;
}
</style>
