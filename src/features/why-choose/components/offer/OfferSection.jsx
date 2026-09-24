import { offerContent as content } from '@/features/why-choose/data/whyChooseContent'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { OfferCard } from './OfferCard'

// Three support services. Mobile: snap carousel; sm: 2 cols; lg: 3 cols.
export function OfferSection() {
  return (
    <section aria-labelledby="offer-title" className="bg-surface-muted py-20 md:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="offer-title" className="mt-5 text-3xl leading-tight md:text-5xl">
            {content.title} <span className="text-primary-hover">{content.highlight}</span>
          </h2>
        </Reveal>

        <ul className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <li key={item.title} className="w-[85%] shrink-0 snap-start sm:w-auto">
              <Reveal delay={i * 100} className="h-full">
                <OfferCard item={item} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
