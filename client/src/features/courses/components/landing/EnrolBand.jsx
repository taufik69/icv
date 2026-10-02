import { ArrowUpRightIcon, GraduationCapIcon } from '@/shared/components/icons'
import { AppLink, Container, Reveal } from '@/shared/components/ui'
import { titleCase } from '../../lib/titleCase'

// Navy band: the offer on the left (heading, line, Enquire), and "Launch your career" on the right as a
// card of benefit tiles, each with its own icon; an odd last tile spans the row. The live site's copy is
// all caps; it is shown in title case here, words unchanged.
export function EnrolBand({ enrol }) {
  const odd = enrol.list.length % 2 === 1
  return (
    <section aria-labelledby="enrol-title" className="relative isolate overflow-hidden bg-secondary py-16 md:py-24">
      <span aria-hidden="true" className="parallax-up pointer-events-none absolute -bottom-32 -left-24 -z-10 size-96 rounded-full bg-white/5 blur-3xl" />
      <span aria-hidden="true" className="parallax-down pointer-events-none absolute -top-40 right-0 -z-10 size-96 rounded-full bg-sky/10 blur-3xl" />
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal from="left">
          <span aria-hidden="true" className="block h-1 w-14 rounded-pill bg-primary" />
          <h2 id="enrol-title" className="mt-6 max-w-lg font-heading text-4xl leading-[1.1] font-extrabold text-white md:text-5xl">
            {titleCase(enrol.title)}
          </h2>
          <p className="mt-5 max-w-md text-left text-lg leading-relaxed text-white/90">{enrol.subtitle}</p>
          <AppLink
            href={enrol.action.href}
            className="group btn-shine mt-9 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-3.5 font-heading font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary"
          >
            {titleCase(enrol.action.label)}
            <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </AppLink>
        </Reveal>

        <Reveal from="right" delay={100}>
          <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-md sm:p-7 md:p-8">
            <h3 className="flex items-center gap-3 font-heading text-xl leading-snug font-bold text-white md:text-2xl">
              <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-secondary">
                <GraduationCapIcon className="size-5.5" />
              </span>
              {titleCase(enrol.launchTitle)}
            </h3>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {enrol.list.map(({ text, Icon }, i) => (
                <li
                  key={text}
                  className={`group flex items-center gap-3.5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:ring-white/25 ${odd && i === enrol.list.length - 1 ? 'sm:col-span-2' : ''}`}
                >
                  <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-white transition group-hover:bg-white group-hover:text-secondary">
                    <Icon className="size-5" />
                  </span>
                  <span className="font-heading leading-snug font-semibold text-white">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
