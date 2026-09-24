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
      className="relative isolate flex min-h-svh items-end overflow-hidden bg-secondary-dark"
    >
      <div className="absolute inset-0 -z-10">
        <HeroPoster poster={heroContent.poster} />
        {canPlayVideo && (
          <Suspense fallback={null}>
            <HeroVideo video={heroContent.video} containerRef={sectionRef} />
          </Suspense>
        )}
        {/* Content sits at the bottom (phones: pb-40 clears BottomNav + ContactFab). Scrim: clear at the top so the photo/video is the subject, deep navy at the bottom behind the text */}
        <div className="absolute inset-0 bg-linear-to-t from-secondary-dark via-secondary-dark/45 via-45% to-transparent" />
      </div>

      <Container className="grid gap-10 pt-28 pb-40 md:pt-32 md:pb-20 lg:grid-cols-[1fr_22rem] lg:items-end">
        <HeroContent content={heroContent} />
        {/* One quiet glass panel of quick links (md+) */}
        <nav aria-label="Quick links" className="hidden rounded-2xl bg-white/10 p-1.5 ring-1 ring-white/15 backdrop-blur-md md:block md:max-w-sm lg:max-w-none">
          <ul className="divide-y divide-white/10">
            {heroContent.cards.map((card) => (
              <li key={card.href}>
                <HeroCard card={card} />
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  )
}
