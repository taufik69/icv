import { complianceCta, heroContent } from '@/features/compliance/data/complianceContent'
import { PageHero } from '@/shared/components/layout'
import { ContactCta } from '@/shared/components/ui'
import { RegistrationBand } from './RegistrationBand'
import { ReportsSection } from './ReportsSection'

export function CompliancePage() {
  return (
    <>
      <PageHero id="compliance-page-title" current="Compliance and reports" {...heroContent} />
      <ReportsSection />
      <RegistrationBand />
      <ContactCta id="compliance-cta-title" content={complianceCta} className="bg-surface py-16 md:py-20" />
    </>
  )
}
