import { createFileRoute } from '@tanstack/react-router'
import { ApplicationsPage, applicationStatuses } from '@/features/dashboard'

// ?status=New&q=mia filters the demo list.
export const Route = createFileRoute('/dashboard/_panel/applications/')({
  validateSearch: (search) => ({
    status: applicationStatuses.includes(search.status) ? search.status : undefined,
    q: typeof search.q === 'string' && search.q.trim() ? search.q.trim() : undefined,
  }),
  component: ApplicationsRoute,
})

function ApplicationsRoute() {
  return <ApplicationsPage filters={Route.useSearch()} />
}
