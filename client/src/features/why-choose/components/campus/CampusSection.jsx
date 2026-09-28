import { campusContent as content } from '@/features/why-choose/data/campusContent'
import { MapPinIcon } from '@/shared/components/icons'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { CampusPhoto } from './CampusPhoto'

// Doodle-pattern section (as on icv.edu.au): Melbourne photo + campus story.
export function CampusSection() {
  const [ref, doodle] = useDoodleBackground()

  return (
    <section ref={ref} aria-labelledby="campus-title" className={`relative overflow-hidden bg-surface py-20 md:py-28 ${doodle}`}>
      <Container className="grid items-center gap-12 lg:grid-cols-[6fr_5fr] lg:gap-16">
        <Reveal from="left">
          <CampusPhoto image={content.image} />
        </Reveal>

        <Reveal from="right" delay={100}>
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="campus-title" className="mt-5 text-3xl leading-tight md:text-5xl">
            {content.title} <span className="text-primary-hover">{content.highlight}</span>
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-muted">
            {content.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>
          <p className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-surface px-5 py-3 text-sm font-semibold text-secondary shadow-raised ring-1 ring-line-soft">
            <MapPinIcon className="size-5 shrink-0 text-primary-hover" />
            {content.address}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
