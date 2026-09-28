import { historyContent as content } from '@/features/about/data/storyContent'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { HistoryMedia } from './HistoryMedia'

export function HistorySection() {
  const [ref, doodle] = useDoodleBackground()

  return (
    <section ref={ref} aria-labelledby="history-title" className={`relative overflow-hidden bg-surface py-20 md:py-28 ${doodle}`}>
      <Container className="grid items-center gap-14 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <Reveal from="left">
          <HistoryMedia image={content.image} badge={content.badge} />
        </Reveal>
        <Reveal from="right" delay={100}>
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="history-title" className="mt-5 text-3xl leading-tight md:text-5xl">
            {content.title} <span className="text-primary-hover">{content.highlight}</span>
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-muted">
            {content.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
