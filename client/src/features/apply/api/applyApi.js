import { apiClient } from '@/shared/lib/apiClient'

// Public endpoint behind the website's apply form (server/src/modules/application).
export const applyApi = {
  submit: (values) => apiClient.post('/applications', values).then((r) => r.data),
}
