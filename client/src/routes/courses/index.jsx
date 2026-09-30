import { createFileRoute } from '@tanstack/react-router'
import { CourseFinderPage, loadCatalogue, summariseCourse } from '@/features/courses'
import { Spinner } from '@/shared/components/ui'

const markets = ['domestic', 'international']

// Course finder. ?market=domestic|international opens on that tab.
export const Route = createFileRoute('/courses/')({
  validateSearch: (search) => ({ market: markets.includes(search.market) ? search.market : undefined }),
  loader: async () => (await loadCatalogue()).map(summariseCourse),
  pendingComponent: Spinner,
  component: CoursesRoute,
})

function CoursesRoute() {
  const { market = 'all' } = Route.useSearch()
  return <CourseFinderPage key={market} courses={Route.useLoaderData()} market={market} />
}
