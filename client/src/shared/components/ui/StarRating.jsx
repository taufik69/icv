import { StarIcon } from '@/shared/components/icons'

// Row of 5 stars (warning/amber fill), unfilled stars faded. Announced as "N out of 5 stars".
export function StarRating({ rating, className = 'size-4' }) {
  const full = Math.floor(rating)

  return (
    <span role="img" aria-label={`${rating} out of 5 stars`} className="inline-flex gap-0.5 text-warning">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={`${className} ${i < full ? '' : 'opacity-40'}`} />
      ))}
    </span>
  )
}
