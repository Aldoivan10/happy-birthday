<template>
  <AIBackground ref="$bg" />
  <AIFirework />
  <AIIntro @load-flowers="$refs.$bg.init()" />
</template>

<script setup>
import AIFirework from '@/components/AIFirework.vue'
import AIIntro from '@/components/AIIntro.vue'
import AIBackground from '@/components/background/AIBackground.vue'
</script>
