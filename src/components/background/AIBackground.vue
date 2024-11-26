<template>
  <div class="bg-wrapper">
    <AIStars />
    <AIPlayer ref="$player" />
    <AIClouds />
    <AIMountains />
    <AIField ref="$field" />
  </div>
</template>

<script setup>
import AIPlayer from '../AIPlayer.vue'
import AIClouds from './AIClouds.vue'
import AIField from './AIField.vue'
import AIMountains from './AIMountains.vue'
import AIStars from './AIStars.vue'

import { ref } from 'vue'

const $field = ref(null)
const $player = ref(null)

defineExpose({
  init: () => {
    $field.value.init()
    $player.value.play()
  },
})
</script>
