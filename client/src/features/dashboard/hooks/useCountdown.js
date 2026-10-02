import { useEffect, useState } from 'react'

// Seconds left until `until` (a date or ISO string), ticking once a second; 0 once it has passed.
export function useCountdown(until) {
  const left = () => (until ? Math.max(0, Math.ceil((new Date(until) - Date.now()) / 1000)) : 0)
  const [seconds, setSeconds] = useState(left)
  useEffect(() => {
    const tick = () => setSeconds(left())
    const timer = setInterval(tick, 1000)
    const first = setTimeout(tick) // pick up a new deadline straight away
    return () => { clearInterval(timer); clearTimeout(first) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [until])
  return seconds
}

// 300 → "5:00"
export const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
