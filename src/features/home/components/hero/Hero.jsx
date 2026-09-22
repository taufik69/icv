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
      className="relative isolate flex items-end overflow-hidden bg-secondary-dark md:h-svh md:min-h-[680px]"
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

      <Container className="grid gap-10 pt-28 pb-12 md:pt-36 md:pb-20 lg:grid-cols-[1fr_26rem] lg:items-end">
        <HeroContent content={heroContent} />
        {/* Two tiles side by side, third card full width underneath */}
        <div className="hidden grid-cols-2 gap-3 md:grid md:max-w-lg lg:max-w-none">
          {heroContent.cards.map((card, i) => (
            <div key={card.href} className={i === 2 ? 'col-span-2' : 'h-full'}>
              <HeroCard card={card} layout={i === 2 ? 'row' : 'tile'} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
