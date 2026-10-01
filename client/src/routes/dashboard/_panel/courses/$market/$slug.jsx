import { createFileRoute } from '@tanstack/react-router'
import { adminCourseQuery, CourseViewPage, CourseViewSkeleton, DashboardError } from '@/features/dashboard'

// Read-only course view, any status, from the API.
export const Route = createFileRoute('/dashboard/_panel/courses/$market/$slug')({
  loader: ({ context: { queryClient }, params }) => queryClient.ensureQueryData(adminCourseQuery(params.market, params.slug)),
  pendingComponent: CourseViewSkeleton,
  pendingMs: 150,
  pendingMinMs: 400,
  errorComponent: DashboardError,
  component: CourseViewRoute,
})

function CourseViewRoute() {
  const { market, slug } = Route.useParams()
  return <CourseViewPage market={market} slug={slug} />
}
