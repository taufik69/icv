import { MapPinIcon } from '@/shared/components/icons'

// Photo fills the right half; a navy gradient on its inner edge melts it into the panel.
export function WelcomeMedia({ image }) {
  return (
    <div className="group relative min-h-72 overflow-hidden sm:min-h-96 lg:min-h-[32rem]">
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes="(min-width: 1024px) 640px, 100vw"
        alt={image.alt}
        width="740"
        height="493"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover transition duration-1000 ease-out group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/10 to-transparent lg:bg-linear-to-r lg:via-transparent" />
      <span className="absolute right-5 bottom-5 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 font-heading text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur-md">
        <MapPinIcon className="size-4 text-primary" />
        {image.caption}
      </span>
    </div>
  )
}
