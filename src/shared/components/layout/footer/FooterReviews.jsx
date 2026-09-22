import { StarIcon } from '@/shared/components/icons'
import { reviewSummary as r } from '@/shared/config/footer'
import { FooterHeading } from './FooterHeading'

export function FooterReviews() {
  const full = Math.floor(r.rating)

  return (
    <div>
      <FooterHeading>Reviews</FooterHeading>
      <div className="mt-6 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
        <p className="text-sm font-semibold text-white">{r.name}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-heading text-3xl font-bold text-white">{r.rating}</span>
          <span className="flex text-warning" aria-label={`${r.rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} className={`size-4 ${i < full ? '' : 'opacity-40'}`} />
            ))}
          </span>
        </div>
        <p className="mt-1 text-sm text-white/60">Based on {r.count} Google reviews</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={r.writeHref} className="btn-shine rounded-full bg-primary px-4 py-2 font-heading text-xs font-semibold text-on-primary hover:text-on-primary">
            Review us on Google
          </a>
          <a href={r.allHref} className="rounded-full px-4 py-2 font-heading text-xs font-semibold text-white ring-1 ring-white/25 hover:text-primary hover:ring-primary">
            See all reviews
          </a>
        </div>
      </div>
    </div>
  )
}
