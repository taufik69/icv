import { ceoHeroContent, ceoLetter, ceoProfile } from '@/features/about/data/ceoContent'
import { PageHero } from '@/shared/components/layout'
import { Container, Reveal } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { CeoCta } from './CeoCta'
import { CeoLetter } from './CeoLetter'
import { CeoProfileCard } from './CeoProfileCard'

// Profile card sticks beside the letter on lg; stacks above it on smaller screens.
export function CeoMessagePage() {
  const [ref, doodle] = useDoodleBackground()

  return (
    <>
      <PageHero id="ceo-title" current="Message from the CEO" {...ceoHeroContent} />

      <section ref={ref} aria-labelledby="ceo-letter-title" className={`relative overflow-clip bg-surface py-20 md:py-28 ${doodle}`}>
        <span aria-hidden="true" className="parallax-up pointer-events-none absolute top-40 -right-32 size-96 rounded-full bg-primary/10 blur-3xl" />
        <Container className="relative grid items-start gap-10 lg:grid-cols-[4fr_7fr] lg:gap-14">
          <Reveal from="left" className="lg:sticky lg:top-28">
            <CeoProfileCard profile={ceoProfile} />
          </Reveal>
          <Reveal from="right" delay={100}>
            <CeoLetter letter={ceoLetter} profile={ceoProfile} />
          </Reveal>
        </Container>
      </section>

      <CeoCta />
    </>
  )
}
