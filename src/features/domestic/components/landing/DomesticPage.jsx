import { domesticContent } from '@/features/domestic/data/domesticContent'
import { TestimonialsSection } from '@/features/home'
import { ArrowUpRightIcon } from '@/shared/components/icons'
import { PageHero } from '@/shared/components/layout'
import { ClaimCta } from './ClaimCta'
import { CoursesGrid } from './CoursesGrid'
import { EnrolBand } from './EnrolBand'
import { StudySection } from './StudySection'
import { WelcomeSection } from './WelcomeSection'

const { hero, enquire } = domesticContent

// "OUR STUDENTS LOVE US" reuses the home page testimonials slider (same reviews on icv.edu.au).
export function DomesticPage() {
  return (
    <>
      <PageHero id="domestic-title" current={hero.title} title={hero.title} image={hero.image}>
        <a href={enquire.href} className="group btn-shine mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-heading font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary">
          {enquire.label}
          <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </PageHero>
      <WelcomeSection />
      <CoursesGrid />
      <EnrolBand />
      <TestimonialsSection />
      <StudySection />
      <ClaimCta />
    </>
  )
}
