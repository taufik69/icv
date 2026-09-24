import { Container } from '@/shared/components/ui'
import { Parts } from '../common/Parts'
import { CourseCta } from './CourseCta'
import { CourseHero } from './CourseHero'
import { CriteriaSection } from './CriteriaSection'
import { DetailsSection } from './DetailsSection'
import { EmploymentSection } from './EmploymentSection'
import { FundingBand } from './FundingBand'
import { OverviewSection } from './OverviewSection'
import { PlacementCard } from './PlacementCard'
import { RplSection } from './RplSection'
import { SplitSection } from './SplitSection'
import { UnitsSection } from './UnitsSection'

// One template for every domestic course; optional blocks render only when the course data has them.
// Placement sits in Course Details for courses without a dedicated heading, otherwise after the units.
export function CoursePage({ course }) {
  const { images, placement } = course
  const placementInDetails = placement && !placement.title

  return (
    <>
      <CourseHero course={course} />
      <OverviewSection course={course} />
      {course.funding && <FundingBand funding={course.funding} />}
      {course.career && (
        <SplitSection id="career-title" title={course.career.title} image={images.career}>
          <Parts parts={course.career.parts} />
        </SplitSection>
      )}
      <DetailsSection title={course.detailsTitle} details={course.details} placement={placement} showPlacement={placementInDetails} />
      {course.criteria && <CriteriaSection criteria={course.criteria} image={images.criteria} />}
      {course.units && <UnitsSection units={course.units} image={images.units} />}
      {placement && !placementInDetails && (
        <section aria-label={placement.title} className="bg-surface pb-16 md:pb-24">
          <Container>
            <PlacementCard placement={placement} />
          </Container>
        </section>
      )}
      {course.rpl && <RplSection rpl={course.rpl} image={images.rpl} />}
      {course.employment && <EmploymentSection employment={course.employment} />}
      <CourseCta cta={course.cta} image={images.cta} />
    </>
  )
}
