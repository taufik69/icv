import { ReviewCard } from './ReviewCard'

// Same pattern as home news: md+ renders the list twice and scrolls it forever (styles/marquee.css),
// pausing on hover via the parent `group`. Below md it is a horizontal snap carousel; the duplicate
// set is hidden there and for reduced-motion users.
export function ReviewMarqueeColumn({ reviews, offset = 0, className = '' }) {
  return (
    <div
      className={`-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-col md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:marquee-up group-hover:[animation-play-state:paused] ${className}`}
    >
      {reviews.map((review, i) => (
        <div key={review.name} className="w-[85%] shrink-0 snap-start md:w-auto">
          <ReviewCard review={review} index={i + offset} />
        </div>
      ))}
      <div aria-hidden="true" className="hidden flex-col gap-5 md:flex md:motion-reduce:hidden">
        {reviews.map((review, i) => (
          <div key={review.name} inert>
            <ReviewCard review={review} index={i + offset} />
          </div>
        ))}
      </div>
    </div>
  )
}
