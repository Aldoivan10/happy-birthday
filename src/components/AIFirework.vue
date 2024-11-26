<template>
  <div class="firework" @click="launch">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 175 500"
      version="1.2"
      height="300"
      width="150"
    >
      <path fill="white" d="m41.2 118.7v257.4h85.9v-257.4z" />
      <path fill="#f7931e" d="m41.2 166.7v79l85.9-34.9v-79z" />
      <path fill="#0071bc" d="m41.2 285.4v79l85.9-34.9v-79z" />
      <path
        fill="#ed1c24"
        d="m32.4 119.3c-4.3 0-6.7-5-4-8.4l51.8-64.5c2-2.6 5.9-2.6 8 0l51.8 64.5c2.7 3.4.3 8.4-4 8.4h-51.8z"
      />
      <path fill="white" d="m60.3 477.9h-7.9v-87h7.9z" />
      <path fill="white" d="m88.2 515.4h-8v-124.5h8z" />
      <path fill="white" d="m116 434.1h-8v-43.2h8z" />
    </svg>
    <div class="shot">
      <span>!Feliz cumpleaños!</span>
    </div>
  </div>
</template>

<script setup>
import sound from '@/assets/firework.mp3'

function launch() {
  const audio = new Audio(sound)
  audio.play()
}
</script>

<style>
.firework {
  cursor: pointer;
  position: relative;
  width: fit-content;
  transform: translateX(45%) rotateZ(-25deg);

  .shot {
    --color: rgb(255, 0, 0);
    --end-x: -120%;
    --end-y: -120%;
    --end-font: 5rem;
    --rot: 45deg;

    font-family: 'Doto';
    user-select: none;
    pointer-events: none;
    filter: drop-shadow(0 0 0.2rem color-mix(in srgb, var(--color), white 25%));
    transform-origin: center center;
    background-color: var(--color);
    color: var(--color);
    border-radius: 50%;
    place-items: center;
    position: absolute;
    font-size: 0rem;
    height: 0.5rem;
    width: 0.5rem;
    display: grid;
    left: 43%;
    top: 5%;

    text-align: center;
    animation: show-firework 2s ease-in forwards;

    & > span {
      position: absolute;
    }
  }

  @media (width <= 600px) {
    transform: translateX(45%) rotateZ(-25deg) scale(0.6);
  }
}

@keyframes show-firework {
  0% {
    transform: rotate(var(--rot));
    left: 45%;
    top: 5%;
  }

  80% {
    background-color: transparent;
    font-size: 0rem;
    top: var(--end-y);
    left: var(--end-x);
  }

  100% {
    transform: rotate(var(--rot));
    background-color: transparent;
    font-size: var(--end-font);
    top: var(--end-y);
    left: var(--end-x);
  }
}
</style>
