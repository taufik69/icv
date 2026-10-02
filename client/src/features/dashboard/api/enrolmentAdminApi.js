import { env } from '@/shared/config/env'
import { apiClient } from '@/shared/lib/apiClient'

const qs = (params) => {
  const s = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString()
  return s ? `?${s}` : ''
}

// Staff endpoints for international enrolment applications (server/docs/enrolment-api.md).
export const enrolmentAdminApi = {
  list: ({ status, q, page } = {}) => apiClient.get(`/enrolments${qs({ status, q, page })}`), // { data, meta: { total, page, limit, pages, counts } }
  counts: () => apiClient.get('/enrolments/counts').then((r) => r.data),
  getById: (id) => apiClient.get(`/enrolments/${id}`).then((r) => r.data),
  update: (id, changes) => apiClient.patch(`/enrolments/${id}`, changes).then((r) => r.data),
  remove: (id) => apiClient.delete(`/enrolments/${id}`),
  // Address of an uploaded file (signature, stamp, document); opens inline in the browser.
  fileUrl: (id, fileId) => `${env.apiBaseUrl}/enrolments/${id}/files/${fileId}`,
}
