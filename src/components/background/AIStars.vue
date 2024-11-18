<template>
  <div class="stars-wrapper">
    <svg class="extras" width="100%" height="100%" preserveAspectRatio="none">
      <defs>
        <radialGradient id="comet-gradient" cx="0" cy="0.5" r="0.5">
          <stop offset="0%" stop-color="rgba(255,255,255,.8)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <g transform="rotate(-135)">
        <ellipse
          class="comet comet-a"
          fill="url(#comet-gradient)"
          cx="0"
          cy="0"
          rx="150"
          ry="2"
        ></ellipse>
      </g>
      <g transform="rotate(20)">
        <ellipse
          class="comet comet-b"
          fill="url(#comet-gradient)"
          cx="100%"
          cy="0"
          rx="150"
          ry="2"
        ></ellipse>
      </g>
      <g transform="rotate(300)">
        <ellipse
          class="comet comet-c"
          fill="url(#comet-gradient)"
          cx="40%"
          cy="100%"
          rx="150"
          ry="2"
        ></ellipse>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { getSVG, rnd } from '../../util/util.js'

function getStar() {
  const $star = getSVG({ className: 'star', type: 'circle' })
  const cx = `${Math.round(rnd(1, 100))}%`
  const cy = `${Math.round(rnd(1, 100))}%`
  const r = rnd(0.5, 1.5)
  $star.setAttribute('cx', cx)
  $star.setAttribute('cy', cy)
  $star.setAttribute('r', r)
  return $star
}

function getComet(className) {
  const $g = getSVG({
    type: 'g',
    transform: `rotate(${Math.round(rnd(250, 350))})`,
  })
  const $comet = getSVG({
    type: 'ellipse',
    fill: 'url(#comet-gradient)',
    className: `comet ${className}`,
  })
  const cx = `${Math.round(rnd(40, 60))}%`
  const cy = `${Math.round(rnd(0, 25))}%`
  $comet.setAttribute('cx', cx)
  $comet.setAttribute('cy', cy)
  $comet.setAttribute('rx', 150)
  $comet.setAttribute('ry', 2)
  $g.appendChild($comet)
  return $g
}

function buildStars(container) {
  const max = Math.max(Math.round(window.innerWidth * 0.125), 55)
  const numStars = Math.round(rnd(max - 50, max))
  for (let i = 0; i < numStars; ++i) {
    const $star = getStar()
    container.appendChild($star)
  }
}

function init() {
  const $wrapper = document.querySelector('.stars-wrapper')
  const $comets = $wrapper.querySelector('.extras')
  const classes = ['comet-a', 'comet-b', 'comet-c']

  for (const clazz of classes) {
    const $comet = getComet(clazz)
    $comets.appendChild($comet)
  }

  for (let s = 0; s < 3; ++s) {
    const $svg = getSVG({
      className: 'stars',
      width: '100%',
      height: '100%',
      aspectRatio: 'none',
    })
    $wrapper.appendChild($svg)
    buildStars($svg)
  }
}

onMounted(init)
</script>
