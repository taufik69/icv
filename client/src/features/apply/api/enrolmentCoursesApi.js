import { apiClient } from '@/shared/lib/apiClient'

// Active international courses (with facts and fees) for the enrolment form's course dropdown.
export const enrolmentCoursesApi = {
  list: () => apiClient.get('/courses/finder').then((r) => r.data.filter((c) => c.market === 'international')),
}
