<template>
  <div ref="$branch">
    <AIFlower v-for="type in content" :type :size />
  </div>
</template>

<script setup>
import { rnd } from '@/util/util'
import { onMounted, ref } from 'vue'
import AIFlower from './AIFlower.vue'

const $props = defineProps({
  point: { type: Object },
  size: { type: String, default: '2rem' },
})

const flowers = [
  'tulip',
  'tulip',
  'tulip',
  'rose',
  'rose',
  'dalia',
  'chamomile',
  'chamomile',
]

const content = ref([])
const $branch = ref(document.createElement('div'))

function init() {
  const numFlowers = rnd(1, 3)
  const point = $props.point
  $branch.value.className = `branch f${numFlowers}`
  if (point)
    $branch.value.style.transform = `translate(${point.x}px, calc(${point.y}px - ${$props.size} * 1.75))`
  for (let f = 0; f < numFlowers; f++) {
    const index = Math.floor(Math.random() * flowers.length)
    content.value.push(flowers[index])
  }
}

onMounted(init)
</script>

<style></style>
