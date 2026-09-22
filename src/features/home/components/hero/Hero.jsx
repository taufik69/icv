import { lazy, Suspense, useRef } from 'react'
import { heroContent } from '@/features/home/data/heroContent'
import { useCanAutoplayVideo } from '@/features/home/hooks/useCanAutoplayVideo'
import { Container } from '@/shared/components/ui'
import { HeroCard } from './HeroCard'
import { HeroContent } from './HeroContent'
import { HeroPoster } from './HeroPoster'

// Video player code is split out: poster + text render first, video streams in after.
const HeroVideo = lazy(() => import('./HeroVideo'))

export function Hero() {
  const sectionRef = useRef(null)
  const canPlayVideo = useCanAutoplayVideo()

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[680px] items-end overflow-hidden bg-secondary-dark h-svh"
    >
      <div className="absolute inset-0 -z-10">
        <HeroPoster poster={heroContent.poster} />
        {canPlayVideo && (
          <Suspense fallback={null}>
            <HeroVideo video={heroContent.video} containerRef={sectionRef} />
          </Suspense>
        )}
        {/* Navy scrim keeps white text readable over any frame */}
        <div className="absolute inset-0 bg-linear-to-t from-secondary-dark via-secondary/55 to-secondary/35" />
      </div>

      <Container className="grid gap-10 pt-36 pb-14 md:pb-20 lg:grid-cols-[1fr_24rem] lg:items-end">
        <HeroContent content={heroContent} />
        <div className="hidden space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0 lg:grid-cols-1">
          {heroContent.cards.map((card) => (
            <HeroCard key={card.href} card={card} />
          ))}
        </div>
      </Container>
    </section>
  )
}
