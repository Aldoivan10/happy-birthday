export function rnd(min = 0, max = 1) {
  const num = Math.floor(Math.random() * (max - min + 1) + min)
  return +num.toFixed(2)
}

export function getSVG({
  type = 'svg',
  className,
  width,
  height,
  fill,
  transform,
  aspectRatio,
}) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', type)
  if (aspectRatio) svg.setAttribute('preserveAspectRatio', aspectRatio)
  if (transform) svg.setAttribute('transform', transform)
  if (className) svg.setAttribute('class', className)
  if (height) svg.setAttribute('height', height)
  if (width) svg.setAttribute('width', width)
  if (fill) svg.setAttribute('fill', fill)
  return svg
}
