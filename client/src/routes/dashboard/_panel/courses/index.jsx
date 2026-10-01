import { createFileRoute } from '@tanstack/react-router'
import { adminCoursesQuery, CoursesPage, CoursesSkeleton, DashboardError } from '@/features/dashboard'

const MARKETS = ['domestic', 'international']

const parseSearch = (search) => ({
  market: MARKETS.includes(search.market) ? search.market : undefined,
  q: typeof search.q === 'string' && search.q.trim() ? search.q.trim() : undefined,
})

// ?market=domestic&q=cert filters the list (server-side). The loader only warms the first visit; later tab and
// search changes are fetched by the page itself (no loaderDeps), so typing never swaps the page for a skeleton.
export const Route = createFileRoute('/dashboard/_panel/courses/')({
  validateSearch: parseSearch,
  loader: ({ context: { queryClient }, location }) => queryClient.ensureQueryData(adminCoursesQuery(parseSearch(location.search))),
  pendingComponent: CoursesSkeleton,
  // Show the skeleton quickly on a slow load, and long enough not to flicker.
  pendingMs: 150,
  pendingMinMs: 400,
  errorComponent: DashboardError,
  component: CoursesRoute,
})

function CoursesRoute() {
  return <CoursesPage filters={Route.useSearch()} />
}
