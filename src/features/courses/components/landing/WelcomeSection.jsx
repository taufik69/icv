import { ArrowUpRightIcon } from '@/shared/components/icons'
import { Container, PhotoFrame, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'

export function WelcomeSection({ welcome, enquire }) {
  const [ref, doodle] = useDoodleBackground()

  return (
    <section ref={ref} aria-labelledby="welcome-title" className={`relative overflow-hidden bg-surface py-16 md:py-24 ${doodle}`}>
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal from="left">
          <PhotoFrame image={{ ...welcome.image, sizes: '(min-width: 1024px) 600px, 100vw' }} aspect="aspect-4/3" />
        </Reveal>
        <Reveal from="right" delay={100}>
          <SectionEyebrow>{welcome.eyebrow}</SectionEyebrow>
          <h2 id="welcome-title" className="mt-5 text-3xl leading-tight md:text-5xl">{welcome.title}</h2>
          {(welcome.paragraphs ?? [welcome.text]).map((t) => (
            <p key={t.slice(0, 24)} className="mt-6 text-lg leading-relaxed text-ink-muted">{t}</p>
          ))}
          <a href={enquire.href} className="group btn-shine mt-9 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 font-heading font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary">
            {enquire.label}
            <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </Container>
    </section>
  )
}
