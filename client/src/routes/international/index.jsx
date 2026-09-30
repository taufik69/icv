import { createFileRoute } from '@tanstack/react-router'
import { LandingPage, loadLandingCourses, internationalContent } from '@/features/courses'
import { Spinner } from '@/shared/components/ui'

export const Route = createFileRoute('/international/')({
  loader: () => loadLandingCourses(internationalContent),
  pendingComponent: Spinner,
  component: InternationalPage,
})

function InternationalPage() {
  return <LandingPage content={internationalContent} summaries={Route.useLoaderData()} />
}
