import { agentsCta, heroContent } from '@/features/education-agents/data/agentsContent'
import { PageHero } from '@/shared/components/layout'
import { ContactCta } from '@/shared/components/ui'
import { AgentsSection } from './AgentsSection'

export function AgentsPage() {
  return (
    <>
      <PageHero id="agents-page-title" current="Education agents" {...heroContent} />
      <AgentsSection />
      <ContactCta id="agents-cta-title" content={agentsCta} className="bg-surface-muted py-16 md:py-20" />
    </>
  )
}
