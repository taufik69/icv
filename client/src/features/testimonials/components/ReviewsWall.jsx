import { useState } from 'react'
import { reviews } from '@/features/testimonials/data/reviewsContent'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { ReviewCard } from './ReviewCard'
import { ReviewMarqueeColumn } from './ReviewMarqueeColumn'
import { TrainerFilter } from './TrainerFilter'

// Trainers students name in their reviews; each becomes a filter chip.
const TRAINERS = ['Kritika', 'Sonia']
const rotate = (list, n) => [...list.slice(n), ...list.slice(0, n)]

// "All": endless scrolling columns like home news (2 at md, 3 at lg; middle one reversed, pause on hover).
// A trainer filter (or reduced motion) swaps to a static masonry grid.
export function ReviewsWall() {
  const [ref, doodle] = useDoodleBackground()
  const [trainer, setTrainer] = useState(null)
  const reducedMotion = useReducedMotion()
  const shown = trainer ? reviews.filter((r) => r.text.includes(trainer)) : reviews
  const counts = Object.fromEntries(TRAINERS.map((t) => [t, reviews.filter((r) => r.text.includes(t)).length]))

  return (
    <section ref={ref} aria-labelledby="wall-title" className={`relative overflow-hidden bg-surface-muted py-20 md:py-28 ${doodle}`}>
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionEyebrow>Google reviews</SectionEyebrow>
            <h2 id="wall-title" className="mt-5 text-3xl leading-tight md:text-5xl">
              In their <span className="text-primary-hover">own words</span>
            </h2>
          </div>
          <TrainerFilter trainers={TRAINERS} counts={counts} total={reviews.length} active={trainer} onChange={setTrainer} />
        </Reveal>

        {trainer || reducedMotion ? (
          <ul aria-live="polite" className="mt-12 gap-6 sm:columns-2 lg:columns-3">
            {shown.map((review, i) => (
              <li key={review.name} className="mb-6 break-inside-avoid">
                <ReviewCard review={review} index={i} />
              </li>
            ))}
          </ul>
        ) : (
          <Reveal className="group mt-12 md:h-[46rem] md:overflow-hidden md:marquee-mask">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <ReviewMarqueeColumn reviews={reviews} className="[--marquee-duration:42s]" />
              <ReviewMarqueeColumn
                reviews={rotate(reviews, 3)}
                offset={3}
                className="hidden [--marquee-duration:50s] [--marquee-direction:reverse] md:flex"
              />
              <ReviewMarqueeColumn reviews={rotate(reviews, 6)} offset={6} className="hidden [--marquee-duration:46s] lg:flex" />
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
