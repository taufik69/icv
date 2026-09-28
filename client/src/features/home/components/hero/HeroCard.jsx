import { ArrowUpRightIcon } from '@/shared/components/icons'

// One quick-link row in the hero panel: small thumbnail, title, and a round arrow that fills green on hover.
export function HeroCard({ card }) {
  return (
    <a
      href={card.href}
      aria-label={`${card.title} – ${card.cta}`}
      className="group flex items-center gap-4 rounded-xl p-2.5 text-white transition hover:bg-white/10 hover:text-white"
    >
      <img
        src={card.image}
        alt=""
        width="200"
        height="200"
        loading="lazy"
        decoding="async"
        className="size-12 shrink-0 rounded-lg object-cover"
      />
      <span className="min-w-0 flex-1 font-heading text-base leading-snug font-semibold">{card.title}</span>
      <span className="grid size-8 shrink-0 place-items-center rounded-full text-white/70 ring-1 ring-white/25 transition group-hover:bg-primary group-hover:text-on-primary group-hover:ring-primary">
        <ArrowUpRightIcon className="size-4" />
      </span>
    </a>
  )
}
