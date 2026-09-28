import { heroContent } from '@/features/why-choose/data/whyChooseContent'
import { PageHero } from '@/shared/components/layout'
import { CampusSection } from './campus/CampusSection'
import { OfferSection } from './offer/OfferSection'
import { ScholarshipSection } from './scholarship/ScholarshipSection'
import { ValuesSection } from './values/ValuesSection'

export function WhyChoosePage() {
  return (
    <>
      <PageHero id="why-choose-title" current="Why choose ICV" {...heroContent} />
      <OfferSection />
      <ValuesSection />
      <CampusSection />
      <ScholarshipSection />
    </>
  )
}
