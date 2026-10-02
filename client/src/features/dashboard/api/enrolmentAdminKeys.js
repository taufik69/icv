// Query keys for dashboard enrolment data. Every mutation invalidates `all`.
export const enrolmentAdminKeys = {
  all: ['enrolments'],
  list: (filters) => [...enrolmentAdminKeys.all, 'list', filters],
  counts: () => [...enrolmentAdminKeys.all, 'counts'],
  detail: (id) => [...enrolmentAdminKeys.all, 'detail', id],
}
