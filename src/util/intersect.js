export default {
  mounted(el, binding) {
    const options = {
      root: null, // Viewport
      threshold: binding.value?.threshold || 0.1, // Parte visible (10% por defecto)
    }

    const observer = new IntersectionObserver(([entry]) => {
      binding.value.callback(entry.isIntersecting)
    }, options)

    el._observer = observer
    observer.observe(el)
  },
  unmounted(el) {
    if (el._observer) el._observer.disconnect()
  },
}
