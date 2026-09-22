import { apiClient } from '@/shared/lib/apiClient'

export const postsApi = {
  getAll: () => apiClient.get('/posts?_limit=10'),
  getById: (id) => apiClient.get(`/posts/${id}`),
}
