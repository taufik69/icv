import { MapPinIcon } from '@/shared/components/icons'
import { useInView } from '@/shared/hooks/useInView'

// Google Maps embed, only created when the card nears the viewport (saves ~1 MB of third-party JS on load).
export function MapCard({ map, address }) {
  const [ref, near] = useInView({ rootMargin: '300px 0px' })

  return (
    <div ref={ref} className="relative overflow-hidden rounded-3xl bg-surface-muted shadow-card ring-1 ring-line-soft">
      <div className="aspect-4/3 w-full lg:aspect-auto lg:h-[34rem]">
        {near && <iframe title={map.title} src={map.src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="size-full border-0" />}
      </div>
      <a
        href={address.href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-secondary/90 px-5 py-4 text-white shadow-brand backdrop-blur-md transition hover:bg-secondary hover:text-white"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-on-primary">
          <MapPinIcon className="size-5" />
        </span>
        <span className="font-heading font-semibold">{address.label}</span>
      </a>
    </div>
  )
}
