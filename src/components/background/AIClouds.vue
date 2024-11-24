<template>
  <div class="clouds">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 500"
      fill-opacity="0.08"
      version="1.1"
    >
      <defs>
        <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
          <stop stop-color="#FFFFFF" offset="0%"></stop>
          <stop stop-color="#333333" offset="75%"></stop>
        </linearGradient>
      </defs>
      <path fill="url(#sw-gradient-0)"></path>
    </svg>
  </div>
</template>

<script setup>
import { useCloudStore } from '@/stores/cloud'
import { rnd } from '@/util/util'
import { onMounted } from 'vue'

const cloudStore = useCloudStore()

const init = () => {
  const numClouds = rnd(3, 5)
  const wrapper = document.querySelector('.clouds')
  const $cloud = wrapper.querySelector('svg')
  for (let i = 0; i < numClouds; i++) {
    const $clone = $cloud.cloneNode(true)
    const $path = $clone.querySelector('path')
    $path.setAttribute('d', cloudStore.getPath())
    wrapper.appendChild($clone)
    cloudStore.setAnimation($path)
  }
  $cloud.remove()
}

onMounted(init)
</script>

<style>
.clouds {
  position: relative;
  width: 100%;
  height: 0%;

  svg {
    position: absolute;
    filter: drop-shadow(0 0 0.8rem white);

    &:nth-child(2) {
      transform: translateY(5%);
    }

    &:nth-child(3) {
      transform: translateY(10%);
    }

    &:nth-child(4) {
      transform: translateY(15%);
    }

    &:nth-child(5) {
      transform: translateY(20%);
    }
  }

  @media (width <= 600px) {
    & > svg {
      filter: drop-shadow(0 0 0.15rem white);
      transform: translateY(210%);

      &:nth-child(2) {
        transform: translateY(230%);
      }

      &:nth-child(3) {
        transform: translateY(250%);
      }

      &:nth-child(4) {
        transform: translateY(270%);
      }

      &:nth-child(5) {
        transform: translateY(290%);
      }
    }
  }
}
</style>
