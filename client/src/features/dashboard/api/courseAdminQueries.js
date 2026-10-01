import { queryOptions } from '@tanstack/react-query'
import { courseAdminApi } from './courseAdminApi'
import { courseAdminKeys } from './courseAdminKeys'

// Shared by route loaders (ensureQueryData) and hooks (useSuspenseQuery).
// The list resolves to { data: courses, meta: { counts } }.
export const adminCoursesQuery = (filters = {}) =>
  queryOptions({ queryKey: courseAdminKeys.list(filters), queryFn: () => courseAdminApi.list(filters) })

export const adminCourseQuery = (market, slug) =>
  queryOptions({ queryKey: courseAdminKeys.page(market, slug), queryFn: () => courseAdminApi.getByPage(market, slug) })
