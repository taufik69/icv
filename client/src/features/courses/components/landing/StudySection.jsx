import { ArrowUpRightIcon, GraduationCapIcon, HeartIcon, PenLineIcon } from '@/shared/components/icons'
import { AppLink, Container, Reveal } from '@/shared/components/ui'

const icons = [GraduationCapIcon, PenLineIcon, HeartIcon]

// Centered intro + three big link tiles (icon, label, arrow) that fill navy on hover.
export function StudySection({ study }) {
  return (
    <section aria-labelledby="study-title" className="bg-surface py-16 md:py-24">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="study-title" className="text-3xl leading-tight md:text-4xl">{study.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{study.text}</p>
        </Reveal>
        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {study.links.map((link, i) => {
            const Icon = icons[i]
            return (
              <Reveal as="li" key={link.label} delay={i * 100}>
                <AppLink
                  to={link.to}
                  href={link.href}
                  className="group flex h-full items-center gap-5 rounded-3xl bg-surface-muted p-6 ring-1 ring-line-soft transition duration-500 hover:-translate-y-1 hover:bg-secondary hover:shadow-brand"
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-on-primary transition duration-500 group-hover:rotate-6">
                    <Icon className="size-7" />
                  </span>
                  <span className="flex-1 font-heading text-lg font-bold text-secondary transition-colors duration-500 group-hover:text-white">{link.label}</span>
                  <ArrowUpRightIcon className="size-5 text-secondary transition duration-500 group-hover:text-primary" />
                </AppLink>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
