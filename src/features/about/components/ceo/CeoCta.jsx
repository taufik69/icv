import { ceoCta as content } from '@/features/about/data/ceoContent'
import { ArrowRightIcon } from '@/shared/components/icons'
import { AppLink, Container, Reveal } from '@/shared/components/ui'

// Closing call to action, echoing the quote ("where you are going").
export function CeoCta() {
  return (
    <section aria-labelledby="ceo-cta-title" className="bg-surface py-16 md:py-20">
      <Container>
        <Reveal className="relative flex flex-col items-start gap-8 overflow-hidden rounded-3xl bg-secondary p-8 shadow-brand md:flex-row md:items-center md:justify-between md:p-12">
          <span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative max-w-xl">
            <h2 id="ceo-cta-title" className="text-3xl leading-tight text-white md:text-4xl">
              {content.title}
            </h2>
            <p className="mt-3 leading-relaxed text-white/75">{content.text}</p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <a
              href={content.primary.href}
              className="group btn-shine inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-heading font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary"
            >
              {content.primary.label}
              <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
            </a>
            <AppLink
              to={content.secondary.to}
              className="btn-shine inline-flex items-center rounded-md px-7 py-3.5 font-heading font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10 hover:text-white"
            >
              {content.secondary.label}
            </AppLink>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
