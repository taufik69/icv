import { MapPinIcon } from '@/shared/components/icons'

// Rounded photo with offset navy frame; slow zoom on hover and a glass location pill (same as home "Study in Australia").
export function CampusPhoto({ image }) {
  return (
    <div className="relative mr-3 mb-3 sm:mr-6 sm:mb-6">
      <span aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-secondary sm:translate-x-6 sm:translate-y-6" />
      <div className="group relative aspect-4/3 overflow-hidden rounded-3xl shadow-elevated">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1280px) 680px, (min-width: 1024px) 52vw, 100vw"
          alt={image.alt}
          width="1600"
          height="1200"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition duration-1000 ease-out group-hover:scale-105"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent" />
        <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 font-heading text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur-md">
          <MapPinIcon className="size-4 text-primary" />
          {image.caption}
        </span>
      </div>
    </div>
  )
}
