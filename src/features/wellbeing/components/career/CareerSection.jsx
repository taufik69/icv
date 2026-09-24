import { careerContent as content } from '@/features/wellbeing/data/careerContent'
import { CheckCircleIcon } from '@/shared/components/icons'
import { Container, PhotoFrame, Reveal, SectionEyebrow } from '@/shared/components/ui'

// Framed photo left, copy + 6-item service checklist right.
export function CareerSection() {
  const { image } = content

  return (
    <section id="career-counselling-services" aria-labelledby="career-title" className="scroll-mt-24 bg-surface-muted py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-16">
        <Reveal from="left" className="order-last lg:order-first">
          <PhotoFrame image={image} />
        </Reveal>

        <Reveal from="right" delay={100}>
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="career-title" className="mt-5 text-3xl leading-tight md:text-5xl">
            {content.title} <span className="text-primary-hover">{content.highlight}</span>
          </h2>
          <p className="mt-6 leading-relaxed text-ink-muted">{content.paragraphs[0]}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.services.map((service) => (
              <li key={service} className="flex items-start gap-3 rounded-xl bg-surface px-4 py-3 text-sm font-medium text-ink shadow-raised ring-1 ring-line-soft transition hover:ring-primary">
                <CheckCircleIcon className="mt-px size-5 shrink-0 text-primary-hover" />
                {service}
              </li>
            ))}
          </ul>
          <p className="mt-8 border-l-4 border-primary pl-4 leading-relaxed font-medium text-secondary">{content.paragraphs[1]}</p>
        </Reveal>
      </Container>
    </section>
  )
}
