import { createFileRoute } from '@tanstack/react-router'
import { PostDetailPage, postDetailQuery } from '@/features/posts'
import { ErrorMessage, Spinner } from '@/shared/components/ui'

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(postDetailQuery(params.postId)),
  pendingComponent: Spinner,
  errorComponent: ErrorMessage,
  component: PostDetailRoute,
})

function PostDetailRoute() {
  const { postId } = Route.useParams()
  return <PostDetailPage postId={postId} />
}
