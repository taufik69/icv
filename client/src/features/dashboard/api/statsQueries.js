import { queryOptions } from '@tanstack/react-query'
import { statsApi } from './statsApi'
import { statsKeys } from './statsKeys'

// Shared by the overview route loader (ensureQueryData) and useOverviewStats.
export const overviewStatsQuery = (days) =>
  queryOptions({ queryKey: statsKeys.overview(days), queryFn: () => statsApi.overview(days) })
