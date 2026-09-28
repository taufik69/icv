import { MailIcon, PhoneIcon } from '@/shared/components/icons'
import { Container } from './Container'
import { Reveal } from './Reveal'

const icons = { phone: PhoneIcon, mail: MailIcon }

// Closing contact band: soft green panel with call / email buttons. actions = [{ label, href, kind: 'phone' | 'mail' }].
export function ContactCta({ id, content, className = 'bg-surface pb-20 md:pb-28' }) {
  return (
    <section aria-labelledby={id} className={className}>
      <Container>
        <Reveal className="relative flex flex-col gap-8 overflow-hidden rounded-3xl bg-primary-soft p-8 ring-1 ring-primary/30 md:flex-row md:items-center md:justify-between md:p-12">
          <span aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative max-w-xl">
            <h2 id={id} className="text-3xl leading-tight md:text-4xl">
              {content.title}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{content.text}</p>
          </div>
          <div className="relative flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            {content.actions.map(({ label, href, kind }) => {
              const Icon = icons[kind]
              return (
                <a
                  key={href}
                  href={href}
                  className="btn-shine inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-6 py-3.5 font-heading font-semibold text-white shadow-brand transition hover:bg-secondary-dark hover:text-white"
                >
                  <Icon className="size-4 text-primary" />
                  {label}
                </a>
              )
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
