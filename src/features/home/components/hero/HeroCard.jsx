import { ArrowUpRightIcon } from '@/shared/components/icons'

// `tile`: photo on top (used for the two cards side by side); `row`: photo beside the text.
export function HeroCard({ card, layout = 'row' }) {
  const tile = layout === 'tile'

  return (
    <a
      href={card.href}
      className={`group flex h-full gap-3 rounded-xl border border-white/20 bg-white/15 p-2 text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/25 hover:text-white ${tile ? 'flex-col' : 'items-center gap-4'}`}
    >
      <img
        src={card.image}
        alt=""
        width="200"
        height="200"
        loading="lazy"
        decoding="async"
        className={`shrink-0 rounded-lg object-cover ${tile ? 'aspect-16/10 w-full' : 'size-16 lg:size-18'}`}
      />
      <div className={`flex min-w-0 flex-col gap-1 ${tile ? 'px-2 pb-2' : 'pr-2'}`}>
        <p className="font-heading leading-snug font-semibold">{card.title}</p>
        <span className="flex items-center gap-1 font-heading text-sm font-semibold text-primary">
          {card.cta}
          <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  )
}
