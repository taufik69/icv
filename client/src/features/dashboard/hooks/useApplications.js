import { keepPreviousData, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { applicationCountsQuery, applicationQuery, applicationsQuery } from '../api/applicationQueries'

// List + per-status counts. Like the course list, a new tab or search keeps the old rows on screen
// (`updating`) instead of suspending the page; errors go to the route's errorComponent.
export function useApplications(filters) {
  const query = useQuery({ ...applicationsQuery(filters), placeholderData: keepPreviousData, throwOnError: true })
  return {
    items: query.data?.data ?? [],
    counts: query.data?.meta.counts ?? {},
    loading: query.isPending,
    updating: query.isPlaceholderData,
  }
}

export const useApplication = (id) => useSuspenseQuery(applicationQuery(id)).data

// Sidebar badge: how many applications still wait for a first reply. Quietly 0 while loading or offline.
export function useNewApplicationCount() {
  const { data } = useQuery({ ...applicationCountsQuery(), refetchInterval: 60_000 })
  return data?.New ?? 0
}
