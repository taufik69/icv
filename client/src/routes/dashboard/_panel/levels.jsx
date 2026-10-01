import { createFileRoute } from '@tanstack/react-router'
import { DashboardError, TaxonomyPage, taxonomyQuery } from '@/features/dashboard'

// Manage the levels courses can be filed under.
export const Route = createFileRoute('/dashboard/_panel/levels')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(taxonomyQuery('levels')),
  errorComponent: DashboardError,
  component: () => <TaxonomyPage type="levels" />,
})
