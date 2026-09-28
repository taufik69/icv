import { counsellorContent as content } from '@/features/wellbeing/data/wellbeingContent'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { CounsellorPortrait } from './CounsellorPortrait'
import { TagList } from './TagList'

// Tall portrait (sticky on lg) beside the counsellor's introduction and what she helps with.
export function CounsellorSection() {
  const [ref, doodle] = useDoodleBackground()

  return (
    <section
      ref={ref}
      id="counsellor"
      aria-labelledby="counsellor-title"
      className={`relative scroll-mt-24 overflow-clip bg-surface py-20 md:py-28 ${doodle}`}
    >
      <Container className="grid items-start gap-12 lg:grid-cols-[4fr_7fr] lg:gap-16">
        <Reveal from="left" className="lg:sticky lg:top-28">
          <CounsellorPortrait content={content} />
        </Reveal>

        <Reveal from="right" delay={100}>
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="counsellor-title" className="mt-5 text-3xl leading-tight md:text-5xl">
            Meet <span className="text-primary-hover">{content.name}</span>
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted">
            {content.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <TagList title={content.topicsTitle} items={content.topics} />
            <TagList title={content.formatsTitle} items={content.formats} tone="navy" />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
