import { rnd } from '@/util/util'
import { defineStore } from 'pinia'

export const useFieldStore = defineStore('field', () => {
  function gaussianPoint(mean, stdDev) {
    let u = 0
    let v = 0
    while (u === 0) u = Math.random() // Evitar u = 0
    while (v === 0) v = Math.random() // Evitar v = 0
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    return mean + z * stdDev
  }

  const fillPoints = ($svg, $path, points, offset) => {
    const svgMatrix = $svg.getScreenCTM()
    const length = $path.getTotalLength() + offset
    const step = length / points
    const arrPoints = []

    for (let i = 0; i < points; i++) {
      const basePos = i * step
      const normal = gaussianPoint(0, step / 2)
      const position = Math.max(0, Math.min(length, basePos + normal))
      const point = $path.getPointAtLength(position)

      const screenX =
        point.x * svgMatrix.a + point.y * svgMatrix.c + svgMatrix.e
      const screenY =
        point.x * svgMatrix.b + point.y * svgMatrix.d + svgMatrix.f
      arrPoints.push({ x: screenX, y: screenY })
    }

    return arrPoints
  }

  function getPoints($svg, $path, min, max, i = 0) {
    const numPoints = rnd(min, max)
    return fillPoints($svg, $path, numPoints, 5 * i)
  }

  return { getPoints }
})
