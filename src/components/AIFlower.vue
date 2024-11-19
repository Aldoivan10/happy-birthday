<template>
  <div ref="$flower" class="flower" :class="$props.type">
    <div class="head">
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
import { onMounted, ref } from 'vue'

const $props = defineProps({
  color: { type: String, default: '#3E4FB0' },
  size: { type: String, default: '2rem' },
  type: {
    type: String,
    validator: value => ['tulip', 'rose', 'dalia', 'chamomile'].includes(value),
    default: 'tulip',
  },
  tx: { type: Number },
  ty: { type: Number },
})

const types = ['t1', 't2', 't3', 't4', 't5']
const $flower = ref(document.createElement('div'))

function init() {
  const $el = $flower.value
  const type = types[Math.floor(Math.random() * types.length)]
  $el.classList.add(type)
  if ($props.ty) {
    const h = window.innerHeight
    const percent = ($props.ty / h) * 100
    $el.style.top = `calc(${percent}% - ${$props.size} * 1.75)`
  }
  if ($props.tx) {
    const w = window.innerWidth
    const percent = ($props.tx / w) * 100
    $el.style.left = `${percent}%`
  }
  $el.style.setProperty('--flower-color', $props.color)
  $el.style.setProperty('--size', $props.size)
}

onMounted(init)
</script>
