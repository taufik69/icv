import { BadgeCheckIcon } from '@/shared/components/icons'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { legal } from '@/shared/config/footer'

// Navy band with the legal entity and its registration numbers (same source as the footer).
export function RegistrationBand() {
  return (
    <section aria-labelledby="registration-title" className="relative isolate overflow-hidden bg-secondary py-16 md:py-20">
      <span aria-hidden="true" className="parallax-up pointer-events-none absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-primary/20 blur-3xl" />
      <Container className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal from="left">
          <SectionEyebrow tone="light">Registration</SectionEyebrow>
          <h2 id="registration-title" className="mt-5 text-2xl leading-snug text-white md:text-3xl">
            {legal.entity}
          </h2>
        </Reveal>

        <Reveal from="right" delay={100}>
          <ul className="grid gap-3 sm:grid-cols-3">
            {legal.ids.map((id) => {
              const [label, ...rest] = id.split(' ')
              return (
                <li key={id} className="flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10 transition hover:bg-white/10 hover:ring-primary/50">
                  <BadgeCheckIcon className="size-6 shrink-0 text-primary" />
                  <div>
                    <p className="font-condensed text-xs tracking-[0.2em] text-white/60 uppercase">{label}</p>
                    <p className="font-heading font-bold text-white">{rest.join(' ')}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
