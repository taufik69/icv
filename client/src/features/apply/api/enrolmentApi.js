import { apiClient } from '@/shared/lib/apiClient'

// Public endpoint of server/src/modules/enrolment: `body` is the FormData from buildEnrolmentFormData.
// Resolves to { id, reference, status, submittedAt }.
export const enrolmentApi = {
  submit: (body) => apiClient.post('/enrolments', body).then((r) => r.data),
}
