import { useEffect, useState } from 'react'

const ORIGIN = 'https://player.vimeo.com'
const PLAYING_EVENTS = new Set(['play', 'playProgress', 'timeupdate'])

function parse(data) {
  try {
    return typeof data === 'string' ? JSON.parse(data) : data
  } catch {
    return null
  }
}

// Talks to the Vimeo iframe via postMessage (no player SDK needed):
// - reports `isPlaying` once real frames are rolling, so the poster can fade out
// - pauses the video while the hero is off-screen to save CPU / bandwidth
export function useVimeoPlayback(iframeRef, containerRef) {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let ready = false
    let visible = true
    const post = (method, value) =>
      iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ method, value }), ORIGIN)

    const onMessage = (e) => {
      if (e.origin !== ORIGIN || e.source !== iframeRef.current?.contentWindow) return
      const data = parse(e.data)
      if (data?.event === 'ready') {
        ready = true
        PLAYING_EVENTS.forEach((ev) => post('addEventListener', ev))
        if (!visible) post('pause')
      }
      if (PLAYING_EVENTS.has(data?.event)) setIsPlaying(true)
    }
    window.addEventListener('message', onMessage)

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (ready) post(visible ? 'play' : 'pause')
    })
    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      window.removeEventListener('message', onMessage)
      observer.disconnect()
    }
  }, [iframeRef, containerRef])

  return isPlaying
}
