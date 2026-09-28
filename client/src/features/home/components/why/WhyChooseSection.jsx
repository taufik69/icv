import { whyChooseContent as content } from '@/features/home/data/whyChooseContent'
import { ArrowRightIcon } from '@/shared/components/icons'
import { AppLink, Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { WhyFeatureCard } from './WhyFeatureCard'

// Text + CTA on the left; staggered 2×2 feature cards on the right (2nd column offset on lg).
export function WhyChooseSection() {
  return (
    <section aria-labelledby="why-title" className="relative overflow-hidden bg-surface-alt py-20 md:py-28">
      <span aria-hidden="true" className="parallax-up pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary/10 blur-3xl" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-16">
        <Reveal from="left">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="why-title" className="mt-5 text-3xl leading-tight capitalize sm:text-4xl md:text-5xl">
            {content.title} <span className="text-primary-hover">{content.highlight}</span>
          </h2>
          <div className="mt-6 space-y-4 text-justify leading-relaxed text-ink-muted hyphens-auto">
            {content.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>
          <AppLink
            to={content.action.to}
            className="group btn-shine mt-8 inline-flex items-center gap-2 rounded-md bg-secondary px-7 py-3.5 font-heading font-semibold text-white transition hover:bg-secondary-dark hover:text-white"
          >
            {content.action.label}
            <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
          </AppLink>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {content.features.map((feature, i) => (
            <li key={feature.title} className={i % 2 === 1 ? 'lg:translate-y-10' : 'lg:-translate-y-2'}>
              <Reveal delay={i * 100} className="h-full">
                <WhyFeatureCard feature={feature} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
