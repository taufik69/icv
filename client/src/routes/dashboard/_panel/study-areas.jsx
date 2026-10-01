import { createFileRoute } from '@tanstack/react-router'
import { DashboardError, TaxonomyPage, taxonomyQuery } from '@/features/dashboard'

// Manage the study areas courses can be filed under.
export const Route = createFileRoute('/dashboard/_panel/study-areas')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(taxonomyQuery('study-areas')),
  errorComponent: DashboardError,
  component: () => <TaxonomyPage type="study-areas" />,
})
