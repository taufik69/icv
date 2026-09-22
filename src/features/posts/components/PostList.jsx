import { PostCard } from '@/features/posts/components/PostCard'

export function PostList({ posts }) {
  return (
    <ul className="space-y-3">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}
