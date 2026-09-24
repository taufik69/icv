import { accreditationContent as content } from '@/features/about/data/aboutContent'
import { BadgeCheckIcon } from '@/shared/components/icons'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'

// Official logos sit on white (they're artwork on white); registration numbers as tiles.
export function AccreditationSection() {
  return (
    <section aria-labelledby="accreditation-title" className="bg-surface py-20 md:py-24">
      <Container>
        <Reveal className="relative grid items-center gap-10 overflow-hidden rounded-3xl bg-surface p-6 shadow-card ring-1 ring-line-soft md:p-12 lg:grid-cols-[6fr_5fr] lg:gap-16">
          <span aria-hidden="true" className="pointer-events-none absolute -top-20 -left-20 size-64 rounded-full bg-primary-soft blur-2xl" />
          <div className="relative">
            <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
            <h2 id="accreditation-title" className="mt-5 text-2xl leading-snug md:text-4xl">
              {content.title}
            </h2>
            <p className="mt-4 leading-relaxed text-ink-muted">{content.text}</p>
            <img
              src={content.logo.src}
              alt={content.logo.alt}
              width="600"
              height="160"
              loading="lazy"
              decoding="async"
              className="mt-8 h-auto w-full max-w-md"
            />
          </div>

          <dl className="relative grid gap-3">
            {content.ids.map((id) => (
              <div key={id.label} className="flex items-center gap-4 rounded-2xl bg-surface-muted px-5 py-4 ring-1 ring-line-soft">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-on-primary">
                  <BadgeCheckIcon className="size-5" />
                </span>
                <div className="flex flex-col-reverse">
                  <dt className="font-condensed text-xs tracking-widest text-ink-subtle uppercase">{id.label}</dt>
                  <dd className="font-heading text-xl font-bold text-secondary md:text-2xl">{id.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  )
}
