import { createFileRoute } from '@tanstack/react-router'
import { adminCourseQuery, CourseEditPage, CourseFormSkeleton, DashboardError } from '@/features/dashboard'

// Edit form for one course (not nested under the view route, hence `$slug_`).
export const Route = createFileRoute('/dashboard/_panel/courses/$market/$slug_/edit')({
  loader: ({ context: { queryClient }, params }) => queryClient.ensureQueryData(adminCourseQuery(params.market, params.slug)),
  pendingComponent: CourseFormSkeleton,
  pendingMs: 150,
  pendingMinMs: 400,
  errorComponent: DashboardError,
  component: CourseEditRoute,
})

function CourseEditRoute() {
  const { market, slug } = Route.useParams()
  return <CourseEditPage market={market} slug={slug} />
}
