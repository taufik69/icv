import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { overviewStatsQuery } from '../api/statsQueries'

// Overview numbers for the chosen period. Switching period keeps the last numbers on screen
// (`updating`, shown faded) instead of flashing skeletons; errors go to the route's errorComponent.
// Refreshes every minute so the counts follow new submissions.
export function useOverviewStats(days) {
  const query = useQuery({ ...overviewStatsQuery(days), placeholderData: keepPreviousData, refetchInterval: 60_000, throwOnError: true })
  return { stats: query.data, updating: query.isPlaceholderData }
}
