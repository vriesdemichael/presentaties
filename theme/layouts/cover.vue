<script setup>
defineProps({
  coverBg:    { type: String, default: '' },
  coverBgRightHalf: { type: Boolean, default: false },
  coverTitle: { type: String, default: '' },
  subtitle:   { type: String, default: '' },
  date:      { type: String, default: '' },
  spreker: { type: String, default: '' },
  meeting:   { type: String, default: '' },
})
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
    <div class="bd-cover-left">
      <div class="bd-cover-main">
        <div class="bd-cover-content">
          <h1 class="bd-cover-title">
            <slot name="title">{{ coverTitle }}</slot>
          </h1>
          <p class="bd-cover-sub">
            <slot name="subtitle">
              <span v-for="(line, i) in subtitle.split('\n')" :key="i">
                {{ line }}<br v-if="i < subtitle.split('\n').length - 1" />
              </span>
            </slot>
          </p>
          <div v-if="$slots.default" class="bd-cover-body">
            <slot />
          </div>
        </div>
      </div>
      <div class="bd-cover-bottom">
        <div class="bd-cover-footer">
          <slot name="footer">
            <div v-if="date" class="bd-cover-date">{{ date }}</div>
            <div v-if="spreker">{{ spreker }}</div>
            <div v-if="meeting">{{ meeting }}</div>
          </slot>
        </div>
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
  background: #eef1f4;
  padding: 0 !important;
}

.bd-cover-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: right bottom;
  z-index: 1;
}

.bd-cover-bg-slot {
  position: absolute;
  inset: 0;
  z-index: 1;
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
}

.bd-cover-left {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 50%;
  z-index: 2;
}

.bd-cover-main {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 76%;
  background: rgba(143, 194, 222, 0.9);
  box-sizing: border-box;
}

.bd-cover-bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 68%;
  height: 24%;
  background: rgba(198, 216, 228, 0.9);
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  padding: 0 0 1.8rem 8.8%;
}

.bd-cover-content {
  position: absolute;
  left: 8%;
  top: 8.5%;
  right: 12%;
}

.bd-cover-title {
  font-size: 2.9rem;
  line-height: 1.08;
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--bd-donkerblauw);
  font-weight: 500;
}

.bd-cover-sub {
  font-size: 1.45rem;
  line-height: 1.42;
  margin-bottom: 0;
  color: var(--bd-subtekst);
  max-width: 28ch;
}

.bd-cover-body {
  margin-top: 1.25rem;
}

.bd-cover-footer {
  color: var(--bd-donkerblauw);
  font-weight: 600;
  line-height: 1.2;
  font-size: 0.86rem;
}

.bd-cover-date {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}
</style>
