<template>
  <div ref="$intro" class="intro">
    <button @click="startAnimation" class="outline contrast">Comenzar</button>
    <img :src="gif" alt="intro" />
  </div>
</template>

<script setup>
import butterfly from '@/assets/butterflies_op.gif'
import overlay from '@/assets/overlay.gif'
import { useGlobalStore } from '@/stores/global'
import { onMounted, ref } from 'vue'

const $intro = ref(document.createElement('div'))
const gs = useGlobalStore()
const gif = ref()

const $emit = defineEmits(['loadFlowers', 'startSong'])

function startAnimation(evt) {
  const $btn = evt.target
  $btn.disabled = true
  $emit('loadFlowers')
  $btn
    .animate([{ opacity: 1, opacity: 0 }], { duration: 0.3 * 1000 })
    .finished.then(() => {
      $btn.remove()
    })
  gif.value = butterfly
  setTimeout(() => {
    $emit('startSong')
    $intro.value.style.setProperty('--mask', `url(${overlay})`)
    setTimeout(
      () => $intro.value.style.setProperty('--bg', 'initial'),
      0.2 * 1000,
    )
    setTimeout(() => $intro.value.remove(), 6.8 * 1000)
  }, 6 * 1000)
}

onMounted(async () => await gs.load())
</script>

<style>
.intro {
  --mask: '';
  --bg: black;

  z-index: 2;
  width: 100%;
  height: 100%;
  display: grid;
  position: absolute;
  place-items: center;
  background-color: var(--bg);

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    mask-size: cover;
    mask-position: center;
    mix-blend-mode: darken;
    mask-image: var(--mask);
    background-color: black;
  }

  img {
    z-index: 1;
    width: 100%;
    height: auto;

    &:not([src]) {
      opacity: 0;
    }
  }

  button {
    z-index: 2;
    position: absolute;
  }
}
</style>
