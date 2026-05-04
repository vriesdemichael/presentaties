<script setup>
import logoTileSvg from '../../assets/beeldmerk-rijksoverheid.svg?raw'

const logoTileUrl = `data:image/svg+xml,${encodeURIComponent(logoTileSvg)}`

defineProps({
  logoSrc: { type: String, default: '' },
  left: { type: String, default: 'var(--ribbon-left)' },
  top: { type: String, default: '0' },
  width: { type: String, default: 'var(--ribbon-width)' },
  height: { type: String, default: 'var(--ribbon-height)' },
})
</script>

<template>
  <div class="bd-ribbon" :style="{ left, top, width, height }" aria-hidden="true">
    <img :src="logoSrc || logoTileUrl" alt="" />
  </div>
</template>

<style scoped>
.bd-ribbon {
  position: absolute;
  z-index: 5;
  overflow: hidden;
}

.bd-ribbon img {
  width: 100%;
  height: auto;
  display: block;
}
</style>
