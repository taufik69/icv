import { apiClient } from '@/shared/lib/apiClient'

// Public endpoint: the website's apply form posts here.
export const applicationsApi = {
  create: (values) => apiClient.post('/applications', values).then((res) => res.data),
}
