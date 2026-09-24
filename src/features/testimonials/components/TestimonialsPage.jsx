import { heroContent } from '@/features/testimonials/data/reviewsContent'
import { PageHero } from '@/shared/components/layout'
import { RatingSpotlight } from './RatingSpotlight'
import { ReviewsWall } from './ReviewsWall'
import { ShareCta } from './ShareCta'

export function TestimonialsPage() {
  return (
    <>
      <PageHero id="testimonials-page-title" current="Testimonials" {...heroContent} />
      <RatingSpotlight />
      <ReviewsWall />
      <ShareCta />
    </>
  )
}
