import { NewsDate } from './NewsDate'

// Compact card used inside the scrolling columns.
export function NewsCard({ post, hidden = false, className = '' }) {
  return (
    <a
      href={post.href}
      tabIndex={hidden ? -1 : undefined}
      className={`group block rounded-2xl bg-surface p-3 shadow-raised ring-1 ring-line-soft transition duration-300 hover:shadow-card hover:ring-primary/60 ${className}`}
    >
      <div className="aspect-16/10 overflow-hidden rounded-xl bg-surface-muted">
        <img
          src={post.image}
          alt=""
          width="400"
          height="250"
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="px-2 pt-4 pb-2">
        <NewsDate date={post.date} />
        <h3 className="mt-2 line-clamp-2 text-base leading-snug font-semibold transition-colors group-hover:text-secondary-muted">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
      </div>
    </a>
  )
}
