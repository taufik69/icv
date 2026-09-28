import { useSuspenseQuery } from '@tanstack/react-query'
import { postDetailQuery } from '@/features/posts/api/postsQueries'

export function usePostDetail(id) {
  return useSuspenseQuery(postDetailQuery(id))
}
