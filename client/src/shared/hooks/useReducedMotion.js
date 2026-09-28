import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

// true when the user asks for reduced motion; follows live changes to the setting.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches)

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = () => setReduced(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}
