import { useSuspenseQuery } from '@tanstack/react-query'
import { adminCoursesQuery } from '../api/courseAdminQueries'

// Course list for the dashboard table + per-market counts for the tabs.
export function useAdminCourses(filters) {
  const { data } = useSuspenseQuery(adminCoursesQuery(filters))
  return { courses: data.data, counts: data.meta.counts }
}
