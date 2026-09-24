import { ArrowUpRightIcon, PhoneIcon } from '@/shared/components/icons'
import { Container, Reveal } from '@/shared/components/ui'

// Closing call to action: headline, enquiry button, and a tap-to-call phone line.
export function ClaimCta({ claim }) {
  return (
    <section aria-labelledby="claim-title" className="bg-surface pb-16 md:pb-24">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-primary-soft px-6 py-14 text-center ring-1 ring-primary/30 md:px-16 md:py-16">
          <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(var(--color-primary)_1px,transparent_1px)] bg-size-[20px_20px] opacity-25 mask-radial-from-10% mask-radial-to-70%" />
          <h2 id="claim-title" className="font-heading text-3xl leading-tight font-extrabold md:text-5xl">{claim.title}</h2>
          <a href={claim.action.href} className="group btn-shine mt-8 inline-flex items-center gap-2 rounded-md bg-secondary px-8 py-3.5 font-heading font-semibold text-white shadow-brand transition hover:bg-secondary-dark hover:text-white">
            {claim.action.label}
            <ArrowUpRightIcon className="size-4 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <p className="mt-8 text-ink-muted">{claim.contactLead}</p>
          <a href={claim.phone.href} className="mt-2 inline-flex items-center gap-3 font-heading text-3xl font-extrabold text-secondary hover:text-primary-hover md:text-4xl">
            <span className="grid size-12 place-items-center rounded-full bg-primary text-on-primary">
              <PhoneIcon className="size-5" />
            </span>
            {claim.phone.label}
          </a>
          <p className="mt-2 text-ink-muted">{claim.contactTail}</p>
        </Reveal>
      </Container>
    </section>
  )
}
