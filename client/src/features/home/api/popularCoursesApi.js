import { apiClient } from '@/shared/lib/apiClient'

// Courses staff marked "Show on home page" in the dashboard (active only).
export const popularCoursesApi = {
  list: () => apiClient.get('/courses?featured=true').then((r) => r.data),
}
