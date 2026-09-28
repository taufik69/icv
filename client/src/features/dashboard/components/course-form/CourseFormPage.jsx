import { Button } from '@/shared/components/ui'
import { courseFormBlocks } from '../../data/courseFormBlocks'
import { PageHeader } from '../shell/PageHeader'
import { BasicsSection } from './BasicsSection'
import { BlocksRail } from './BlocksRail'
import { FundingSection, GlanceSection, OverviewSection } from './ContentSections'
import { EmptyBlock } from './EmptyBlock'
import { UnitsSection } from './UnitsSection'

// Add/edit a course. Sections follow the public course page top to bottom. UI only — nothing saves yet.
export function CourseFormPage() {
  return (
    <>
      <PageHeader title="Add course" crumbs={{ trail: [{ label: 'Courses', to: '/dashboard/courses' }] }} description="Fill in the blocks you need. Empty optional blocks are left off the page.">
        <Button variant="ghost" type="button">Save draft</Button>
        <Button variant="secondary" type="submit" form="course-form">Publish course</Button>
      </PageHeader>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <form id="course-form" className="grid min-w-0 grid-cols-1 gap-6" onSubmit={(e) => e.preventDefault()}>
          <BasicsSection />
          <OverviewSection />
          <GlanceSection />
          <FundingSection />
          <EmptyBlock id="career" title="Career opportunities" description="Job titles this course leads to, shown beside a photo." />
          <EmptyBlock id="details" title="Course details" description="Entry requirements, pathways and other detail cards." />
          <UnitsSection />
          <EmptyBlock id="rpl" title="RPL and credit transfer" description="How students get credit for skills they already have." />
          <EmptyBlock id="employment" title="Employment pathways" description="Roles graduates move into." />
          <EmptyBlock id="cta" title="Closing call to action" description="The enquiry band at the bottom of the page." />
        </form>
        <aside className="hidden lg:block">
          <BlocksRail blocks={courseFormBlocks} />
        </aside>
      </div>
    </>
  )
}
