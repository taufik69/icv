import { launchContent as content } from '@/features/home/data/launchContent'
import { Container, Reveal } from '@/shared/components/ui'
import { BenefitCard } from './BenefitCard'
import { LaunchIntro } from './LaunchIntro'
import { RecognitionCard } from './RecognitionCard'

// Navy blueprint bento (same language as the course Employment section):
// lg:  intro | benefits (two per row, compact; an odd last one spans both)
//      intro | recognition (full width of the right column)
// Below lg everything stacks: intro, benefits (two per row from sm), recognition.
export function LaunchSection() {
  const odd = content.benefits.length % 2 === 1
  const last = content.benefits.length - 1

  return (
    <section aria-labelledby="launch-title" className="relative isolate overflow-hidden bg-secondary py-16 md:py-24">
      <span aria-hidden="true" className="parallax-up pointer-events-none absolute -top-24 -left-24 -z-10 size-96 rounded-full bg-white/5 blur-3xl" />
      <Container className="grid grid-cols-1 gap-6 lg:grid-cols-[5fr_7fr]">
        <Reveal from="left" className="h-full">
          <LaunchIntro content={content} />
        </Reveal>
        <div className="grid min-w-0 grid-cols-1 content-start gap-6">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {content.benefits.map((b, i) => (
              <Reveal as="li" key={b.text} delay={(i % 2) * 100} className={odd && i === last ? 'sm:col-span-2' : ''}>
                <BenefitCard benefit={b} />
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <RecognitionCard recognition={content.recognition} />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
