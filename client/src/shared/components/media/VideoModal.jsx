// Lazy chunk — full-screen lightbox player. Closes on Esc / backdrop click.
// Portaled to <body> so transformed ancestors (e.g. Reveal) can't trap `position: fixed`.
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@/shared/components/icons'
import YouTubeEmbed from './YouTubeEmbed'

export default function VideoModal({ videoId, title, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-secondary-dark/90 p-4 backdrop-blur-sm motion-safe:animate-[fade-in_200ms_ease-out]"
    >
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <CloseIcon />
        </button>
        <div className="relative aspect-video overflow-hidden rounded-xl bg-black shadow-elevated">
          <YouTubeEmbed videoId={videoId} title={title} />
        </div>
      </div>
    </div>,
    document.body,
  )
}
