import { purposeContent as content } from '@/features/about/data/storyContent'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { MottoCard } from './MottoCard'
import { PurposeCard } from './PurposeCard'

// Bento: mission (7 cols) + motto (5 cols), then vision full width with the photo on the other side.
export function PurposeSection() {
  const [ref, doodle] = useDoodleBackground()

  return (
    <section ref={ref} aria-labelledby="purpose-title" className={`relative overflow-hidden bg-surface-muted py-20 md:py-28 ${doodle}`}>
      <span aria-hidden="true" className="parallax-up pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary/10 blur-3xl" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="purpose-title" className="mt-5 text-3xl leading-tight md:text-5xl">
            {content.title} <span className="text-primary-hover">{content.highlight}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12">
          <Reveal from="left" className="lg:col-span-7">
            <PurposeCard item={content.mission} layout="portrait" />
          </Reveal>
          <Reveal from="right" delay={100} className="lg:col-span-5">
            <MottoCard motto={content.motto} />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-12">
            <PurposeCard item={content.vision} layout="landscape" />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
