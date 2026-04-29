<script setup>
defineProps({
  agendaImage: { type: String, default: '' },
  backgroundSize: { type: String, default: 'contain' },
})
</script>

<template>
  <div class="slidev-layout bd-agenda">
    <div class="bd-agenda-content">
      <slot />
    </div>
    <div class="bd-agenda-side">
      <slot name="image">
        <slot name="right">
          <div
            v-if="agendaImage"
            class="bd-agenda-image"
            :style="{
              backgroundImage: `url(${agendaImage})`,
              backgroundSize,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center bottom',
            }"
          />
        </slot>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.bd-agenda {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  height: 100%;
  padding: 0;
}

.bd-agenda-content {
  padding: 2rem 2rem 2rem 3rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bd-agenda-side {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.bd-agenda-image {
  width: 100%;
  height: 100%;
}
</style>
