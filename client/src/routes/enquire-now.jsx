import { createFileRoute } from '@tanstack/react-router'
import { ApplyPage, courseOptions } from '@/features/apply'

// ?course=<code> pre-selects a course (course pages link here with their code).
export const Route = createFileRoute('/enquire-now')({
  validateSearch: (search) => ({
    course: courseOptions.some((c) => c.code === search.course) ? search.course : undefined,
  }),
  component: EnquireRoute,
})

function EnquireRoute() {
  const { course } = Route.useSearch()
  return <ApplyPage initial={course ? { course } : undefined} />
}
