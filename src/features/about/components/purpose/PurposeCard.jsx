import { PurposeMedia } from './PurposeMedia'

const layouts = {
  // Mission: narrow portrait photo on the left (from sm).
  portrait: {
    card: 'sm:grid-cols-[13rem_1fr]',
    media: 'aspect-4/3 sm:aspect-auto',
  },
  // Vision: wide photo on the right (from lg).
  landscape: {
    card: 'lg:grid-cols-[1fr_24rem] xl:grid-cols-[1fr_30rem]',
    media: 'aspect-video lg:order-last lg:aspect-auto',
  },
}

// White card: photo (or video facade) + green-labelled copy. Photo zooms slightly on hover.
export function PurposeCard({ item, layout }) {
  const { card, media } = layouts[layout]

  return (
    <article className={`group grid h-full overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-line-soft transition duration-500 hover:shadow-elevated ${card}`}>
      <PurposeMedia image={item.image} video={item.video} className={media} />
      <div className="p-6 md:p-9">
        <h3 className="flex items-center gap-3 font-condensed text-sm font-bold tracking-[0.2em] text-primary-hover uppercase">
          <span aria-hidden="true" className="h-0.5 w-8 bg-primary transition-all duration-500 group-hover:w-14" />
          {item.label}
        </h3>
        <div className="mt-5 space-y-4 leading-relaxed text-ink-muted">
          {item.paragraphs.map((text) => (
            <p key={text.slice(0, 24)}>{text}</p>
          ))}
        </div>
      </div>
    </article>
  )
}
