import { useState } from 'react'
import { Container, Reveal } from '@/shared/components/ui'
import { CourseCard } from './CourseCard'

// Optional category filter chips (scroll sideways on phones) over a 1 → 2 → 3 column card grid.
export function CoursesGrid({ content }) {
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? content.items : content.items.filter((c) => c.category === filter)
  const hasFilters = content.filters?.length > 0

  return (
    <section id="courses" aria-labelledby="dom-courses-title" className="scroll-mt-24 bg-surface-muted py-16 md:py-24">
      <Container>
        <Reveal className="text-center">
          <h2 id="dom-courses-title" className="text-3xl md:text-5xl">{content.title}</h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-16 rounded-pill bg-primary" />
        </Reveal>

        {hasFilters && (
        <div role="group" aria-label={content.title} className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:px-0">
          {content.filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 rounded-pill px-5 py-2.5 font-condensed text-sm font-bold tracking-wider ring-1 transition ${filter === f.id ? 'bg-secondary text-white ring-secondary shadow-brand' : 'bg-surface text-secondary ring-line hover:ring-primary'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        )}

        <ul aria-live="polite" className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((course, i) => (
            <li key={course.code} className="motion-safe:animate-[fade-in_400ms_ease-out_both]">
              <Reveal delay={(i % 3) * 100} className="h-full">
                <CourseCard course={course} apply={content.apply} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
