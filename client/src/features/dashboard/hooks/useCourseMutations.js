import { useMutation, useQueryClient } from '@tanstack/react-query'
import { courseAdminApi } from '../api/courseAdminApi'
import { courseAdminKeys } from '../api/courseAdminKeys'

// Writes for dashboard courses. Each one refreshes every cached course list and page on success.
function useCourseMutation(mutationFn) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: courseAdminKeys.all }),
  })
}

export const useSetCourseStatus = () => useCourseMutation(({ id, status }) => courseAdminApi.setStatus(id, status))
export const useArchiveCourse = () => useCourseMutation((id) => courseAdminApi.archive(id))
// Saving can change the page address (it follows the title). The old address's cached page is dropped first,
// so refreshing doesn't re-request a course that no longer lives there.
export function useSaveCourse() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }) => (id ? courseAdminApi.update(id, body) : courseAdminApi.create(body)),
    onSuccess: (saved, { previous }) => {
      if (previous && (previous.slug !== saved.slug || previous.market !== saved.market)) {
        queryClient.removeQueries({ queryKey: courseAdminKeys.page(previous.market, previous.slug) })
      }
      return queryClient.invalidateQueries({ queryKey: courseAdminKeys.all })
    },
  })
}

// Image upload doesn't change any cached course until the form is saved, so nothing to invalidate.
export const useUploadImage = () => useMutation({ mutationFn: (file) => courseAdminApi.uploadImage(file) })
