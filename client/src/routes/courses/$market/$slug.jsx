import { createFileRoute, notFound } from '@tanstack/react-router'
import { CourseDetailPage, loadCatalogue, loadCourse, summariseCourse } from '@/features/courses'
import { Spinner } from '@/shared/components/ui'

// Course detail in the course-finder style; the catalogue feeds student types and related courses.
export const Route = createFileRoute('/courses/$market/$slug')({
  loader: async ({ params }) => {
    const [course, all] = await Promise.all([loadCourse(params.market, params.slug), loadCatalogue()])
    if (!course) throw notFound()
    return { course, summary: summariseCourse(course), catalogue: all.map(summariseCourse) }
  },
  pendingComponent: Spinner,
  component: CourseDetailRoute,
})

function CourseDetailRoute() {
  const { course, summary, catalogue } = Route.useLoaderData()
  return <CourseDetailPage course={course} summary={summary} catalogue={catalogue} />
}
