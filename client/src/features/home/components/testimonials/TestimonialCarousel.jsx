import { useState } from 'react'
import { useViewportWidth } from '@/features/home/hooks/useViewportWidth'
import { activeSize, slotBox, tierFor } from '@/features/home/lib/carouselLayout'
import { useIsVisible } from '@/shared/hooks/useIsVisible'
import { CarouselControls } from './CarouselControls'
import { MobileTestimonial } from './MobileTestimonial'
import { TestimonialSlot } from './TestimonialSlot'

const OFFSETS = [-3, -2, -1, 0, 1, 2, 3]
const mod = (n, m) => ((n % m) + m) % m

// `page` is an unbounded counter; each slot is keyed by its virtual index so cards keep their
// identity and CSS-transition between positions instead of re-mounting.
export function TestimonialCarousel({ reviews }) {
  const [page, setPage] = useState(0)
  const [ref, visible] = useIsVisible()
  const viewport = useViewportWidth()
  const tier = tierFor(viewport)
  const size = tier === 'mobile' ? null : activeSize(tier)
  const total = reviews.length
  const active = mod(page, total)

  const go = (delta) => setPage((p) => p + delta)
  const goTo = (i) => {
    let d = i - active
    if (d > total / 2) d -= total
    if (d < -total / 2) d += total
    go(d)
  }
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'ArrowRight') go(1)
  }

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label="Student reviews"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="group/carousel rounded-3xl outline-none"
    >
      {tier === 'mobile' ? (
        <MobileTestimonial key={page} review={reviews[active]} />
      ) : (
        <div aria-live="polite" className="relative overflow-x-clip" style={{ height: size[1] + 48 }}>
          {OFFSETS.map((offset) => (
            <TestimonialSlot
              key={page + offset}
              review={reviews[mod(page + offset, total)]}
              offset={offset}
              box={slotBox(offset, tier)}
              activeSize={size}
              onSelect={go}
            />
          ))}
        </div>
      )}
      <CarouselControls
        reviews={reviews}
        active={active}
        page={page}
        paused={!visible}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
        onSelect={goTo}
      />
    </div>
  )
}
