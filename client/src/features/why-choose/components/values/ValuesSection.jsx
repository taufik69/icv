import { valuesContent as content } from '@/features/why-choose/data/whyChooseContent'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { ValueCard } from './ValueCard'

// Navy band: centred eyebrow + title on top, then the values as blueprint cells (1 → 2 → 3 cols).
export function ValuesSection() {
  return (
    <section aria-labelledby="values-title" className="relative isolate overflow-hidden bg-secondary py-20 md:py-28">
      <span aria-hidden="true" className="parallax-up pointer-events-none absolute -top-32 -left-24 -z-10 size-96 rounded-full bg-white/5 blur-3xl" />
      <span aria-hidden="true" className="parallax-down pointer-events-none absolute -right-24 -bottom-32 -z-10 size-96 rounded-full bg-sky/15 blur-3xl" />

      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow tone="light" accent="muted">{content.eyebrow}</SectionEyebrow>
          <h2 id="values-title" className="mt-5 text-3xl leading-tight text-white md:text-5xl">
            {content.title} <span className="text-white/90">{content.highlight}</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 100}>
              <ValueCard item={item} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
