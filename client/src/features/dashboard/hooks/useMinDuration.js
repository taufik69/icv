import { useEffect, useRef, useState } from 'react'

// Holds a loading flag on for at least `min` ms once it turns on, so a fast load still shows its
// skeleton briefly instead of flickering for a frame.
export function useMinDuration(active, min = 300) {
  const [held, setHeld] = useState(false)
  const since = useRef(0)

  useEffect(() => {
    if (active) {
      since.current = Date.now()
      const t = setTimeout(() => setHeld(true))
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setHeld(false), Math.max(0, min - (Date.now() - since.current)))
    return () => clearTimeout(t)
  }, [active, min])

  return active || held
}
