import { createFileRoute } from '@tanstack/react-router'
import { postsListQuery, PostsPage } from '@/features/posts'
import { ErrorMessage, Spinner } from '@/shared/components/ui'

export const Route = createFileRoute('/posts/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(postsListQuery()),
  pendingComponent: Spinner,
  errorComponent: ErrorMessage,
  component: PostsPage,
})
