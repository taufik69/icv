import { PostList } from '@/features/posts/components/PostList'
import { usePostsList } from '@/features/posts/hooks/usePostsList'
import { PageContainer } from '@/shared/components/layout'

// Loading/error handled by the route (pendingComponent/errorComponent)
export function PostsPage() {
  const { data } = usePostsList()

  return (
    <PageContainer>
      <h1 className="mb-6 text-3xl">Posts</h1>
      <PostList posts={data} />
    </PageContainer>
  )
}
