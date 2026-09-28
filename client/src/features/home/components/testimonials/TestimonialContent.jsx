import { ReviewAuthor } from './ReviewAuthor'

// Body of the active card: quote on the left, course photo on the right (md+).
export function TestimonialContent({ review }) {
  return (
    <div className="flex size-full gap-7 p-6 sm:p-7">
      <figure className="flex min-w-0 flex-1 flex-col justify-center gap-5 text-center md:justify-between md:gap-4 md:text-left">
        <div>
          <span aria-hidden="true" className="block font-heading text-6xl leading-none text-primary">“</span>
          <h3 className="-mt-3 text-xl leading-tight md:text-3xl">{review.headline}</h3>
        </div>
        <blockquote className="text-sm leading-relaxed text-ink-muted md:text-base">{review.quote}</blockquote>
        <figcaption>
          <ReviewAuthor review={review} />
        </figcaption>
      </figure>
      <div className="relative hidden w-[38%] shrink-0 overflow-hidden rounded-2xl bg-surface-muted md:block">
        <img src={review.image} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
        <span className="absolute top-3 right-3 rounded-md bg-primary px-2.5 py-1 font-condensed text-xs font-bold tracking-wider text-on-primary uppercase">
          {review.source}
        </span>
      </div>
    </div>
  )
}
