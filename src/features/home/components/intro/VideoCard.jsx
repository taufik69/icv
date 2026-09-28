import { lazy, Suspense, useState } from 'react'
import { PlayIcon } from '@/shared/components/icons'
import { preconnect } from '@/shared/lib/preconnect'

const VideoModal = lazy(() => import('@/shared/components/media/VideoModal'))
const warmUp = () => preconnect('https://www.youtube-nocookie.com', 'https://www.google.com')

// Landscape card below lg, portrait beside the copy on lg+; offset frame; opens the YouTube video in a lightbox (lazy chunk).
export function VideoCard({ video }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-md">
      <div className="absolute inset-0 -m-3 rounded-3xl border-4 border-primary/60" />
      <span className="absolute -top-8 left-1/2 size-3 rounded-full bg-primary motion-safe:animate-float" />
      <span className="absolute -bottom-10 left-1/2 size-2 rounded-full bg-secondary/40 motion-safe:animate-float-slow" />

      <button
        type="button"
        onClick={() => setOpen(true)}
        onPointerEnter={warmUp}
        onFocus={warmUp}
        aria-label={`Play video: ${video.title}`}
        className="group relative block aspect-16/10 w-full lg:aspect-4/5 cursor-pointer overflow-hidden rounded-2xl bg-secondary-dark shadow-elevated"
      >
        <img
          {...video.image}
          width="720"
          height="900"
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-linear-to-t from-secondary-dark/85 via-secondary-dark/10 to-transparent" />
        {/* Play button + label as one centred stack, so they never overlap on the short landscape card (phones). */}
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4">
          <span className="relative grid size-12 place-items-center sm:size-16">
            <span className="absolute inset-0 rounded-full bg-primary/60 motion-safe:animate-ping" />
            <span className="relative grid size-full place-items-center rounded-full bg-primary text-white shadow-elevated transition group-hover:scale-110">
              <PlayIcon className="ml-0.5 size-5 sm:size-7" />
            </span>
          </span>
          <span className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 font-heading text-xs font-semibold text-secondary shadow-card transition group-hover:gap-3 sm:px-5 sm:py-2 sm:text-sm">
            <PlayIcon className="size-3 text-primary sm:size-3.5" />
            {video.label}
          </span>
        </span>
      </button>

      {open && (
        <Suspense fallback={null}>
          <VideoModal videoId={video.videoId} title={video.title} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </div>
  )
}
