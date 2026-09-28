import { featured, reviews } from '@/features/testimonials/data/reviewsContent'
import { Container, Reveal } from '@/shared/components/ui'
import { reviewSummary as summary } from '@/shared/config/footer'
import { FeaturedQuote } from './FeaturedQuote'
import { RatingCard } from './RatingCard'

// Editorial opener: light rating card, featured quote set large beside it.
export function RatingSpotlight() {
  const fiveStar = reviews.filter((r) => r.rating === 5).length

  return (
    <section aria-labelledby="rating-title" className="relative overflow-hidden bg-surface py-20 md:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal from="left">
          <RatingCard summary={summary} fiveStar={fiveStar} total={reviews.length} />
        </Reveal>

        <Reveal from="right" delay={100}>
          <FeaturedQuote featured={featured} />
        </Reveal>
      </Container>
    </section>
  )
}
