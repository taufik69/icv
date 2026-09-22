import { testimonialsContent as content } from '@/features/home/data/testimonialsContent'
import { Container, Reveal } from '@/shared/components/ui'
import { useInView } from '@/shared/hooks/useInView'
import { TestimonialCarousel } from './TestimonialCarousel'

// Library photo with background-attachment: fixed (lg+), loaded only when the section nears.
export function TestimonialsSection() {
  const [ref, near] = useInView({ rootMargin: '400px 0px' })
  const bg = near ? 'bg-[url(/images/library-bg-960.webp)] lg:bg-[url(/images/library-bg-1920.webp)]' : ''

  return (
    <section
      ref={ref}
      aria-labelledby="testimonials-title"
      className={`relative overflow-hidden bg-secondary-dark bg-cover bg-center py-20 md:py-28 lg:bg-fixed ${bg}`}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-secondary-dark/80 via-secondary-dark/55 to-secondary-dark/85" />
      <Container className="relative">
        <Reveal className="text-center">
          <h2 id="testimonials-title" className="font-condensed text-3xl font-bold text-white uppercase md:text-4xl">
            {content.title} <span className="text-primary">{content.highlight}</span>
          </h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-16 rounded-full bg-primary" />
        </Reveal>
        <Reveal delay={100} className="mt-12">
          <TestimonialCarousel reviews={content.reviews} />
        </Reveal>
      </Container>
    </section>
  )
}
