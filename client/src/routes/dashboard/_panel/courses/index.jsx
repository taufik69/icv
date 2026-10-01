import { createFileRoute } from '@tanstack/react-router'
import { adminCoursesQuery, CoursesPage, CoursesSkeleton, DashboardError } from '@/features/dashboard'

const MARKETS = ['domestic', 'international']

// ?market=domestic&q=cert filters the list (server-side).
export const Route = createFileRoute('/dashboard/_panel/courses/')({
  validateSearch: (search) => ({
    market: MARKETS.includes(search.market) ? search.market : undefined,
    q: typeof search.q === 'string' && search.q.trim() ? search.q.trim() : undefined,
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ context: { queryClient }, deps }) => queryClient.ensureQueryData(adminCoursesQuery(deps)),
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
