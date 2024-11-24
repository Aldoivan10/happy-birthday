<template>
  <div class="field">
    <svg
      version="1.1"
      class="meadow"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          x1="249.482"
          y1="362.305"
          x2="249.482"
          y2="500.369"
          id="gradient-0"
          gradientTransform="matrix(0.991529, 0.129886, -0.077117, 0.588703, 40.700955, 173.395855)"
          spreadMethod="pad"
        >
          <stop offset="0" style="stop-color: rgb(64, 64, 64)" />
          <stop offset="1" style="stop-color: rgb(34, 34, 34)" />
        </linearGradient>
      </defs>
      <path
        fill="url(#gradient-0)"
        d="M-1 434s143 4 249 15c210 21 251 34 251 34l.0 18-502-.0-64Z"
      />
      <path
        fill="none"
        class="left-guide"
        d="M-1 434s143 4 249 15c210 21 251 34 251 34"
      />
      <path
        fill="none"
        class="left-guide"
        d="M-1 444s143 4 249 15c210 21 251 34 251 34"
      />
      <path
        fill="none"
        class="left-guide"
        d="M-1 454s143 4 249 15c210 21 251 34 251 34"
      />
      <path
        fill="none"
        class="left-guide"
        d="M-1 464s143 4 249 15c210 21 251 34 251 34"
      />
      <path
        fill="none"
        class="left-guide"
        d="M-1 474s143 4 249 15c210 21 251 34 251 34"
      />
      <path
        fill="none"
        class="left-guide"
        d="M-1 484s143 4 249 15c210 21 251 34 251 34"
      />
      <path
        fill="none"
        class="left-guide"
        d="M-1 494s143 4 249 15c210 21 251 34 251 34"
      />
    </svg>
    <div class="flowers">
      <!-- <AIFlower type="grass" x="50px" y="50px" size="20rem" /> -->
      <AIBranch
        v-for="point in leftBranchs"
        :point
        ref="$lBranches"
        size="clamp(0.5rem, 100dvh, 2rem)"
      />
    </div>
  </div>
</template>

<script setup>
import { useFieldStore } from '@/stores/field'
import { rnd } from '@/util/util'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import AIBranch from '../AIBranch.vue'

const flowerStore = useFieldStore()
const leftBranchs = ref([])

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
  const factor = 7
  const init = grades || -factor
  const end = grades > 0 ? -factor : factor
  const duration = rnd(2, 5)
  $el.style.setProperty('--grades-init', `${init}deg`)
  $el.style.setProperty('--grades-end', `${grades + end}deg`)
  $el.style.animation = `flower-balance ${duration}s infinite ease-in-out alternate-reverse`
}

const observer = new IntersectionObserver(
  entries => {
    for (const entry of entries) {
      const $el = entry.target
      if (entry.isIntersecting) setAnimation($el)
      else $el.remove()
    }
  },
  {
    root: null, // Viewport
    threshold: 0.05, // Parte visible (25% por defecto)
  },
)

async function init() {
  const $svg = document.querySelector('.meadow')
  const leftGuides = Array.from(document.querySelectorAll('.left-guide'))
  const leftMax = Math.min(Math.ceil(window.innerWidth * 0.03), 60)
  for (const i in leftGuides) {
    leftBranchs.value.push(
      ...flowerStore.getPoints(
        $svg,
        leftGuides[i],
        Math.max(leftMax - 6, 4),
        leftMax,
        i,
      ),
    )
  }
  await nextTick()
  const $flowers = document.querySelectorAll('.flower')
  for (const $flower of $flowers) observer.observe($flower)
}

onMounted(init)
onUnmounted(() => observer.disconnect())
</script>

<style>
.field {
  width: 100%;
  height: 100%;
  position: relative;

  .flowers {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .meadow {
    position: absolute;
    width: 100%;
    left: 0%;
    bottom: 0%;
  }
}

@media (width <= 600px) {
  .field > .meadow {
    transform: scaleY(2) translateY(-25%);
  }
}
</style>
