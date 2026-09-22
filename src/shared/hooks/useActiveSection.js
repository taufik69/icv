import { useEffect, useState } from 'react'

// Scroll-spy: returns the id of the last listed section whose top has passed the viewport
// middle, or null when above all of them. Re-checks on scroll (rAF-throttled) and route change.
// `ids` must be stable (module constant); `resetKey` (e.g. pathname) re-runs the check.
export function useActiveSection(ids, resetKey) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      const mid = window.innerHeight / 2
      const hit = ids.filter((id) => document.getElementById(id)?.getBoundingClientRect().top < mid)
      setActive(hit.at(-1) ?? null)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [ids, resetKey])

  return active
}
