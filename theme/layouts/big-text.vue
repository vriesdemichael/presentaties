<template>
  <div class="slidev-layout bd-big-text">
    <div class="bd-big-text-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.bd-big-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 3rem 5rem;
  background: var(--bd-lichtblauw);
}

.bd-big-text-content {
  max-width: 56ch;
  text-align: center;
}

.bd-big-text-content :deep(p) {
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--bd-donkerblauw);
  margin: 0;
}

.bd-big-text-content :deep(h1),
.bd-big-text-content :deep(h2) {
  font-size: 2rem;
  line-height: 1.1;
  margin-bottom: 0.75rem;
}
</style>
