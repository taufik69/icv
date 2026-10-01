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
export const useSaveCourse = () =>
  useCourseMutation(({ id, body }) => (id ? courseAdminApi.update(id, body) : courseAdminApi.create(body)))

// Image upload doesn't change any cached course until the form is saved, so nothing to invalidate.
export const useUploadImage = () => useMutation({ mutationFn: (file) => courseAdminApi.uploadImage(file) })
