import { domesticContent } from '@/features/domestic/data/domesticContent'
import { ArrowUpRightIcon, CheckCircleIcon } from '@/shared/components/icons'
import { Container, Reveal } from '@/shared/components/ui'

const { enrol } = domesticContent

// Navy band: big "risk free" statement on the left, launch-your-career checklist card on the right.
export function EnrolBand() {
  return (
    <section aria-labelledby="enrol-title" className="relative isolate overflow-hidden bg-secondary py-16 md:py-24">
      <span aria-hidden="true" className="parallax-up pointer-events-none absolute -bottom-32 -left-24 -z-10 size-96 rounded-full bg-primary/25 blur-3xl" />
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal from="left">
          <h2 id="enrol-title" className="font-heading text-4xl leading-tight font-extrabold text-white md:text-6xl">{enrol.title}</h2>
          <p className="mt-6 max-w-lg text-xl leading-relaxed text-white/80">{enrol.subtitle}</p>
          <a href={enrol.action.href} className="group btn-shine mt-9 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 font-heading font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary">
            {enrol.action.label}
            <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
        <Reveal from="right" delay={100}>
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-md md:p-9">
            <h3 className="font-condensed text-xl font-bold tracking-[0.15em] text-primary">{enrol.launchTitle}</h3>
            <ul className="mt-6 grid gap-3">
              {enrol.list.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3 font-medium text-white ring-1 ring-white/10">
                  <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
