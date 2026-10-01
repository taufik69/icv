import { apiClient } from '@/shared/lib/apiClient'

const qs = (params) => {
  const s = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString()
  return s ? `?${s}` : ''
}

// Dashboard course endpoints (server/src/modules/course, mounted at /admin/courses).
export const courseAdminApi = {
  list: ({ market, q } = {}) => apiClient.get(`/admin/courses${qs({ market, q })}`),
  getByPage: (market, slug) => apiClient.get(`/admin/courses/page/${market}/${slug}`).then((r) => r.data),
  create: (body) => apiClient.post('/admin/courses', body).then((r) => r.data),
  update: (id, body) => apiClient.patch(`/admin/courses/${id}`, body).then((r) => r.data),
  setStatus: (id, status) => apiClient.patch(`/admin/courses/${id}/status`, { status }).then((r) => r.data),
  archive: (id) => apiClient.delete(`/admin/courses/${id}`),
  // Saved by the API as WebP in several widths; resolves to { src, srcSet, width, height, alt }.
  uploadImage: (file) => {
    const body = new FormData()
    body.append('image', file)
    return apiClient.post('/admin/uploads/images?folder=courses', body).then((r) => r.data)
  },
}
