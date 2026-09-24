import { BriefcaseIcon } from '@/shared/components/icons'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { Parts } from '../common/Parts'

// Navy band: intro, job titles as a grid of icon tiles, then any trailing copy (e.g. exit points).
export function EmploymentSection({ employment }) {
  const [intro, jobs, ...rest] = employment.parts

  return (
    <section aria-labelledby="employment-title" className="relative isolate overflow-hidden bg-secondary py-16 md:py-24">
      <span aria-hidden="true" className="parallax-up pointer-events-none absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-primary/20 blur-3xl" />
      <Container>
        <Reveal className="max-w-3xl">
          <SectionEyebrow tone="light">
            <span id="employment-title">{employment.title}</span>
          </SectionEyebrow>
          <p className="mt-6 text-lg leading-relaxed text-white/80">{intro}</p>
        </Reveal>
        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.chips.map((job, i) => (
            <Reveal as="li" key={job} delay={(i % 3) * 100}>
              <div className="group flex h-full items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/10 hover:ring-primary/50">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-on-primary">
                  <BriefcaseIcon className="size-5" />
                </span>
                <span className="font-heading font-semibold text-white">{job}</span>
              </div>
            </Reveal>
          ))}
        </ul>
        {rest.length > 0 && (
          <div className="mt-10 max-w-3xl">
            <Parts parts={rest} tone="dark" />
          </div>
        )}
      </Container>
    </section>
  )
}
