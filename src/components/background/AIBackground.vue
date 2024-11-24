<template>
  <div class="bg-wrapper">
    <!-- <img class="moon" src="../assets/moon.png" alt="moon" /> -->
    <!-- SVG para extras como cometas -->
    <AIStars />
    <div class="moon"></div>
    <AIClouds />
    <AIMountains />
    <AIField />
  </div>
</template>

<script setup>
import AIClouds from './AIClouds.vue'
import AIField from './AIField.vue'
import AIMountains from './AIMountains.vue'
import AIStars from './AIStars.vue'
</script>
