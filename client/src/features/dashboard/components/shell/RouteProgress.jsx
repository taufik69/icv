import { useEffect, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'

const SHOW_AFTER = 150 // ms; quicker loads (cached pages) never show the bar
const FADE = 450 // ms

// Thin green bar across the top while a dashboard page loads: it races ahead, crawls toward 90%,
// then fills and fades once the page is ready.
export function RouteProgress() {
  const loading = useRouterState({ select: (s) => s.status === 'pending' })
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShown(loading), loading ? SHOW_AFTER : FADE)
    return () => clearTimeout(t)
  }, [loading])

  if (!shown) return null
  return (
    <div role="progressbar" aria-label="Loading page" aria-busy={loading} className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.75">
      <div
        className={`h-full origin-left rounded-r-pill bg-primary shadow-[0_0_10px] shadow-primary ${
          loading ? 'animate-route-progress motion-reduce:animate-none motion-reduce:scale-x-50' : 'scale-x-100 opacity-0 transition-opacity duration-450'
        }`}
      />
    </div>
  )
}
