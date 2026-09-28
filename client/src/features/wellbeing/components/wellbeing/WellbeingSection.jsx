import { wellbeingContent as content } from '@/features/wellbeing/data/wellbeingContent'
import { ArrowRightIcon, HeartIcon } from '@/shared/components/icons'
import { AppLink, Container, Reveal, SectionEyebrow } from '@/shared/components/ui'

// Navy band: copy left, group photo right with a floating "confidential" badge; photo zooms on hover.
export function WellbeingSection() {
  const { image } = content

  return (
    <section id="student-wellbeing" aria-labelledby="wellbeing-title" className="relative isolate scroll-mt-24 overflow-hidden bg-secondary py-20 md:py-28">
      <span aria-hidden="true" className="parallax-up pointer-events-none absolute -top-32 -left-24 -z-10 size-96 rounded-full bg-primary/20 blur-3xl" />

      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal from="left">
          <SectionEyebrow tone="light">{content.eyebrow}</SectionEyebrow>
          <h2 id="wellbeing-title" className="mt-5 text-3xl leading-tight text-white md:text-5xl">
            {content.title} <span className="text-primary">{content.highlight}</span>
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-white/75">
            {content.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>
          <AppLink
            to={content.action.to}
            className="group btn-shine mt-9 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-heading font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary"
          >
            {content.action.label}
            <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
          </AppLink>
        </Reveal>

        <Reveal from="right" delay={100} className="relative">
          <div className="group relative aspect-3/2 overflow-hidden rounded-3xl shadow-elevated ring-1 ring-white/10">
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes="(min-width: 1024px) 600px, 100vw"
              alt={image.alt}
              width="1500"
              height="1000"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition duration-1000 ease-out group-hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-surface px-5 py-3 shadow-elevated">
            <span className="grid size-10 place-items-center rounded-full bg-primary text-on-primary">
              <HeartIcon className="size-5" />
            </span>
            <p className="font-heading text-sm font-bold text-secondary">Confidential &amp; supportive</p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
