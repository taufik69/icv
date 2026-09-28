import { StarRating } from '@/shared/components/ui'

const initials = (name) => name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()

// Featured review: label + stars, quote in a lighter weight with a green marker on the key phrase,
// oversized faded quote mark top-right, author row with avatar and source.
export function FeaturedQuote({ featured }) {
  const [before, highlight, after] = featured.quote

  return (
    <figure className="relative">
      <span aria-hidden="true" className="pointer-events-none absolute -top-16 right-0 font-heading text-[12rem] leading-none font-extrabold text-primary/15 select-none">
        &ldquo;
      </span>

      <div className="relative flex flex-wrap items-center gap-3">
        <span className="rounded-pill bg-primary-soft px-3.5 py-1.5 font-condensed text-xs font-bold tracking-[0.2em] text-secondary uppercase">
          Featured review
        </span>
        <StarRating rating={5} />
      </div>

      <blockquote className="relative mt-6 font-heading text-2xl leading-snug font-semibold text-secondary md:text-4xl md:leading-snug">
        {before}
        <span className="box-decoration-clone bg-linear-to-t from-primary/40 from-35% to-transparent to-35% px-1">{highlight}</span>
        {after}
      </blockquote>

      <figcaption className="relative mt-8 flex items-center gap-4 border-t border-line-soft pt-6">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary font-heading text-sm font-bold text-primary">
          {initials(featured.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-heading font-bold text-secondary">{featured.name}</span>
          <span className="block text-sm text-ink-muted">{featured.course}</span>
        </span>
        <span className="hidden rounded-pill bg-surface-muted px-3 py-1 text-xs font-semibold text-ink-muted ring-1 ring-line-soft sm:inline-block">
          Google · {featured.date}
        </span>
      </figcaption>
    </figure>
  )
}
