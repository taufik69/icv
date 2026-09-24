import { supportCta } from '@/features/wellbeing/data/careerContent'
import { heroContent } from '@/features/wellbeing/data/wellbeingContent'
import { PageHero } from '@/shared/components/layout'
import { ContactCta } from '@/shared/components/ui'
import { CareerSection } from './career/CareerSection'
import { CounsellorSection } from './counsellor/CounsellorSection'
import { GallerySection } from './gallery/GallerySection'
import { JumpLinks } from './hero/JumpLinks'
import { WellbeingSection } from './wellbeing/WellbeingSection'

// Section ids match icv.edu.au anchors (#student-wellbeing, #career-counselling-services, #student-gallery).
export function WellbeingPage() {
  return (
    <>
      <PageHero id="wellbeing-page-title" current="Student Wellbeing Centre" {...heroContent}>
        <JumpLinks links={heroContent.jumpLinks} />
      </PageHero>
      <CounsellorSection />
      <WellbeingSection />
      <CareerSection />
      <GallerySection />
      <ContactCta id="support-cta-title" content={supportCta} />
    </>
  )
}
