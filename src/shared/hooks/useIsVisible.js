import { useEffect, useRef, useState } from 'react'

// Live visibility (unlike useInView, keeps observing) — e.g. to pause autoplay off-screen.
export function useIsVisible(threshold = 0.25) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold })
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}
