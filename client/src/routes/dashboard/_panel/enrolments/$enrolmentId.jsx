import { createFileRoute } from '@tanstack/react-router'
import { DashboardError, enrolmentQuery, EnrolmentViewPage, EnrolmentViewSkeleton } from '@/features/dashboard'

// One enrolment application from the API (404 → the dashboard error page).
export const Route = createFileRoute('/dashboard/_panel/enrolments/$enrolmentId')({
  loader: ({ context: { queryClient }, params }) => queryClient.ensureQueryData(enrolmentQuery(params.enrolmentId)),
  pendingComponent: EnrolmentViewSkeleton,
  pendingMs: 150,
  pendingMinMs: 400,
  errorComponent: DashboardError,
  component: EnrolmentRoute,
})

function EnrolmentRoute() {
  return <EnrolmentViewPage id={Route.useParams().enrolmentId} />
}
