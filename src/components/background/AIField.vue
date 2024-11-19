<template>
  <div class="field">
    <svg
      version="1.1"
      class="meadow"
      viewBox="0 0 1440 175"
      xmlns="http://www.w3.org/2000/svg"
    >
      <linearGradient id="meadow-bg-1" x1="0" x2="0" y1="1" y2="0">
        <
        <stop stop-color="#222222" offset="50%"></stop>
        <stop stop-color="#282828" offset="100%"></stop>
      </linearGradient>
      <linearGradient id="meadow-bg-2" x1="0" x2="0" y1="1" y2="0">
        <stop stop-color="#222222" offset="30%"></stop>
        <stop stop-color="#303030" offset="100%"></stop>
      </linearGradient>
      <path
        fill="url(#meadow-bg-1)"
        d="M0,224L120,197.3C240,171,480,117,720,90.7C960,64,1200,64,1320,64L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
      />
      <path
        fill="url(#meadow-bg-2)"
        d="M0,64L120,69.3C240,75,480,85,720,106.7C960,128,1200,160,1320,176L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
      />
      <path
        class="guide-line left"
        attr-level="1"
        stroke="#FFFFFF"
        fill="transparent"
        d="m0 64 120 5.3c120 5.7 360 15.7 600 37.4 240 21.3 480 53.3 600 69.3l120 16"
      />
    </svg>
    <div class="flowers">
      <AIFLower size="10rem" type="chamomile"</AIFLower>
      <AIFLower
        v-for="{ x, y } in leftBorder"
        :tx="x"
        :ty="y"
        type="chamomile"
      />
    </div>
  </div>
</template>

<script setup>
import { useFieldStore } from '@/stores/field';
import { onMounted, ref } from 'vue';
import AIFLower from '../flower/AIFlower.vue';

const flowerStore = useFieldStore()
const leftBorder = ref([])

function init() {
  const $flowers = document.querySelector('.flowers')
  const $svg = document.querySelector('.meadow')
  leftBorder.value = flowerStore.getPoints($svg, '.guide-line', 30, 50)
}

onMounted(init)
</script>

<style>
.field {
  width: 100%;
  height: 100%;
  position: relative;

  .point {
    display: block;
    width: 1rem;
    height: 1rem;
    background-color: red;
    position: absolute;
  }

  .flowers {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .meadow {
    position: absolute;
    width: 100vw;
    bottom: 0%;
  }
}
</style>
