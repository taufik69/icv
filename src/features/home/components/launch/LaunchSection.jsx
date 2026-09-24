import { launchContent as content } from '@/features/home/data/launchContent'
import { ArrowRightIcon, CheckCircleIcon } from '@/shared/components/icons'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { RecognitionCard } from './RecognitionCard'

export function LaunchSection() {
  return (
    <section aria-labelledby="launch-title" className="bg-surface pt-20 pb-16 md:pt-28 md:pb-20">
      <Container className="grid items-center gap-14 lg:grid-cols-[7fr_5fr] lg:gap-20">
        <Reveal from="left">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="launch-title" className="mt-5 text-2xl leading-tight capitalize sm:text-3xl md:text-5xl">
            {content.title} <span className="text-primary-hover">{content.highlight}</span>
          </h2>
          <div className="mt-6 space-y-3 leading-relaxed text-ink-muted">
            {content.paragraphs.map((t) => (
              <p key={t.slice(0, 20)}>{t}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-xl bg-surface-alt px-4 py-3 text-sm font-medium text-ink ring-1 ring-line-soft">
                <CheckCircleIcon className="mt-px size-5 shrink-0 text-primary-hover" />
                {b}
              </li>
            ))}
          </ul>
          <a
            href={content.action.href}
            className="group btn-shine mt-10 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 font-heading font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary"
          >
            {content.action.label}
            <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
          </a>
        </Reveal>
        <Reveal from="right" delay={100}>
          <RecognitionCard recognition={content.recognition} />
        </Reveal>
      </Container>
    </section>
  )
}
