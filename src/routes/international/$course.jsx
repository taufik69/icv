import { createFileRoute, notFound } from '@tanstack/react-router'
import { CoursePage, loadCourse } from '@/features/courses'
import { Spinner } from '@/shared/components/ui'

// Course data is code-split per course; unknown slugs fall through to the root NotFound.
export const Route = createFileRoute('/international/$course')({
  loader: async ({ params }) => {
    const course = await loadCourse('international', params.course)
    if (!course) throw notFound()
    return course
  },
  pendingComponent: Spinner,
  component: CourseRoute,
})

function CourseRoute() {
  return <CoursePage course={Route.useLoaderData()} />
}
