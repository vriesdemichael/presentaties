<script setup>
import Surface from "../components/Surface.vue";

defineProps({
  background: { type: String, default: "#ffffff" },
});
</script>

<template>
  <Surface class="bd-default-bd" :background="background">
    <div class="bd-default-bd-inner">
      <slot />
    </div>
  </Surface>
</template>

<style scoped>
.bd-default-bd-inner {
  height: 100%;
  box-sizing: border-box;
  padding: 0 var(--ribbon-x-half) var(--ribbon-x-half) 0;
  color: var(--bd-contrastkleur-lintblauw);
  overflow: hidden;
}
</style>
