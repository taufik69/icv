import { createFileRoute } from '@tanstack/react-router'
import { EnrolmentPage } from '@/features/apply'

// Enrolment application (international). ?course=<code> pre-selects that course in the dropdown
// (the list comes from the API, so any course-code-shaped value is accepted here).
export const Route = createFileRoute('/apply')({
  validateSearch: (search) => ({
    course: /^[A-Z]{3}\d{5}$/.test(search.course ?? '') ? search.course : undefined,
  }),
  component: ApplyRoute,
})

function ApplyRoute() {
  const { course } = Route.useSearch()
  return <EnrolmentPage course={course} />
}
