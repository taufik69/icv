import { BriefcaseIcon } from "@/shared/components/icons";
import {
  Container,
  PlusCard,
  Reveal,
  SectionEyebrow,
} from "@/shared/components/ui";
import { Parts } from "../common/Parts";

// lg column count per number of job cards, picked so rows come out full (full strings for Tailwind).
const lgCols = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  4: "lg:grid-cols-4",
  8: "lg:grid-cols-4",
};

// Navy band: centred "Employment pathways" eyebrow + intro line on top, then one blueprint box per job title
// (dashed outline + corner pluses), then trailing copy (e.g. exit points) in a full-width box.
export function EmploymentSection({ employment }) {
  const [intro, jobs, ...rest] = employment.parts;
  const titles = jobs.chips;
  const cols = lgCols[titles.length] ?? "lg:grid-cols-3";

  return (
    <section
      aria-labelledby="employment-title"
      className="relative isolate overflow-hidden bg-secondary py-16 md:py-24"
    >
      <span
        aria-hidden="true"
        className="parallax-up pointer-events-none absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-white/5 blur-3xl"
      />
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow tone="light" accent="muted">
            <span id="employment-title">{employment.title}</span>
          </SectionEyebrow>
          <p className="mt-5 text-lg leading-relaxed text-white/95">{intro}</p>
        </Reveal>
        <ul className={`mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 ${cols}`}>
          {titles.map((job, i) => (
            <Reveal as="li" key={job} delay={(i % 3) * 100}>
              <PlusCard className="flex h-full min-h-36 flex-col justify-between gap-6">
                <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-white transition group-hover/plus:bg-white group-hover/plus:text-secondary">
                  <BriefcaseIcon className="size-5" />
                </span>
                <h3 className="text-xl leading-snug text-white">{job}</h3>
              </PlusCard>
            </Reveal>
          ))}
        </ul>
        {rest.length > 0 && (
          <Reveal className="mt-6">
            <PlusCard className="md:p-8">
              <div className="max-w-3xl [&>h4:first-child]:mt-0">
                <Parts parts={rest} tone="dark" />
              </div>
            </PlusCard>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
