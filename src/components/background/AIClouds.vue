<template>
  <div class="clouds">
    <svg
      style="transform: rotate(0deg); transition: 0.3s"
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
      <path
        style="transform: translate(0, 0px); opacity: 1"
        fill="url(#sw-gradient-0)"
      ></path>
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
  let offset = 0
  for (let i = 0; i < numClouds; i++) {
    const $clone = $cloud.cloneNode(true)
    const $path = $clone.querySelector('path')
    $path.setAttribute('d', cloudStore.getPath())
    $clone.style.top = `${offset}px`
    wrapper.appendChild($clone)
    cloudStore.setAnimation($path)
    offset += rnd(10, 15)
  }
  $cloud.remove()
}

onMounted(init)
</script>

<style>
.clouds {
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;

  svg {
    position: absolute;
  }
}
</style>
