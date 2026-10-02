import { keepPreviousData, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { enrolmentCountsQuery, enrolmentQuery, enrolmentsQuery } from '../api/enrolmentAdminQueries'

// List page: rows, paging and per-status counts. Like applications, a new tab, search or page keeps the
// old rows on screen (`updating`) instead of suspending the page; errors go to the route's errorComponent.
export function useEnrolments(filters) {
  const query = useQuery({ ...enrolmentsQuery(filters), placeholderData: keepPreviousData, throwOnError: true })
  const meta = query.data?.meta
  return {
    items: query.data?.data ?? [],
    counts: meta?.counts ?? {},
    paging: meta ? { total: meta.total, page: meta.page, limit: meta.limit, pages: meta.pages } : null,
    loading: query.isPending,
    updating: query.isPlaceholderData,
  }
}

export const useEnrolment = (id) => useSuspenseQuery(enrolmentQuery(id)).data

// Sidebar badge: enrolments nobody has opened a review on yet. Quietly 0 while loading or offline.
export function useNewEnrolmentCount() {
  const { data } = useQuery({ ...enrolmentCountsQuery(), refetchInterval: 60_000 })
  return data?.New ?? 0
}
