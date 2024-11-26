<template>
  <div class="moon">
    <span class="buttons">
      <svg
        @click="change(false)"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-320c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241 64 96c0-17.7-14.3-32-32-32S0 78.3 0 96L0 416c0 17.7 14.3 32 32 32s32-14.3 32-32l0-145 11.5 9.6 192 160z"
        />
      </svg>
      <svg
        :class="{ play: !playing, pause: playing }"
        xmlns="http://www.w3.org/2000/svg"
        @click="playing = !playing"
        viewBox="0 0 384 512"
      >
        <path />
      </svg>
      <svg
        @click="change(true)"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416L0 96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241l0-145c0-17.7 14.3-32 32-32s32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-145-11.5 9.6-192 160z"
        />
      </svg>
    </span>
    <div id="player"></div>
  </div>
</template>

<script setup>
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const gs = useGlobalStore()
const { playlist, autoplay } = storeToRefs(gs)
const playing = ref(false)
const player = ref(null)

function onReady() {
  console.log(autoplay.value)
  if (autoplay.value) playing.value = true
}

function change(next) {
  if (next) player.value.nextVideo()
  else player.value.previousVideo()
}

watch(playing, isPlaying => {
  if (isPlaying) player.value.playVideo()
  else player.value.pauseVideo()
})
watch(
  playlist,
  arr => {
    player.value = new YT.Player('player', {
      videoId: arr[0],
      playerVars: {
        playlist: arr.join(),
        autoplay: autoplay.value ? 1 : 0,
        controls: 0,
        loop: 1,
        enablejsapi: 1,
        playsinline: 1,
        origin: window.location.origin,
      },
    })
  },
  { once: true },
)
</script>

<style>
.moon {
  --moon-size: 8rem;
  --crater-color: #e6e6e6;
  --moon-color: #f5f5f5;
  --halo-color: color-mix(in srgb, var(--moon-color), transparent 93%);

  z-index: 1;
  background-color: var(--moon-color);
  height: var(--moon-size);
  width: var(--moon-size);
  border-radius: 50%;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  box-shadow:
    0 0 0 0.4em var(--halo-color),
    0 0 0 0.8em var(--halo-color),
    0 0 0 1.2em var(--halo-color);

  &::before {
    content: '';
    border-radius: 50%;
    position: absolute;
    height: 100%;
    width: 100%;
    box-shadow: 0 0 0 0 var(--halo-color);
    animation: halo 3s ease-in-out infinite alternate-reverse;
  }

  &::after {
    pointer-events: none;
    background-color: var(--crater-color);
    border-radius: 50%;
    position: absolute;
    height: 0.9em;
    width: 0.9em;
    left: 2em;
    top: 5em;
    content: '';
    box-shadow:
      2em 0.8em 0 -0.1em var(--crater-color),
      3.25em -4em 0 -0.1em var(--crater-color),
      0.5em -3.5em 0 -0.1em var(--crater-color);
  }

  .buttons {
    transform: translate(10%, 100%);
    display: flex;
    gap: 1rem;

    svg {
      transform-origin: center center;
      fill: var(--crater-color);
      cursor: pointer;
      width: 1.5rem;
      z-index: 2;

      &:is(.play) {
        path {
          d: path(
            'M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9S58.2 482 73 473L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z'
          );
        }
      }

      &:is(.pause) {
        path {
          d: path(
            'M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z'
          );
        }
      }
    }
  }

  #player {
    display: none;
  }
}
</style>
