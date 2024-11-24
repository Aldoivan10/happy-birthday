<template>
  <div ref="$branch">
    <AIFlower v-for="type in content" :type :size />
  </div>
</template>

<script setup>
import { rnd, rndItem } from '@/util/util'
import { onMounted, ref } from 'vue'
import AIFlower from './AIFlower.vue'

const $props = defineProps({
  point: { type: Object },
  size: { type: String, default: '2rem' },
})

const items = [
  'tulip',
  'tulip',
  'tulip',
  'rose',
  'rose',
  'dalia',
  'chamomile',
  'chamomile',
  'grass',
  'grass',
]

const content = ref([])
const $branch = ref(document.createElement('div'))

async function init() {
  const numFlowers = rnd(1, 3)
  const point = $props.point
  let flowers = []
  if (point) {
    const percentX = Math.floor((point.x / window.innerWidth) * 100)
    const percentY = Math.floor((point.y / window.innerHeight) * 100)

    $branch.value.style.left = `${percentX}%`
    $branch.value.style.top = `calc(${percentY}% - ${$props.size} * var(--multiplier))`
  }
  for (let f = 0; f < numFlowers; f++) {
    const flower = rndItem(items)
    flowers.push(flower)
    if (flower == 'grass') {
      flowers = [flower]
      break
    }
  }
  for (const flower of flowers) content.value.push(flower)
  $branch.value.className = `branch f${flowers.length}`
}

onMounted(init)
</script>

<style></style>
