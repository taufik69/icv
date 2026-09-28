import { useState } from 'react'
import { coursesContent as content } from '@/features/home/data/coursesContent'
import { bentoLayout } from '@/features/home/lib/bentoLayout'
import { ArrowRightIcon } from '@/shared/components/icons'
import { AppLink, Container, Reveal } from '@/shared/components/ui'
import { CourseCard } from './CourseCard'
import { CourseFilterTabs } from './CourseFilterTabs'

export function CoursesSection() {
  const [filter, setFilter] = useState('all')
  const courses = content.courses.filter((c) => filter === 'all' || c.audience === filter)
  const layout = bentoLayout(courses.length)

  return (
    <section id="courses" aria-labelledby="courses-title" className="scroll-mt-20 bg-surface-muted py-16 md:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="courses-title" className="font-condensed text-2xl font-bold uppercase sm:text-3xl md:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted md:text-lg">{content.subtitle}</p>
          <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-16 rounded-full bg-primary" />
        </Reveal>

        <div className="mt-8 flex justify-center">
          <CourseFilterTabs filters={content.filters} active={filter} onChange={setFilter} />
        </div>

        {/* Mobile: swipeable snap carousel. sm+: bento grid (spans from bentoLayout). */}
        <ul className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-flow-row-dense sm:auto-rows-[20rem] sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:auto-rows-[17rem] lg:grid-cols-4">
          {courses.map((course, i) => (
            <li key={course.code + course.title} className={`w-[80%] shrink-0 snap-start sm:w-auto ${layout[i].span}`}>
              <Reveal delay={(i % 4) * 100} className="h-full">
                <CourseCard course={course} featured={layout[i].featured} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <AppLink
            to={content.viewAll.to}
            className="group btn-shine inline-flex items-center gap-2 rounded-md bg-secondary px-7 py-3.5 font-heading font-semibold text-white transition hover:bg-secondary-dark hover:text-white"
          >
            {content.viewAll.label}
            <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
          </AppLink>
        </div>
      </Container>
    </section>
  )
}
