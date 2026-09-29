import { useCallback, useState } from 'react'
import { Container } from '@/shared/components/ui'
import { finderContent as content } from '../../data/finderContent'
import { useCourseFinder } from '../../hooks/useCourseFinder'
import { ActiveFilters } from './ActiveFilters'
import { EmptyResults } from './EmptyResults'
import { FilterPanel } from './FilterPanel'
import { FilterSheet } from './FilterSheet'
import { FinderCard } from './FinderCard'
import { FinderHero } from './FinderHero'
import { ResultsBar } from './ResultsBar'
import { SearchBar } from './SearchBar'

// /courses: hero with study-area shortcuts, search, filters (sidebar on lg+, sheet below), sortable card grid.
export function CourseFinderPage({ courses, market }) {
  const finder = useCourseFinder(courses, market)
  const [sheetOpen, setSheetOpen] = useState(false)
  const closeSheet = useCallback(() => setSheetOpen(false), [])
  const { saved } = finder

  return (
    <>
      <FinderHero content={content} finder={finder} />
      <section aria-label="Courses" className="overflow-clip bg-surface-muted pt-8 pb-20 md:pt-10">
        <Container>
          <SearchBar content={content} finder={finder} onOpenFilters={() => setSheetOpen(true)} />
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] xl:gap-12">
            <aside aria-label="Filters" className="hidden lg:block">
              <div className="sticky top-28">
                <FilterPanel content={content} finder={finder} />
              </div>
            </aside>

            <div className="min-w-0">
              <ResultsBar content={content} finder={finder} total={courses.length} />
              <ActiveFilters content={content} finder={finder} />
              {finder.results.length ? (
                <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {finder.results.map((course) => (
                    <li key={course.id}>
                      <FinderCard
                        course={course}
                        marketName={content.marketNames[course.market]}
                        saved={saved.isSaved(course.id)}
                        onToggleSave={() => saved.toggle(course.id)}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-6">
                  <EmptyResults content={finder.savedOnly ? content.emptySaved : content.empty} onClear={finder.clear} />
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
      {sheetOpen && <FilterSheet content={content} finder={finder} onClose={closeSheet} />}
    </>
  )
}
