<template>
  <div class="bg-wrapper">
    <AIStars />
    <AIPlayer />
    <AIClouds />
    <AIMountains />
    <AIField />
  </div>
</template>

<script setup>
import AIPlayer from '../AIPlayer.vue'
import AIClouds from './AIClouds.vue'
import AIField from './AIField.vue'
import AIMountains from './AIMountains.vue'
import AIStars from './AIStars.vue'
</script>
