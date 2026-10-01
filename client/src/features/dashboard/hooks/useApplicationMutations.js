import { useMutation, useQueryClient } from '@tanstack/react-query'
import { applicationApi } from '../api/applicationApi'
import { applicationKeys } from '../api/applicationKeys'

// Writes for applications. Each refreshes every cached application list, count and detail on success.
function useApplicationMutation(mutationFn) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: applicationKeys.all }),
  })
}

export const useSetApplicationStatus = () => useApplicationMutation(({ id, status }) => applicationApi.setStatus(id, status))
export const useDeleteApplication = () => useApplicationMutation((id) => applicationApi.remove(id))
