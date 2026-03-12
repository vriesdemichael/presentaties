<template>
  <div class="rijks-ribbon" aria-hidden="true">
    <img src="/images/beeldmerk-rijksoverheid.svg" alt="" />
  </div>
</template>

<style>
.rijks-ribbon {
  position: fixed;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  pointer-events: none;
}

.rijks-ribbon img {
  width: 34px;
  height: 85px;
  display: block;
}
</style>
