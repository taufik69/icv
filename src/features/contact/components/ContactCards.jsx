import { contactContent } from '@/features/contact/data/contactContent'
import { GlobeIcon } from '@/shared/components/icons'
import { Container, Reveal } from '@/shared/components/ui'
import { contactCards } from '@/shared/config/footer'

// Address / Phone Number / Email Address cards overlapping the banner's bottom edge. Every line is a link.
// Tablets (md–lg) stack the icon above the text so three narrow columns keep a readable line length.
export function ContactCards() {
  const cards = contactCards.map((c) => (c.title === 'Email address' ? { ...c, lines: [...c.lines, contactContent.website] } : c))

  return (
    <section aria-label="Contact details" className="relative z-10 -mt-12 md:-mt-16">
      <Container>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map(({ title, Icon, lines }, i) => (
            <Reveal as="li" key={title} delay={i * 100}>
              <div className="group flex h-full items-start gap-4 rounded-3xl bg-surface p-6 md:flex-col md:p-5 lg:flex-row lg:p-6 shadow-elevated ring-1 ring-line-soft transition duration-500 hover:-translate-y-1 hover:ring-primary">
                <span className="grid size-14 shrink-0 md:size-12 lg:size-14 place-items-center rounded-2xl bg-secondary text-primary transition duration-500 group-hover:rotate-6 group-hover:bg-primary group-hover:text-on-primary">
                  <Icon className="size-6" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-condensed text-sm font-bold tracking-[0.2em] text-ink-subtle uppercase">{title}</h2>
                  <ul className="mt-2 space-y-1">
                    {lines.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="inline-flex items-center gap-1.5 font-heading font-semibold break-words text-secondary transition hover:text-primary-hover"
                        >
                          {l.href.includes('icv.edu.au/') && <GlobeIcon className="size-4 text-primary-hover" />}
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
