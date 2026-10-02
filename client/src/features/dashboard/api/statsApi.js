import { apiClient } from '@/shared/lib/apiClient'

// GET /admin/stats?days= (server/src/modules/stats): totals, timeline and breakdowns for the overview.
export const statsApi = {
  overview: (days) => apiClient.get(`/admin/stats?days=${days}`).then((r) => r.data),
}
