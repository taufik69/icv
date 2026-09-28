import { StarIcon } from '@/shared/components/icons'
import { StarRating } from '@/shared/components/ui'

// Light score card: big navy score, stars, review count, and a segmented bar (one segment per recent review).
export function RatingCard({ summary, fiveStar, total }) {
  return (
    <div className="rounded-3xl bg-surface p-7 shadow-card ring-1 ring-line-soft md:p-9">
      <div className="flex items-center justify-between gap-4">
        <h2 id="rating-title" className="inline-flex items-center gap-2 rounded-pill bg-surface-muted px-3.5 py-1.5 font-condensed text-xs font-bold tracking-[0.2em] text-ink-muted uppercase">
          <StarIcon className="size-3.5 text-warning" />
          Google rating
        </h2>
        <a href={summary.allHref} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-secondary underline-offset-4 hover:text-primary-hover hover:underline">
          View on Google
        </a>
      </div>

      <div className="mt-6 flex items-end gap-5">
        <p className="font-heading text-7xl leading-none font-extrabold tracking-tight text-secondary md:text-8xl">
          {summary.rating}
        </p>
        <div className="pb-1.5">
          <StarRating rating={summary.rating} className="size-5" />
          <p className="mt-1 text-sm text-ink-muted">{summary.count} Google reviews</p>
        </div>
      </div>

      <div className="mt-8 border-t border-line-soft pt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-secondary">Recent reviews · 5 stars</span>
          <span className="font-heading font-bold text-secondary">
            {fiveStar}/{total}
          </span>
        </div>
        <div role="img" className="mt-3 flex gap-1.5" aria-label={`${fiveStar} of ${total} recent reviews are 5 stars`}>
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className={`h-2.5 flex-1 rounded-pill ${i < fiveStar ? 'bg-primary' : 'bg-surface-muted'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
