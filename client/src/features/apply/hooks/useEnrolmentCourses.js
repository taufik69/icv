import { useQuery } from '@tanstack/react-query'
import { enrolmentCoursesQuery } from '../api/enrolmentCoursesQueries'
import { toEnrolmentCourse } from '../lib/toEnrolmentCourse'

// Courses for the enrolment form, from the API. Non-blocking: the rest of the form works while it loads.
export function useEnrolmentCourses() {
  const { data, isPending, isError, refetch, isFetching } = useQuery({ ...enrolmentCoursesQuery(), select: (list) => list.map(toEnrolmentCourse) })
  return { courses: data ?? [], loading: isPending && !isError, failed: isError && !isFetching, retry: refetch }
}
