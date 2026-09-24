import { ArrowUpRightIcon } from '@/shared/components/icons'
import { Breadcrumbs } from '@/shared/components/layout'
import { Container } from '@/shared/components/ui'

const MARKETS = { domestic: 'Domestic', international: 'International' }
const btn = 'group btn-shine inline-flex items-center gap-2 rounded-md px-7 py-3.5 font-heading font-semibold transition'

// Full-bleed course photo (LCP) under a left-weighted navy scrim; code + category chips, title, tagline, actions.
export function CourseHero({ course }) {
  const { hero } = course.images
  const [primary, secondary] = course.actions

  return (
    <section aria-labelledby="course-title" className="relative isolate overflow-hidden bg-secondary-dark">
      <img {...hero} sizes="100vw" fetchPriority="high" className="absolute inset-0 -z-10 size-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-secondary-dark via-secondary-dark/80 to-secondary-dark/20" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-linear-to-t from-secondary-dark to-transparent" />

      <Container className="flex min-h-[34rem] flex-col justify-end pt-32 pb-14 md:min-h-[40rem] md:pt-40 md:pb-20">
        <Breadcrumbs trail={[{ label: MARKETS[course.market], to: `/${course.market}` }]} current={course.code} />
        <div className="mt-8 max-w-3xl motion-safe:animate-[fade-in_700ms_ease-out]">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-primary px-3 py-1 font-heading text-sm font-bold text-on-primary">{course.code}</span>
            <span className="rounded-md bg-white/10 px-3 py-1 font-condensed text-sm tracking-[0.15em] text-white uppercase ring-1 ring-white/20 backdrop-blur-md">{course.category}</span>
          </div>
          <h1 id="course-title" className="mt-5 text-4xl leading-tight text-white md:text-6xl">{course.title}</h1>
          {course.tagline && <p className="mt-4 font-heading text-xl font-semibold text-primary md:text-2xl">{course.tagline}</p>}
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={primary.href} target="_blank" rel="noopener noreferrer" className={`${btn} bg-primary text-on-primary hover:bg-primary-hover hover:text-on-primary`}>
              {primary.label}
              <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href={secondary.href} className={`${btn} text-white ring-1 ring-white/40 hover:bg-white/10 hover:text-white`}>
              {secondary.label}
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
