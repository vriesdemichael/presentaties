<script setup>
import { computed, useSlots } from 'vue'
import MerktegelBase from './MerktegelBase.vue'

const slots = useSlots()

const variantTokens = {
  statement: {
    tabWidth: '51.301%',
    tabHeight: '22.816%',
    tabPadding: '0.42rem 1rem 0.12rem 1.05rem',
    bodyPadding: '0.66rem 0.86rem 0.35rem 0.86rem',
    tabFontFamily: 'var(--bd-font-regular-stack)',
    tabFontSize: 'var(--merktegel-statement-eyebrow-size)',
    tabFontWeight: 400,
    bodyFontFamily: 'var(--bd-font-bold-stack)',
    bodyFontSize: 'calc(var(--merktegel-statement-headline-size) * var(--merktegel-statement-headline-scale))',
    bodyFontWeight: 400,
    bodyLineHeight: 'var(--merktegel-statement-headline-line-height)',
    bodyLetterSpacing: 'var(--merktegel-statement-headline-letter-spacing)',
  },
  detail: {
    tabWidth: '50.003%',
    tabHeight: '15.44%',
    tabPadding: '0.7rem 0.8rem 0.08rem 1rem',
    bodyPadding: '1.82rem 0.42rem 0.3rem 1rem',
    tabFontFamily: 'var(--bd-font-bold-stack)',
    tabFontSize: '18pt',
    tabFontWeight: 400,
    bodyFontFamily: 'var(--bd-font-regular-stack)',
    bodyFontSize: '18pt',
    bodyFontWeight: 400,
    bodyLineHeight: '1.2',
    bodyLetterSpacing: '0',
  },
}

const props = defineProps({
  variant: { type: String, default: 'statement' },
  showTab: { type: Boolean, default: true },
  fill: { type: String, default: 'var(--bd-domeinkleur-lichtblauw)' },
  tabFill: { type: String, default: '' },
  textColor: { type: String, default: 'var(--bd-contrastkleur-lintblauw)' },
  tabText: { type: String, default: '' },
  bodyText: { type: String, default: '' },
})

const resolvedVariant = computed(() => variantTokens[props.variant] || variantTokens.statement)
const hasTab = computed(() => Boolean(slots.tab || props.tabText))
const hasBody = computed(() => Boolean(slots.default || props.bodyText))
const showResolvedTab = computed(() => props.showTab && hasTab.value)

const rootStyle = computed(() => ({
  '--merktegel-tab-width': resolvedVariant.value.tabWidth,
  '--merktegel-tab-height': showResolvedTab.value ? resolvedVariant.value.tabHeight : '0%',
  '--merktegel-tab-padding': resolvedVariant.value.tabPadding,
  '--merktegel-body-padding': resolvedVariant.value.bodyPadding,
  '--merktegel-tab-font-family': resolvedVariant.value.tabFontFamily,
  '--merktegel-tab-font-size': resolvedVariant.value.tabFontSize,
  '--merktegel-tab-font-weight': String(resolvedVariant.value.tabFontWeight),
  '--merktegel-body-font-family': resolvedVariant.value.bodyFontFamily,
  '--merktegel-body-font-size': resolvedVariant.value.bodyFontSize,
  '--merktegel-body-font-weight': String(resolvedVariant.value.bodyFontWeight),
  '--merktegel-body-line-height': resolvedVariant.value.bodyLineHeight,
  '--merktegel-body-letter-spacing': resolvedVariant.value.bodyLetterSpacing,
}))
</script>

<template>
  <div class="bd-merktegel-overlay" :style="rootStyle">
    <div v-if="showResolvedTab" class="bd-merktegel-overlay-void" aria-hidden="true" />

    <MerktegelBase
      class="bd-merktegel-overlay-shape"
      :show-tab="showResolvedTab"
      :fill="fill"
      :tab-fill="tabFill || fill"
      :text-color="textColor"
      :tab-width="resolvedVariant.tabWidth"
      :tab-height="resolvedVariant.tabHeight"
    >
      <template v-if="showResolvedTab" #tab>
        <div class="bd-merktegel-overlay-tab">
          <slot name="tab">{{ tabText }}</slot>
        </div>
      </template>

      <div v-if="hasBody" class="bd-merktegel-overlay-body">
        <slot>{{ bodyText }}</slot>
      </div>
    </MerktegelBase>
  </div>
</template>

<style scoped>
.bd-merktegel-overlay {
  --merktegel-statement-eyebrow-size: 20pt;
  --merktegel-statement-headline-size: 36pt;
  --merktegel-statement-headline-scale: 0.84;
  --merktegel-statement-headline-line-height: 0.9;
  --merktegel-statement-headline-letter-spacing: -0.04em;
  position: relative;
  display: grid;
  grid-template-columns: var(--merktegel-tab-width) minmax(0, 1fr);
  grid-template-rows: var(--merktegel-tab-height) minmax(0, 1fr);
  width: 100%;
  height: 100%;
}

.bd-merktegel-overlay-void {
  grid-column: 2;
  grid-row: 1;
}

.bd-merktegel-overlay-shape {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  width: 100%;
  height: 100%;
}

.bd-merktegel-overlay-tab,
.bd-merktegel-overlay-body {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  color: inherit;
  overflow-wrap: anywhere;
}

.bd-merktegel-overlay-tab {
  min-height: 100%;
  padding: var(--merktegel-tab-padding);
  font-family: var(--merktegel-tab-font-family);
  font-size: var(--merktegel-tab-font-size);
  font-weight: var(--merktegel-tab-font-weight);
  line-height: 1;
  text-align: left;
}

.bd-merktegel-overlay-body {
  min-height: 100%;
  padding: var(--merktegel-body-padding);
  font-family: var(--merktegel-body-font-family);
  font-size: var(--merktegel-body-font-size);
  font-weight: var(--merktegel-body-font-weight);
  line-height: var(--merktegel-body-line-height);
  letter-spacing: var(--merktegel-body-letter-spacing);
  text-align: left;
}

.bd-merktegel-overlay-tab :deep(*),
.bd-merktegel-overlay-body :deep(*) {
  margin: 0;
  color: inherit;
  font: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  text-align: inherit;
}

.bd-merktegel-overlay-body :deep(p + p) {
  margin-top: 0.35rem;
}
</style>
