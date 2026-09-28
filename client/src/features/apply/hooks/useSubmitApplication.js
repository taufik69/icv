import { useMutation, useQueryClient } from '@tanstack/react-query'
import { applicationsApi } from '../api/applicationsApi'

// Sends one application. Invalidates the dashboard's application lists so a new row shows up.
export function useSubmitApplication() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: applicationsApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['applications'] }),
  })
}
