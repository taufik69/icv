import { introContent } from '@/features/home/data/introContent'
import { Container, Reveal } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { IntroFeatures } from './IntroFeatures'
import { IntroHeader } from './IntroHeader'
import { VideoCard } from './VideoCard'

export function IntroSection() {
  const [ref, doodle] = useDoodleBackground()

  return (
    <section
      ref={ref}
      aria-labelledby="intro-title"
      className={`relative overflow-hidden bg-surface py-16 md:py-24 ${doodle}`}
    >
      {/* Parallax decor: moves at a different speed from the content while scrolling */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="parallax-up absolute top-40 -left-24 size-80 rounded-full bg-primary/15 blur-3xl" />
        <span className="parallax-down absolute top-1/2 -right-24 size-96 rounded-full bg-sky/10 blur-3xl" />
        <span className="parallax-up absolute top-1/3 left-[12%] size-4 rounded-full bg-primary/40" />
        <span className="parallax-down absolute right-[15%] bottom-1/4 size-6 rounded-full bg-secondary/15" />
      </div>

      <Container className="relative">
        {/* lg: copy + pathway cards | video. Below lg: stacked, video under the cards. */}
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
          <IntroHeader content={introContent} />
          <Reveal from="zoom" className="px-3">
            <VideoCard video={introContent.video} />
          </Reveal>
        </div>
        <IntroFeatures points={introContent.points} />
      </Container>
    </section>
  )
}
