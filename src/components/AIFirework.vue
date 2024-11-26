<template>
  <div ref="$fwCanvas" class="fw-canvas">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 175 500"
      @click="launch"
      version="1.2"
      height="300"
      width="150"
      ref="$firework"
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
  </div>
</template>

<script setup>
import sound from '@/assets/firework.mp3'
import { useGlobalStore } from '@/stores/global'
import { rnd, rndItem } from '@/util/util'
import { ref } from 'vue'

const gs = useGlobalStore()

const $fwCanvas = ref(document.createElement('div'))
const $firework = ref(document.createElement('div'))

function getInitialPoint(svgElement, point, angleInDegrees) {
  // Obtener el bounding rect del SVG
  const boundingRect = svgElement.getBoundingClientRect()

  // Extraer el viewBox del SVG
  const viewBox = svgElement.viewBox.baseVal
  const scaleX = boundingRect.width / viewBox.width
  const scaleY = boundingRect.height / viewBox.height

  // Coordenadas escaladas del punto (desde el viewBox al tamaño real en la pantalla)
  const scaledX = point.x * scaleX
  const scaledY = point.y * scaleY

  // Centro del SVG en coordenadas absolutas de la pantalla
  const centerX = boundingRect.left + boundingRect.width / 2
  const centerY = boundingRect.top + boundingRect.height / 2

  // Coordenadas originales en el sistema global
  const originalX = boundingRect.left + scaledX
  const originalY = boundingRect.top + scaledY

  // Convertir ángulo a radianes
  const angleInRadians = (angleInDegrees * Math.PI) / 180

  // Aplicar la rotación
  const rotatedX =
    centerX +
    (originalX - centerX) * Math.cos(angleInRadians) -
    (originalY - centerY) * Math.sin(angleInRadians)
  const rotatedY =
    centerY +
    (originalX - centerX) * Math.sin(angleInRadians) +
    (originalY - centerY) * Math.cos(angleInRadians)

  return [rotatedX, rotatedY]
}

function getShot($canvas, $firework) {
  const $shot = document.createElement('span')
  const [x, y] = getInitialPoint($firework, { x: 80, y: 30 }, -30)
  const color = rndItem(gs.fireworksColors)
  const text = rndItem(gs.texts)
  const grades = rnd(-30, 30)

  $shot.classList.add('shot')
  $shot.style.top = `${y}px`
  $shot.style.left = `${x}px`
  $shot.innerHTML = `<span>${text}</span>`
  $shot.style.setProperty('--color', color)
  $shot.style.transform = `rotate(${grades}deg)`

  $canvas.append($shot)
  return $shot
}

function initShot($canvas, $shot) {
  const { width, height } = $canvas.getBoundingClientRect()
  const fontSize = rnd(1, 2)
  const offset = 50
  const time = 1.5

  const targetX = rnd(offset, width - offset)
  const targetY = rnd(offset * 2, height - offset * 2)

  $shot.style.transition = `left ${time}s cubic-bezier(0.25, 0.25, 0.25, 1), top ${time}s cubic-bezier(0.25, 0.25, 0.25, 1), background-color 0.2s linear ${time}s`
  $shot.style.backgroundColor = 'initial'
  $shot.style.left = `${targetX}px`
  $shot.style.top = `${targetY}px`

  $shot
    .animate([{ fontSize: 0 }, { fontSize: `${fontSize}rem` }], {
      duration: 0.4 * 1000,
      easing: 'ease-in',
      fill: 'forwards',
      delay: time * 1000,
    })
    .finished.then(() => {
      $shot
        .animate(
          [
            { opacity: 1, top: `${targetY}px` },
            { opacity: 0, top: `${targetY + 10}px` },
          ],
          {
            duration: 3.5 * 1000,
            easing: 'ease-in',
            fill: 'forwards',
          },
        )
        .finished.then(() => {
          $shot.remove()
        })
    })
}

function launch() {
  const audio = new Audio(sound)
  const $shot = getShot($fwCanvas.value, $firework.value)
  audio.play()
  initShot($fwCanvas.value, $shot)
}
</script>

<style>
.fw-canvas {
  top: 0;
  left: 0;
  width: 100%;
  height: 90%;
  overflow: hidden;
  user-select: none;
  position: absolute;

  .shot {
    --color: rgb(255, 0, 0);

    z-index: 2;
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

    text-align: center;
    animation: show-firework 2s ease-in forwards;

    & > span {
      width: 17rem;
      position: absolute;
    }
  }

  svg {
    right: 0;
    bottom: 0;
    cursor: pointer;
    position: absolute;
    height: clamp(10%, 50dvh, 25%);
    transform: translateX(30%) rotateZ(-30deg);

    @media (width <= 600px) {
      transform: translateX(45%) rotateZ(-30deg);
    }
  }
}
</style>
