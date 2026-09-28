import { createFileRoute, notFound } from '@tanstack/react-router'
import { ApplicationViewPage, findApplication } from '@/features/dashboard'

// Demo lookup (UI only).
export const Route = createFileRoute('/dashboard/_panel/applications/$applicationId')({
  loader: ({ params }) => {
    const item = findApplication(params.applicationId)
    if (!item) throw notFound()
    return item
  },
  component: ApplicationRoute,
})

function ApplicationRoute() {
  return <ApplicationViewPage item={Route.useLoaderData()} />
}
