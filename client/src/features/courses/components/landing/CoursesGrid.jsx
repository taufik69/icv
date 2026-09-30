import { useState } from 'react'
import { Container, Reveal } from '@/shared/components/ui'
import { finderContent } from '../../data/finderContent'
import { useSavedCourses } from '../../hooks/useSavedCourses'
import { FinderCard } from '../finder/FinderCard'
import { CourseCard } from './CourseCard'

const summaryFor = (summaries, course) => summaries?.[course.to?.slice(1)]
// Four cards sit in one row (xl) or 2 × 2 instead of leaving a lone card on a second row of three.
const columns = (count) => (count === 4 ? 'sm:grid-cols-2 xl:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3')

// Optional category filter chips (scroll sideways on phones) over a 1 → 2 → 3 column card grid. Courses with a
// loaded summary use the course finder card (facts, fee, save, View course → detail page); others the photo card.
export function CoursesGrid({ content, summaries }) {
  const saved = useSavedCourses()
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? content.items : content.items.filter((c) => c.category === filter)
  const hasFilters = content.filters?.length > 0

  return (
    <section id="courses" aria-labelledby="dom-courses-title" className="scroll-mt-24 bg-surface-muted py-16 md:py-24">
      <Container>
        <Reveal className="text-center">
          <h2 id="dom-courses-title" className="text-3xl md:text-5xl">{content.title}</h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-16 rounded-pill bg-secondary" />
        </Reveal>

        {hasFilters && (
        <div role="group" aria-label={content.title} className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:px-0">
          {content.filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 rounded-pill px-5 py-2.5 font-condensed text-sm font-bold tracking-wider ring-1 transition ${filter === f.id ? 'bg-secondary text-white ring-secondary shadow-brand' : 'bg-surface text-secondary ring-line hover:ring-secondary/40'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        )}

        <ul aria-live="polite" className={`mt-10 grid grid-cols-1 gap-6 ${columns(shown.length)}`}>
          {shown.map((course, i) => {
            const summary = summaryFor(summaries, course)
            return (
              <li key={course.code} className="motion-safe:animate-[fade-in_400ms_ease-out_both]">
                <Reveal delay={(i % 3) * 100} className="h-full">
                  {summary ? (
                    <FinderCard
                      course={summary}
                      marketName={finderContent.marketNames[summary.market]}
                      saved={saved.isSaved(summary.id)}
                      onToggleSave={() => saved.toggle(summary.id)}
                    />
                  ) : (
                    <CourseCard course={course} apply={content.apply} />
                  )}
                </Reveal>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
