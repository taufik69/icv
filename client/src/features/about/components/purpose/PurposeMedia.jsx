import { lazy, Suspense, useState } from 'react'
import { PlayIcon } from '@/shared/components/icons'
import { preconnect } from '@/shared/lib/preconnect'

const VideoModal = lazy(() => import('@/shared/components/media/VideoModal'))
const warmUp = () => preconnect('https://www.youtube-nocookie.com', 'https://www.google.com')

function Photo({ image }) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
    />
  )
}

// Card photo. With `video`, the photo becomes a facade: play button opens the YouTube lightbox (lazy chunk).
export function PurposeMedia({ image, video, className }) {
  const [open, setOpen] = useState(false)

  if (!video) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Photo image={image} />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        onPointerEnter={warmUp}
        onFocus={warmUp}
        aria-label={`Play video: ${video.title}`}
        className="group/play absolute inset-0 cursor-pointer"
      >
        <Photo image={image} />
        <span aria-hidden="true" className="absolute inset-0 bg-secondary-dark/35 transition duration-500 group-hover/play:bg-secondary-dark/20" />
        {/* Play button + label stacked and centred together, so they never overlap on short phone cards. */}
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4">
          <span className="relative grid size-12 place-items-center sm:size-18">
            <span className="absolute inset-0 rounded-full bg-primary/60 motion-safe:animate-ping" />
            <span className="relative grid size-12 place-items-center rounded-full bg-primary text-white shadow-elevated ring-3 ring-white/30 transition group-hover/play:scale-110 sm:size-18 sm:ring-4">
              <PlayIcon className="ml-0.5 size-5 sm:ml-1 sm:size-8" />
            </span>
          </span>
          <span className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 font-heading text-xs font-semibold text-secondary shadow-card sm:px-5 sm:py-2 sm:text-sm">
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
