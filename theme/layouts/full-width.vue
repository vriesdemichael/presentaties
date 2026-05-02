<script setup>
import Surface from "../components/internal/Surface.vue";
import Ribbon from "../components/internal/Ribbon.vue";

const props = defineProps({
  pageTitle: { type: String, default: "" },
  pageSubtitle: { type: String, default: "" },
  background: { type: String, default: "#ffffff" },
  contentPadding: { type: String, default: "0" },
  showLogo: { type: Boolean, default: true },
  /** Aligns body slot children along the cross-axis (horizontal).
   *  Use 'flex-end' to push a diagram to the right when only the diagram
   *  is in the body slot and the description lives in pageSubtitle. */
  contentAlign: { type: String, default: "flex-start" },
  /** Distributes body slot children along the main-axis (vertical).
   *  Use 'center' to vertically center a single diagram in the body. */
  contentJustify: { type: String, default: "flex-start" },
});
</script>

<template>
  <Surface
    class="bd-full-width-bd"
    :class="{ 'bd-full-width-bd--without-logo': !showLogo }"
    :background="background"
  >
    <template #logo>
      <Ribbon v-if="showLogo" />
    </template>

    <div
      class="bd-full-width-bd-inner"
      :style="contentPadding ? { padding: contentPadding } : undefined"
    >
      <header
        v-if="pageTitle || pageSubtitle || $slots.title || $slots.subtitle"
        class="bd-full-width-bd-header"
      >
        <div
          v-if="pageTitle || $slots.title"
          class="bd-full-width-bd-title"
          role="heading"
          aria-level="1"
        >
          <slot name="title">{{ pageTitle }}</slot>
        </div>
        <div
          v-if="pageSubtitle || $slots.subtitle"
          class="bd-full-width-bd-subtitle"
        >
          <slot name="subtitle">{{ pageSubtitle }}</slot>
        </div>
      </header>

      <div class="bd-full-width-bd-body">
        <slot />
      </div>
    </div>
  </Surface>
</template>

<style scoped>
.bd-full-width-bd {
  /* --ribbon-grid-gap tightens inner padding relative to the global side-margin */
  --ribbon-grid-gap: var(--ribbon-x-half);
  color: var(--bd-contrastkleur-lintblauw);
  position: relative;
}

.bd-full-width-bd-inner {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  height: 100%;
  min-height: 0;
  padding: 0 var(--ribbon-grid-gap) var(--ribbon-grid-gap) var(--ribbon-grid-gap);
  box-sizing: border-box;
}

.bd-full-width-bd--without-logo::before {
  content: "";
  position: absolute;
  left: var(--ribbon-left);
  top: 0;
  width: var(--ribbon-width);
  height: var(--ribbon-height);
  background: #ffffff;
  z-index: 9;
}

.bd-full-width-bd-header {
  display: grid;
  gap: 0.32rem;
  margin-bottom: 0.8rem;
}

.bd-full-width-bd-title {
  font-family: var(--bd-font-bold-stack);
  font-size: var(--bd-text-title);
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: var(--bd-contrastkleur-lintblauw);
  max-width: 42rem;
}

.bd-full-width-bd-subtitle {
  max-width: 52rem;
  font-family: var(--bd-font-regular-stack);
  font-size: var(--bd-h4-size);
  line-height: 1.32;
  color: var(--bd-contrastkleur-lintblauw);
}

.bd-full-width-bd-body {
  display: flex;
  flex-direction: column;
  align-items: v-bind(contentAlign);
  justify-content: v-bind(contentJustify);
  gap: var(--ribbon-x);
  min-height: 0;
  height: 100%;
}
</style>
