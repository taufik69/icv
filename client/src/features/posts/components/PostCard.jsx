import { Link } from '@tanstack/react-router'
import { Card } from '@/shared/components/ui'

export function PostCard({ post }) {
  return (
    <Link to="/posts/$postId" params={{ postId: String(post.id) }} className="group block">
      <Card className="border-l-4 border-l-primary transition group-hover:shadow-elevated">
        <h2 className="text-lg capitalize">{post.title}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{post.body}</p>
      </Card>
    </Link>
  )
}
