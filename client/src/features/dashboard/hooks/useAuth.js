import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../api/authApi'
import { authKeys } from '../api/authKeys'
import { meQuery } from '../api/authQueries'

// The signed-in staff member (the dashboard route guard has already loaded it).
export const useMe = () => useQuery(meQuery()).data

// Sign in stores the returned user as "me"; sign out forgets every cached dashboard answer.
export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: authApi.login, onSuccess: (user) => queryClient.setQueryData(authKeys.me(), user) })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({ mutationFn: authApi.logout, onSettled: () => queryClient.clear() })
}

// Password reset steps: email → code → new password. Nothing cached, so no invalidation.
export const useForgotPassword = () => useMutation({ mutationFn: authApi.forgot })
export const useVerifyCode = () => useMutation({ mutationFn: ({ email, code }) => authApi.verifyCode(email, code) })
export const useResetPassword = () => useMutation({ mutationFn: ({ resetToken, password }) => authApi.resetPassword(resetToken, password) })
