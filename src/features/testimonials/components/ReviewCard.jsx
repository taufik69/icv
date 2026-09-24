import { StarRating } from '@/shared/components/ui'

// Avatar tint cycles through brand tones so the wall doesn't look uniform.
const tints = ['bg-primary-soft text-secondary', 'bg-secondary text-primary', 'bg-surface-muted text-secondary', 'bg-primary text-on-primary']

const initials = (name) => name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()

// Masonry card: quote glyph, review text (or a rating-only note), author row with Google source.
export function ReviewCard({ review, index }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-surface p-6 shadow-raised ring-1 ring-line-soft transition duration-500 hover:-translate-y-1 hover:shadow-elevated hover:ring-primary md:p-7">
      <div className="flex items-center justify-between">
        <StarRating rating={review.rating} />
        <span aria-hidden="true" className="font-heading text-6xl leading-[0.5] font-extrabold text-surface-sunken transition duration-500 group-hover:text-primary">
          &rdquo;
        </span>
      </div>

      {review.text ? (
        <p className="mt-5 leading-relaxed text-ink">{review.text}</p>
      ) : (
        <p className="mt-5 font-heading text-lg font-semibold text-secondary">Left a 5-star rating on Google.</p>
      )}

      <footer className="mt-6 flex items-center gap-3 border-t border-line-soft pt-5">
        <span className={`grid size-11 shrink-0 place-items-center rounded-full font-heading text-sm font-bold ${tints[index % tints.length]}`}>
          {initials(review.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading font-bold text-secondary">{review.name}</p>
          <p className="text-xs text-ink-subtle">
            <time>{review.date}</time> · via Google
          </p>
        </div>
      </footer>
    </article>
  )
}
