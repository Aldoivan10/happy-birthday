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
import { rnd } from '@/util/util'
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

function getGrades($el) {
  const computedStyle = window.getComputedStyle($el)
  const transform = computedStyle.transform

  // Si no hay transformación
  if (transform === 'none') return 0

  // Extraer la matriz de transformación
  const matrix = transform.match(/matrix\((.+)\)/)[1].split(', ')
  const a = parseFloat(matrix[0]) // Escala en x
  const b = parseFloat(matrix[1]) // Sesgo en y

  // Calcular el ángulo en radianes y convertir a grados
  const radians = Math.atan2(b, a)
  const degrees = radians * (180 / Math.PI)

  // Asegurarse de que el ángulo esté en el rango [0, 360)
  return degrees < 0 ? degrees + 360 : degrees
}

function setAnimation($el) {
  const grades = getGrades($el)
  const init = grades || -5
  const end = grades > 0 ? -5 : 5
  const duration = rnd(2, 5)
  $el.style.setProperty('--grades-init', `${init}deg`)
  $el.style.setProperty('--grades-end', `${grades + end}deg`)
  $el.style.animation = `flower-balance ${duration}s infinite ease-in-out alternate-reverse`
}

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
  setAnimation($el)
  $el.style.setProperty('--flower-color', $props.color)
  $el.style.setProperty('--size', $props.size)
}

onMounted(init)
</script>
