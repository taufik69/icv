import { useQuery } from '@tanstack/react-query'
import { popularCoursesQuery } from '../api/popularCoursesQueries'
import { coursesContent } from '../data/coursesContent'
import { toHomeCourse } from '../lib/toHomeCourse'

// "Our popular courses" from the API. The home page never waits on it: cards show placeholders while it
// loads, and if the API can't be reached the built-in list is shown instead so the section never breaks.
export function usePopularCourses() {
  const { data, isPending, isError } = useQuery(popularCoursesQuery())
  if (isError) return { courses: coursesContent.courses, loading: false }
  return { courses: data?.map(toHomeCourse).filter((c) => c.image) ?? [], loading: isPending }
}
