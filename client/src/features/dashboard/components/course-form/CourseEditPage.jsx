import { useAdminCourse } from '../../hooks/useAdminCourse'
import { CourseFormPage } from './CourseFormPage'

// Edit form for a saved course. Keyed by id so switching courses resets the form state.
export function CourseEditPage({ market, slug }) {
  const course = useAdminCourse(market, slug)
  return <CourseFormPage key={course.id} course={course} />
}
