import { brokersCta, brokersHero, brokersStatement } from '@/features/compliance/data/brokersContent'
import { PageHero } from '@/shared/components/layout'
import { ContactCta, Container, Reveal } from '@/shared/components/ui'
import { useDoodleBackground } from '@/shared/hooks/useDoodleBackground'
import { StatementCard } from './StatementCard'

export function BrokersPage() {
  const [ref, doodle] = useDoodleBackground()

  return (
    <>
      <PageHero id="brokers-page-title" current="Brokers and subcontractors" {...brokersHero} />
      <section ref={ref} aria-labelledby="statement-title" className={`relative overflow-hidden bg-surface py-20 md:py-28 ${doodle}`}>
        <Container>
          <Reveal from="zoom" className="mx-auto max-w-5xl">
            <StatementCard content={brokersStatement} />
          </Reveal>
        </Container>
      </section>
      <ContactCta id="brokers-cta-title" content={brokersCta} className="bg-surface-muted py-16 md:py-20" />
    </>
  )
}
