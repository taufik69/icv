import { useSuspenseQuery } from '@tanstack/react-query'
import { adminCourseQuery } from '../api/courseAdminQueries'

// One course (any status), by its page address.
export function useAdminCourse(market, slug) {
  return useSuspenseQuery(adminCourseQuery(market, slug)).data
}
