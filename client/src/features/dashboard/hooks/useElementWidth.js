import { useEffect, useRef, useState } from 'react'

// Width of an element in px, kept up to date as it resizes (for charts drawn in real pixels, so text and
// line widths never stretch). 0 until the first measurement.
export function useElementWidth() {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, width]
}
