<template>
  <div ref="$flower" class="flower" :class="$props.type">
    <div v-if="$props.type != 'grass'" class="head">
      <span class="leaf"></span>
      <span class="leaf"></span>
      <span class="leaf"></span>
    </div>
    <div class="stem">
      <span class="leaf"></span>
      <span class="leaf"></span>
      <span class="leaf"></span>
    </div>
  </div>
</template>

<script setup>
import { rndItem } from '@/util/util'
import { onMounted, ref } from 'vue'

const $props = defineProps({
  color: { type: String, default: '#3E4FB0' },
  size: { type: String, default: '2rem' },
  type: {
    type: String,
    validator: value =>
      ['tulip', 'rose', 'dalia', 'chamomile', 'grass'].includes(value),
    default: 'tulip',
  },
  point: Object,
})

const types = ['t1', 't2', 't3', 't4', 't5']
const $flower = ref(document.createElement('div'))

function init() {
  const $el = $flower.value
  const type = rndItem(types)

  $el.classList.add(type)
  $el.style.setProperty('--size', $props.size)
  $el.style.setProperty('--flower-color', $props.color)

  if ($props.point) {
    $el.style.setProperty('--x', `${$props.point.x}px`)
    $el.style.setProperty('--y', `${$props.point.y}px`)
  }
}

onMounted(init)
</script>
