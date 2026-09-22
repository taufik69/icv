import { Link } from '@tanstack/react-router'
import { usePostDetail } from '@/features/posts/hooks/usePostDetail'
import { PageContainer } from '@/shared/components/layout'

export function PostDetailPage({ postId }) {
  const { data: post } = usePostDetail(postId)

  return (
    <PageContainer>
      <article className="space-y-4">
        <Link to="/posts" className="text-sm font-semibold">
          ← Back to posts
        </Link>
        <h1 className="text-3xl capitalize">{post.title}</h1>
        <p className="leading-relaxed text-ink-muted">{post.body}</p>
      </article>
    </PageContainer>
  )
}
