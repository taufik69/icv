import { introContent } from '@/features/home/data/introContent'
import { Container } from '@/shared/components/ui'
import { useInView } from '@/shared/hooks/useInView'
import { IntroHeader } from './IntroHeader'
import { StudyShowcase } from './StudyShowcase'

// Doodle bg is requested only when the section nears the viewport.
// Desktop: background-attachment fixed. Mobile: scroll-driven drift (see animations.css).
export function IntroSection() {
  const [ref, nearView] = useInView({ rootMargin: '300px 0px' })

  return (
    <section
      ref={ref}
      aria-labelledby="intro-title"
      className={`parallax-bg relative overflow-hidden bg-surface bg-auto bg-repeat py-16 md:py-24 lg:bg-fixed ${nearView ? 'bg-[url(/images/doodle-bg.webp)]' : ''}`}
    >
      {/* Parallax decor: moves at a different speed from the content while scrolling */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="parallax-up absolute top-40 -left-24 size-80 rounded-full bg-primary/15 blur-3xl" />
        <span className="parallax-down absolute top-1/2 -right-24 size-96 rounded-full bg-sky/10 blur-3xl" />
        <span className="parallax-up absolute top-1/3 left-[12%] size-4 rounded-full bg-primary/40" />
        <span className="parallax-down absolute right-[15%] bottom-1/4 size-6 rounded-full bg-secondary/15" />
      </div>

      <Container className="relative">
        <IntroHeader content={introContent} />
        <StudyShowcase content={introContent} />
      </Container>
    </section>
  )
}
