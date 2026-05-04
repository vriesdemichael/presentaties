<script setup lang="ts">
import type { RoIconName } from '../types/ro-icon-names'

withDefaults(defineProps<{
  /** Icon name — matches the RO Icons ligature string (e.g. 'man_vooraanzicht'). */
  name: RoIconName
  /** CSS font-size value, e.g. '2em', '32px'. Defaults to 1em (inherits from parent). */
  size?: string
  /** Accessible label. If omitted the icon is aria-hidden. */
  label?: string
}>(), {
  size: '1em',
})
</script>

<template>
  <span
    class="bd-ro-icon"
    :style="{ fontSize: size }"
    :aria-label="label"
    :aria-hidden="!label ? 'true' : undefined"
    role="img"
  >{{ name }}</span>
</template>
