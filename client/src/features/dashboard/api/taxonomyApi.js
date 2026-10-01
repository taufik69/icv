import { apiClient } from '@/shared/lib/apiClient'

// Study areas and levels (server/src/modules/taxonomy). type = 'study-areas' | 'levels'.
const base = (type) => `/admin/taxonomies/${type}`

export const taxonomyApi = {
  list: (type) => apiClient.get(base(type)).then((r) => r.data),
  create: (type, body) => apiClient.post(base(type), body).then((r) => r.data),
  update: (type, id, body) => apiClient.patch(`${base(type)}/${id}`, body).then((r) => r.data),
  reorder: (type, ids) => apiClient.put(`${base(type)}/order`, { ids }).then((r) => r.data),
  remove: (type, id) => apiClient.delete(`${base(type)}/${id}`),
}
