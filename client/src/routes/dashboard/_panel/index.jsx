import { createFileRoute } from '@tanstack/react-router'
import { DashboardError, DEFAULT_DAYS, OverviewPage, OverviewSkeleton, overviewRanges, overviewStatsQuery } from '@/features/dashboard'

const parseSearch = (search) => {
  const days = Number(search.days)
  return { days: overviewRanges.some((r) => r.days === days) ? days : DEFAULT_DAYS }
}

// Dashboard home: charts and headline numbers for ?days=7|30|90|365 (default 30). Like the lists, the
// loader only warms the first visit; period changes are fetched by the page, which keeps the old numbers faded.
export const Route = createFileRoute('/dashboard/_panel/')({
  validateSearch: parseSearch,
  loader: ({ context: { queryClient }, location }) => queryClient.ensureQueryData(overviewStatsQuery(parseSearch(location.search).days)),
  pendingComponent: OverviewSkeleton,
  pendingMs: 0,
  pendingMinMs: 300,
  errorComponent: DashboardError,
  component: OverviewRoute,
})

function OverviewRoute() {
  return <OverviewPage days={Route.useSearch().days} />
}
