<script setup>
import beeldmerkSvg from './assets/beeldmerk-rijksoverheid.svg?raw'

const beeldmerkUrl = `data:image/svg+xml,${encodeURIComponent(beeldmerkSvg)}`
</script>

<template>
  <div class="rijks-ribbon" aria-hidden="true">
    <img :src="beeldmerkUrl" alt="" />
  </div>
</template>
