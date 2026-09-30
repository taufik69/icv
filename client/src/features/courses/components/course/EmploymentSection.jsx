import { BriefcaseIcon } from '@/shared/components/icons'
import { Container, PlusCard, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { Parts } from '../common/Parts'

// The intro card spans as many rows as the job cards take (two per row at lg). Full strings for Tailwind.
const introRows = ['lg:row-span-1', 'lg:row-span-1', 'lg:row-span-2', 'lg:row-span-3', 'lg:row-span-4']

// Navy band as a blueprint bento: tall intro card | job title cards (two per row, an odd last one spans both),
// then trailing copy (e.g. exit points) in a full-width card. Cards: dashed outline + corner pluses.
export function EmploymentSection({ employment }) {
  const [intro, jobs, ...rest] = employment.parts
  const titles = jobs.chips
  const rows = introRows[Math.min(Math.ceil(titles.length / 2), 4)]

  return (
    <section aria-labelledby="employment-title" className="relative isolate overflow-hidden bg-secondary py-16 md:py-24">
      <span aria-hidden="true" className="parallax-up pointer-events-none absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-white/5 blur-3xl" />
      <Container>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal as="li" className={`sm:col-span-2 lg:col-span-1 ${rows}`}>
            <PlusCard className="flex h-full flex-col justify-between gap-8 md:p-8">
              <SectionEyebrow tone="light" accent="muted" className="self-start">
                <span id="employment-title">{employment.title}</span>
              </SectionEyebrow>
              <p className="text-lg leading-relaxed text-white/90">{intro}</p>
            </PlusCard>
          </Reveal>
          {titles.map((job, i) => (
            <Reveal as="li" key={job} delay={(i % 2) * 100} className={i === titles.length - 1 && titles.length % 2 ? 'lg:col-span-2' : ''}>
              <PlusCard className="flex h-full min-h-36 flex-col justify-between gap-6">
                <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-white transition group-hover/plus:bg-white group-hover/plus:text-secondary">
                  <BriefcaseIcon className="size-5" />
                </span>
                <h3 className="text-xl leading-snug text-white">{job}</h3>
              </PlusCard>
            </Reveal>
          ))}
          {rest.length > 0 && (
            <Reveal as="li" className="sm:col-span-2 lg:col-span-3">
              <PlusCard className="md:p-8">
                <div className="max-w-3xl [&>h4:first-child]:mt-0">
                  <Parts parts={rest} tone="dark" />
                </div>
              </PlusCard>
            </Reveal>
          )}
        </ul>
      </Container>
    </section>
  )
}
