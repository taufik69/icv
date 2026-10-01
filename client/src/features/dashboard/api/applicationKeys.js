// Query keys for dashboard application data. Every mutation invalidates `all`.
export const applicationKeys = {
  all: ['applications'],
  list: (filters) => [...applicationKeys.all, 'list', filters],
  counts: () => [...applicationKeys.all, 'counts'],
  detail: (id) => [...applicationKeys.all, 'detail', id],
}
