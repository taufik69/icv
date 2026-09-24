import { scholarshipContent as content } from '@/features/why-choose/data/campusContent'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { PillarCard } from './PillarCard'
import { ScholarshipCard } from './ScholarshipCard'

// Copy + mission/vision pillars on the left; navy scholarship card with CTAs on the right.
export function ScholarshipSection() {
  return (
    <section aria-labelledby="scholarship-title" className="relative overflow-hidden bg-surface-muted py-20 md:py-28">
      <span aria-hidden="true" className="parallax-up pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-primary/10 blur-3xl" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <Reveal from="left">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="scholarship-title" className="mt-5 text-3xl leading-tight md:text-5xl">
            {content.title} <span className="text-primary-hover">{content.highlight}</span>
          </h2>
          <p className="mt-6 leading-relaxed text-ink-muted">{content.text}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {content.pillars.map((pillar) => (
              <li key={pillar.title}>
                <PillarCard pillar={pillar} />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal from="right" delay={100}>
          <ScholarshipCard content={content} />
        </Reveal>
      </Container>
    </section>
  )
}
