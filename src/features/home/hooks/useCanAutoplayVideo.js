import { useState } from 'react'

// Skip the background video for reduced-motion users and slow / data-saver connections;
// they keep the static poster instead.
function canAutoplay() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const conn = navigator.connection
  const slow = conn?.saveData || ['slow-2g', '2g'].includes(conn?.effectiveType)
  return !reducedMotion && !slow
}

export function useCanAutoplayVideo() {
  const [allowed] = useState(canAutoplay)
  return allowed
}
