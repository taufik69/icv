import { createFileRoute } from '@tanstack/react-router'
import { LandingPage, loadLandingCourses, domesticContent } from '@/features/courses'
import { Spinner } from '@/shared/components/ui'

export const Route = createFileRoute('/domestic/')({
  loader: () => loadLandingCourses(domesticContent),
  pendingComponent: Spinner,
  component: DomesticPage,
})

function DomesticPage() {
  return <LandingPage content={domesticContent} summaries={Route.useLoaderData()} />
}
