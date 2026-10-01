import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { adminCoursesQuery } from '../api/courseAdminQueries'

// Course list for the dashboard table + per-market counts for the tabs. While a new tab or search loads, the
// previous results stay on screen (`updating`) instead of suspending the page; errors go to the route's errorComponent.
export function useAdminCourses(filters) {
  const query = useQuery({ ...adminCoursesQuery(filters), placeholderData: keepPreviousData, throwOnError: true })
  return {
    courses: query.data?.data ?? [],
    counts: query.data?.meta.counts ?? {},
    loading: query.isPending,
    updating: query.isPlaceholderData,
  }
}
