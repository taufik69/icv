// Query keys for dashboard course data. Every mutation invalidates `all`.
export const courseAdminKeys = {
  all: ['admin-courses'],
  list: (filters) => [...courseAdminKeys.all, 'list', filters],
  page: (market, slug) => [...courseAdminKeys.all, 'page', market, slug],
}
