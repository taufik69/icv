import { ArrowUpRightIcon } from '@/shared/components/icons'

export function HeroCard({ card }) {
  return (
    <a
      href={card.href}
      className="group flex gap-4 rounded-lg border border-white/20 bg-white/15 p-2 text-white backdrop-blur-md transition hover:bg-white/25 hover:text-white"
    >
      <img
        src={card.image}
        alt=""
        width="100"
        height="100"
        loading="lazy"
        decoding="async"
        className="size-24 shrink-0 rounded-md object-cover"
      />
      <div className="flex flex-col justify-between py-1 pr-2">
        <p className="font-heading font-semibold leading-snug">{card.title}</p>
        <span className="flex items-center gap-1 font-heading text-sm font-semibold text-primary">
          {card.cta}
          <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  )
}
