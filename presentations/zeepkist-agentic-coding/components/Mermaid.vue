<script setup lang="ts">
import SlidevMermaid from '@slidev/client/builtin/Mermaid.vue'

defineProps<{
  codeLz: string
  scale?: number
  theme?: string
}>()
</script>

<template>
  <SlidevMermaid v-bind="{ ...$attrs, ...$props }" />
</template>