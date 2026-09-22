import { useState } from 'react'
import { coursesContent as content } from '@/features/home/data/coursesContent'
import { ArrowRightIcon } from '@/shared/components/icons'
import { Container, Reveal } from '@/shared/components/ui'
import { CourseCard } from './CourseCard'
import { CourseFilterTabs } from './CourseFilterTabs'

export function CoursesSection() {
  const [filter, setFilter] = useState('all')
  const courses = content.courses.filter((c) => filter === 'all' || c.audience === filter)

  return (
    <section aria-labelledby="courses-title" className="bg-surface-muted py-16 md:py-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="courses-title" className="font-condensed text-3xl font-bold uppercase md:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted md:text-lg">{content.subtitle}</p>
          <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-16 rounded-full bg-primary" />
        </Reveal>

        <div className="mt-8 flex justify-center">
          <CourseFilterTabs filters={content.filters} active={filter} onChange={setFilter} />
        </div>

        {/* Mobile: swipeable snap carousel. sm+: grid. */}
        <ul className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {courses.map((course, i) => (
            <li key={course.href} className="w-[80%] shrink-0 snap-start sm:w-auto">
              <Reveal delay={(i % 4) * 100}>
                <CourseCard course={course} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <a
            href={content.viewAll.href}
            className="group btn-shine inline-flex items-center gap-2 rounded-md bg-secondary px-7 py-3.5 font-heading font-semibold text-white transition hover:bg-secondary-dark hover:text-white"
          >
            {content.viewAll.label}
            <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
          </a>
        </div>
      </Container>
    </section>
  )
}
