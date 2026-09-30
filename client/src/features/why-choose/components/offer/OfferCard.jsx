import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@/shared/components/icons'

// Whole card is the link. Green top bar grows and the icon tile flips to navy on hover.
export function OfferCard({ item: { title, text, to, hash, Icon }, index }) {
  return (
    <Link
      to={to}
      hash={hash}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface p-7 shadow-card ring-1 ring-line-soft transition duration-500 hover:-translate-y-1 hover:shadow-elevated md:p-8"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-25 bg-secondary transition duration-500 group-hover:scale-x-100" />
      <span aria-hidden="true" className="absolute top-5 right-6 font-heading text-6xl font-extrabold text-secondary/8">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className="relative grid size-16 place-items-center rounded-2xl bg-secondary/8 text-secondary transition duration-500 group-hover:rotate-6 group-hover:bg-secondary group-hover:text-white">
        <Icon className="size-7" />
      </span>
      <h3 className="relative mt-7 text-xl leading-snug text-secondary">{title}</h3>
      <p className="relative mt-3 flex-1 leading-relaxed text-secondary/80">{text}</p>
      <span className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold text-secondary transition group-hover:gap-3 group-hover:text-secondary-muted">
        Explore
        <ArrowRightIcon className="size-4" />
      </span>
    </Link>
  )
}
