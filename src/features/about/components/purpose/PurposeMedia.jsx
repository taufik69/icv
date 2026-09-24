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
        <span className="absolute top-1/2 left-1/2 grid size-18 -translate-1/2 place-items-center">
          <span className="absolute inset-0 rounded-full bg-primary/60 motion-safe:animate-ping" />
          <span className="relative grid size-18 place-items-center rounded-full bg-primary text-white shadow-elevated ring-4 ring-white/30 transition group-hover/play:scale-110">
            <PlayIcon className="ml-1 size-8" />
          </span>
        </span>
        <span className="absolute inset-x-0 bottom-5 flex justify-center">
          <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2 font-heading text-sm font-semibold text-secondary shadow-card">
            <PlayIcon className="size-3.5 text-primary" />
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
