// Lazy chunk (see Hero). Mounts the Vimeo background player over the poster and
// fades it in only once playback has actually started — no black flash.
import { useRef } from 'react'
import { useVimeoPlayback } from '@/features/home/hooks/useVimeoPlayback'

function buildSrc({ vimeoId, hash }) {
  const params = new URLSearchParams({
    h: hash,
    api: '1', // enables postMessage events (ready/play) to the parent
    background: '1',
    autoplay: '1',
    loop: '1',
    muted: '1',
    playsinline: '1',
    autopause: '0',
    dnt: '1',
    // Smaller rendition on phones starts faster
    quality: window.innerWidth < 768 ? '540p' : '1080p',
  })
  return `https://player.vimeo.com/video/${vimeoId}?${params}`
}

export default function HeroVideo({ video, containerRef }) {
  const iframeRef = useRef(null)
  const isPlaying = useVimeoPlayback(iframeRef, containerRef)

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* 16:9 "object-fit: cover" for an iframe */}
      <iframe
        ref={iframeRef}
        src={buildSrc(video)}
        title="ICV background video"
        tabIndex={-1}
        allow="autoplay; fullscreen; picture-in-picture"
        className="absolute top-1/2 left-1/2 h-[max(100%,56.25vw)] w-[max(100%,177.78svh)] -translate-x-1/2 -translate-y-1/2 border-0"
      />
    </div>
  )
}
