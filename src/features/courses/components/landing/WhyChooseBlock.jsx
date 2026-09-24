import { GraduationCapIcon, PresentationIcon, UsersIcon } from '@/shared/components/icons'
import { Container, Reveal } from '@/shared/components/ui'

const icons = [UsersIcon, GraduationCapIcon, PresentationIcon]

// "WHY CHOOSE US ?": copy + three icon tiles on the left; the original students cut-out on a soft green disc.
export function WhyChooseBlock({ why }) {
  return (
    <section aria-labelledby="why-choose-title" className="relative overflow-hidden bg-surface py-16 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <Reveal from="left">
          <h2 id="why-choose-title" className="text-3xl leading-tight md:text-5xl">{why.title}</h2>
          <span aria-hidden="true" className="mt-5 block h-1 w-16 rounded-pill bg-primary" />
          <div className="mt-6 space-y-4 leading-relaxed text-ink-muted">
            {why.paragraphs.map((t) => (
              <p key={t.slice(0, 24)}>{t}</p>
            ))}
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {why.features.map((title, i) => {
              const Icon = icons[i]
              return (
                <li key={title} className="group flex items-center gap-4 rounded-2xl bg-surface-muted p-4 ring-1 ring-line-soft transition duration-500 hover:-translate-y-1 hover:bg-secondary hover:shadow-brand sm:flex-col sm:text-center">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary text-on-primary transition duration-500 group-hover:rotate-6">
                    <Icon className="size-6" />
                  </span>
                  <span className="font-heading font-bold text-secondary transition-colors duration-500 group-hover:text-white">{title}</span>
                </li>
              )
            })}
          </ul>
        </Reveal>
        <Reveal from="right" delay={100} className="relative mx-auto w-full max-w-md">
          <span aria-hidden="true" className="absolute inset-x-6 top-10 bottom-0 rounded-full bg-primary-soft" />
          <span aria-hidden="true" className="absolute -top-2 right-2 size-24 rounded-2xl bg-[radial-gradient(var(--color-primary)_1.5px,transparent_1.5px)] bg-size-[12px_12px] opacity-40" />
          <img {...why.image} loading="lazy" decoding="async" className="relative w-full" />
        </Reveal>
      </Container>
    </section>
  )
}
