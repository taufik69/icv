import { createFileRoute } from '@tanstack/react-router'
import { applicationQuery, ApplicationViewPage, ApplicationViewSkeleton, DashboardError } from '@/features/dashboard'

// One course enquiry from the API (404 → the dashboard error page).
export const Route = createFileRoute('/dashboard/_panel/enquiries/$enquiryId')({
  loader: ({ context: { queryClient }, params }) => queryClient.ensureQueryData(applicationQuery(params.enquiryId)),
  pendingComponent: ApplicationViewSkeleton,
  pendingMs: 150,
  pendingMinMs: 400,
  errorComponent: DashboardError,
  component: EnquiryRoute,
})

function EnquiryRoute() {
  return <ApplicationViewPage id={Route.useParams().enquiryId} />
}
