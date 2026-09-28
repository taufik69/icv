import { NewsCard } from './NewsCard'

// md+: items rendered twice and scrolled forever (see styles/marquee.css).
// Mobile: a horizontal snap carousel; the duplicate set is hidden (also for reduced motion).
export function NewsMarqueeColumn({ posts, className = '' }) {
  return (
    <div
      className={`-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-col md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:marquee-up group-hover:[animation-play-state:paused] ${className}`}
    >
      {posts.map((post) => (
        <NewsCard key={post.href} post={post} className="w-[80%] shrink-0 snap-start md:w-auto" />
      ))}
      <div aria-hidden="true" className="hidden flex-col gap-5 md:flex md:motion-reduce:hidden">
        {posts.map((post) => (
          <NewsCard key={post.href} post={post} hidden />
        ))}
      </div>
    </div>
  )
}
