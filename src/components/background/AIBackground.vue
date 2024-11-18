<template>
  <div class="bg-wrapper">
    <!-- <img class="moon" src="../assets/moon.png" alt="moon" /> -->
    <!-- SVG para extras como cometas -->
    <div class="moon"></div>
    <AIClouds />
    <AIStars />
    <AIMountains />
  </div>
</template>

<script setup>
import AIClouds from './AIClouds.vue'
import AIMountains from './AIMountains.vue'
import AIStars from './AIStars.vue'
</script>
