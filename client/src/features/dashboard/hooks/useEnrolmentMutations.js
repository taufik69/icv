import { useMutation, useQueryClient } from '@tanstack/react-query'
import { enrolmentAdminApi } from '../api/enrolmentAdminApi'
import { enrolmentAdminKeys } from '../api/enrolmentAdminKeys'

// Writes for enrolments. Each refreshes every cached enrolment list, count and detail on success.
function useEnrolmentMutation(mutationFn) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: enrolmentAdminKeys.all }),
  })
}

// `changes` = { status } and/or { staffNote }.
export const useUpdateEnrolment = () => useEnrolmentMutation(({ id, ...changes }) => enrolmentAdminApi.update(id, changes))
export const useDeleteEnrolment = () => useEnrolmentMutation((id) => enrolmentAdminApi.remove(id))
