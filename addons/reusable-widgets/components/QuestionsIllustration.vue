<script setup>
import Vlak from '../../../theme/components/Vlak.vue'

defineProps({
  icon: { type: String, default: 'groep_mensen_torso' },
  symbol: { type: String, default: '?' },
  bubbleFill: { type: String, default: '#dcecf6' },
  bubbleTextColor: { type: String, default: '#75bbdf' },
  bubbleTipSize: { type: String, default: '2.4cqw' },
})
</script>

<template>
  <div class="bd-questions-illustration">
    <Vlak
      class="bd-questions-illustration-bubble"
      shape="speech-bottom-right"
      :fill="bubbleFill"
      :text-color="bubbleTextColor"
      padding="0"
      :tip-size="bubbleTipSize"
    >
      <div class="bd-questions-illustration-symbol">{{ symbol }}</div>
    </Vlak>

    <div class="bd-ro-icon bd-questions-illustration-icon bd-questions-illustration-icon--back" aria-hidden="true">
      {{ icon }}
    </div>
    <div class="bd-ro-icon bd-questions-illustration-icon bd-questions-illustration-icon--front" aria-hidden="true">
      {{ icon }}
    </div>
  </div>
</template>

<style scoped>
.bd-questions-illustration {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: var(--bd-questions-illustration-overflow, hidden);
}

.bd-questions-illustration-bubble {
  position: absolute;
  z-index: 3;
  top: var(--bd-questions-illustration-bubble-top, 18%);
  left: var(--bd-questions-illustration-bubble-left, 30%);
  width: var(--bd-questions-illustration-bubble-width, 29.6%);
  aspect-ratio: var(--bd-questions-illustration-bubble-aspect-ratio, 1 / 0.82);
  overflow: visible;
}

.bd-questions-illustration-symbol {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  font-family: var(--bd-font-bold-stack);
  font-size: var(--bd-questions-illustration-symbol-size, 63pt);
  line-height: 1;
}

.bd-questions-illustration-icon {
  position: absolute;
  font-size: var(--bd-questions-illustration-icon-size, 90cqh);
}

.bd-questions-illustration-icon--back {
  z-index: 1;
  left: var(--bd-questions-illustration-back-left, -47%);
  bottom: var(--bd-questions-illustration-back-bottom, -27%);
  color: var(--bd-questions-illustration-back-color, #c0dceb);
  transform: var(--bd-questions-illustration-back-transform, scale(1.10));
  transform-origin: bottom left;
}

.bd-questions-illustration-icon--front {
  z-index: 2;
  left: var(--bd-questions-illustration-front-left, 145%);
  right: var(--bd-questions-illustration-front-right, auto);
  bottom: var(--bd-questions-illustration-front-bottom, -27%);
  color: var(--bd-questions-illustration-front-color, #edf4f8);
  transform: var(--bd-questions-illustration-front-transform, scaleX(-1) scale(1.01));
  transform-origin: var(--bd-questions-illustration-front-origin, bottom left);
}
</style>
