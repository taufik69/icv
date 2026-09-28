import { createFileRoute, notFound } from '@tanstack/react-router'
import { loadCourse } from '@/features/courses'
import { CourseViewPage } from '@/features/dashboard'
import { Spinner } from '@/shared/components/ui'

// Read-only course view; reads the same course data files as the public page for now.
export const Route = createFileRoute('/dashboard/_panel/courses/$market/$slug')({
  loader: async ({ params }) => {
    const course = await loadCourse(params.market, params.slug)
    if (!course) throw notFound()
    return course
  },
  pendingComponent: Spinner,
  component: CourseViewRoute,
})

function CourseViewRoute() {
  return <CourseViewPage course={Route.useLoaderData()} />
}
