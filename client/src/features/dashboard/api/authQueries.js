import { queryOptions } from '@tanstack/react-query'
import { authApi } from './authApi'
import { authKeys } from './authKeys'

// Who is signed in. A 401 means "nobody" (no retry); the dashboard route guard sends them to sign in.
export const meQuery = () => queryOptions({ queryKey: authKeys.me(), queryFn: authApi.me, retry: false, staleTime: 5 * 60_000 })
