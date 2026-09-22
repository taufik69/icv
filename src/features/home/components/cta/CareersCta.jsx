import { careersCtaContent as content } from '@/features/home/data/careersCtaContent'
import { Container, Reveal } from '@/shared/components/ui'

// Navy call-to-action band (mirrors the icv.edu.au "Smart Training. Real Careers" block).
export function CareersCta() {
  return (
    <section aria-labelledby="careers-cta-title" className="bg-secondary py-20 md:py-24">
      <Container>
        <Reveal className="mx-auto max-w-5xl text-center">
          <h2 id="careers-cta-title" className="font-condensed text-2xl font-bold text-white uppercase md:text-3xl">
            {content.title}
          </h2>
          <p className="mt-3 font-condensed text-lg leading-snug font-bold text-primary md:text-2xl">
            {content.subtitle}
          </p>
          <span aria-hidden="true" className="mx-auto mt-5 block h-0.5 w-24 bg-primary" />
          <a
            href={content.action.href}
            className="btn-shine mt-12 inline-flex rounded-xs bg-primary px-4 py-3 font-condensed text-sm font-bold text-on-primary uppercase transition hover:bg-primary-hover hover:text-on-primary md:text-base"
          >
            {content.action.label}
          </a>
        </Reveal>
      </Container>
    </section>
  )
}
