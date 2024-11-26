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
      <AIFlower
        v-for="({ point, color, type }, i) in flowers"
        :key="i"
        :point
        :color
        :type
        size="clamp(0.5rem, 5dvh, 2rem)"
      />
      <!-- <AIBranch
        v-for="point in leftBranchs"
        :point
        ref="$lBranches"
        size="clamp(0.5rem, 100dvh, 2rem)"
      /> -->
    </div>
  </div>
</template>

<script setup>
import { useFieldStore } from '@/stores/field'
import { useGlobalStore } from '@/stores/global'
import { rnd, rndItem } from '@/util/util'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import AIFlower from '../AIFlower.vue'

const gs = useGlobalStore()
const flowerStore = useFieldStore()
const flowers = ref([])

function setAnimation($el) {
  const init = rnd(3, 7) * (rnd(0, 1) ? 1 : -1)
  const end = rnd(3, 7) * (init < 0 ? 1 : -1)
  const duration = rnd(2, 5)

  $el.animate(
    [
      {
        transform: `translate(var(--x), calc(var(--y) - var(--h))) rotate(${init}deg)`,
      },
      {
        transform: `translate(var(--x), calc(var(--y) - var(--h))) rotate(${end}deg)`,
      },
    ],
    {
      iterations: Infinity,
      duration: duration * 1000,
      direction: 'alternate-reverse',
    },
  )
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
  await gs.load()

  const $svg = document.querySelector('.meadow')
  const guides = Array.from(document.querySelectorAll('.left-guide'))
  const numPoints = Math.min(Math.ceil(window.innerWidth * 0.035), 100)

  for (const i in guides) {
    const points = flowerStore.getPoints(
      $svg,
      guides[i],
      Math.max(numPoints - 6, 4),
      numPoints,
      i,
    )
    for (const point of points) {
      const color = rndItem(gs.flowersColors)
      const type = rndItem(gs.flowerFrecuency)

      flowers.value.push({ point, color, type })
    }
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
    transform: scaleX(1.2);
    position: absolute;
    width: 100%;
    bottom: 0%;
  }
}

@media (width <= 600px) {
  .field > .meadow {
    transform: scaleY(2) translateY(-25%);
  }
}
</style>
