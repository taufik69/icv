import { queryOptions } from '@tanstack/react-query'
import { postsApi } from '@/features/posts/api/postsApi'
import { postsKeys } from '@/features/posts/api/postsKeys'

// Shared by route loaders (ensureQueryData) and hooks (useSuspenseQuery)
export const postsListQuery = () =>
  queryOptions({ queryKey: postsKeys.list(), queryFn: postsApi.getAll })

export const postDetailQuery = (id) =>
  queryOptions({ queryKey: postsKeys.detail(id), queryFn: () => postsApi.getById(id) })
