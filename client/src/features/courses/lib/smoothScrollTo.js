const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2) // easeInOutCubic
let run = 0

// Eased window scroll to an element, honouring its scroll-margin-top. Duration grows with distance;
// reduced motion jumps. A wheel / touch from the visitor cancels it. Resolves when it stops.
export function smoothScrollTo(el) {
  const id = ++run
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  const from = window.scrollY
  const distance = Math.max(0, el.getBoundingClientRect().top + from - margin) - from
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(distance) < 2) {
    window.scrollTo(0, from + distance)
    return Promise.resolve()
  }
  const duration = Math.min(1100, 450 + Math.abs(distance) * 0.25)
  const cancel = () => (run += id === run ? 1 : 0)
  window.addEventListener('wheel', cancel, { passive: true, once: true })
  window.addEventListener('touchstart', cancel, { passive: true, once: true })

  return new Promise((resolve) => {
    let start
    const done = () => {
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchstart', cancel)
      resolve()
    }
    const step = (now) => {
      if (id !== run) return done()
      start ??= now
      const t = Math.min(1, (now - start) / duration)
      window.scrollTo(0, from + distance * ease(t))
      if (t < 1) requestAnimationFrame(step)
      else done()
    }
    requestAnimationFrame(step)
  })
}
