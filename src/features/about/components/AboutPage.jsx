import { AccreditationSection } from './accreditation/AccreditationSection'
import { AboutHero } from './hero/AboutHero'
import { HistorySection } from './history/HistorySection'
import { PurposeSection } from './purpose/PurposeSection'
import { WhyIcvSection } from './why/WhyIcvSection'

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <HistorySection />
      <PurposeSection />
      <WhyIcvSection />
      <AccreditationSection />
    </>
  )
}
