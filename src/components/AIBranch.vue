<template>
  <div ref="$branch">
    <AIFlower
      v-for="({ type, color }, i) in flowers"
      :key="i"
      :color
      :type
      :size
    />
  </div>
</template>

<script setup>
import { useGlobalStore } from '@/stores/global'
import { rnd, rndItem } from '@/util/util'
import { onMounted, ref } from 'vue'
import AIFlower from './AIFlower.vue'

const gs = useGlobalStore()
const $props = defineProps({
  point: { type: Object },
  size: { type: String, default: '2rem' },
})

const flowers = ref([])
const $branch = ref(document.createElement('div'))

async function init() {
  const numFlowers = rnd(1, 3)
  const point = $props.point
  let content = []
  if (point) {
    const percentX = Math.floor((point.x / window.innerWidth) * 100)
    const percentY = Math.floor((point.y / window.innerHeight) * 100)

    $branch.value.style.left = `${percentX}%`
    $branch.value.style.top = `calc(${percentY}% - ${$props.size} * var(--multiplier))`
  }
  for (let f = 0; f < numFlowers; f++) {
    const flower = rndItem(gs.flowerFrecuency)
    const color = rndItem(gs.flowersColors)
    content.push({ type: flower, color })
    if (flower == 'grass') {
      content = [{ type: flower, color }]
      break
    }
  }
  for (const flower of content) flowers.value.push(flower)
  $branch.value.className = `branch f${flowers.length}`
}

onMounted(init)
</script>
