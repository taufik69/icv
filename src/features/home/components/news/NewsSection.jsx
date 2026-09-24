import { newsContent as content } from '@/features/home/data/newsContent'
import { Container, Reveal, SectionEyebrow } from '@/shared/components/ui'
import { NewsFeatured } from './NewsFeatured'
import { NewsMarqueeColumn } from './NewsMarqueeColumn'

// Left: heading + featured post. Right: two endlessly scrolling columns (opposite
// directions, different speeds, faded edges, pause on hover). Static list on mobile.
export function NewsSection() {
  const { posts } = content
  const rotated = [...posts.slice(1), posts[0]]

  return (
    <section aria-labelledby="news-title" className="bg-surface py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-16">
        <Reveal from="left">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="news-title" className="mt-5 text-3xl leading-tight sm:text-4xl md:text-5xl">
            {content.title} <span className="text-primary-hover">{content.highlight}</span>
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink-muted">{content.intro}</p>
          <div className="mt-10">
            <NewsFeatured post={content.featured} />
          </div>
        </Reveal>

        <Reveal from="right" className="group md:marquee-mask md:h-[46rem] md:overflow-hidden">
          <div className="grid gap-5 md:grid-cols-2">
            <NewsMarqueeColumn posts={posts} className="[--marquee-duration:26s]" />
            <NewsMarqueeColumn
              posts={rotated}
              className="hidden [--marquee-duration:32s] [--marquee-direction:reverse] md:flex"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
