import { ArrowRightIcon } from '@/shared/components/icons'
import { NewsDate } from './NewsDate'

export function NewsFeatured({ post }) {
  return (
    <a href={post.href} className="group block">
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-surface-muted shadow-card">
        <img
          src={post.image}
          alt=""
          width="712"
          height="400"
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 font-condensed text-xs font-bold tracking-wider text-on-primary uppercase">
          Featured
        </span>
      </div>
      <NewsDate date={post.date} className="mt-5" />
      <h3 className="mt-2 text-xl leading-snug font-semibold md:text-2xl">{post.title}</h3>
      <p className="mt-3 line-clamp-3 leading-relaxed text-ink-muted">{post.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-2 font-heading font-semibold text-secondary">
        Read more
        <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
      </span>
    </a>
  )
}
