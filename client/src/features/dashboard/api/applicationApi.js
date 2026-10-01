import { apiClient } from '@/shared/lib/apiClient'

const qs = (params) => {
  const s = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString()
  return s ? `?${s}` : ''
}

// Staff endpoints for applications sent from the website's apply form (server/src/modules/application).
export const applicationApi = {
  list: ({ status, q } = {}) => apiClient.get(`/applications${qs({ status, q })}`), // { data, meta: { counts } }
  counts: () => apiClient.get('/applications/counts').then((r) => r.data),
  getById: (id) => apiClient.get(`/applications/${id}`).then((r) => r.data),
  setStatus: (id, status) => apiClient.patch(`/applications/${id}`, { status }).then((r) => r.data),
  remove: (id) => apiClient.delete(`/applications/${id}`),
}
