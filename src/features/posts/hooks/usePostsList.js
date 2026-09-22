import { useSuspenseQuery } from '@tanstack/react-query'
import { postsListQuery } from '@/features/posts/api/postsQueries'

export function usePostsList() {
  return useSuspenseQuery(postsListQuery())
}
