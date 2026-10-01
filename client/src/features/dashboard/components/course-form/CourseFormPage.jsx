import { Button } from '@/shared/components/ui'
import { useCourseForm } from '../../hooks/useCourseForm'
import { formOutline } from '../../lib/courseOutline'
import { PageHeader } from '../shell/PageHeader'
import { BasicsSection } from './BasicsSection'
import { BlocksRail } from './BlocksRail'
import { GlanceSection, OverviewSection } from './ContentSections'
import { DetailSection } from './DetailSection'
import { FactsSection } from './FactsSection'
import { FeesSection } from './FeesSection'
import { ImportedBlocks } from './ImportedBlocks'
import { MobileOutline } from './MobileOutline'
import { SaveError } from './SaveError'
import { UnitsSection } from './UnitsSection'

const trail = [{ label: 'Courses', to: '/dashboard/courses' }]

// Add a course (no `course`) or edit one. Sections follow the public course pages top to bottom.
export function CourseFormPage({ course }) {
  const form = useCourseForm(course)
  const editing = Boolean(course)
  const outline = formOutline(form.values, course)

  const onSubmit = (e) => {
    e.preventDefault()
    form.submit(editing ? undefined : 'active')
  }

  return (
    <>
      <PageHeader
        title={editing ? `Edit ${course.title}` : 'Add course'}
        crumbs={{ trail, current: editing ? 'Edit' : 'Add course' }}
        description={editing ? `Status: ${course.status}. Change it from the course list.` : 'Fill in the blocks you need. Empty optional blocks are left off the page.'}
      >
        {!editing && (
          <Button variant="ghost" type="button" form="course-form" disabled={form.saving} onClick={(e) => e.currentTarget.form.reportValidity() && form.submit('draft')}>
            Save draft
          </Button>
        )}
        <Button variant="secondary" type="submit" form="course-form" disabled={form.saving}>
          {form.saving ? 'Saving…' : editing ? 'Save changes' : 'Publish course'}
        </Button>
      </PageHeader>

      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <form id="course-form" className="grid min-w-0 grid-cols-1 gap-6 pb-20 lg:pb-0" onSubmit={onSubmit}>
          <SaveError error={form.error} />
          <BasicsSection {...form} />
          <OverviewSection {...form} />
          <FactsSection bind={form.bind} />
          <FeesSection {...form} />
          <DetailSection {...form} />
          <GlanceSection {...form} />
          <UnitsSection {...form} />
          <ImportedBlocks course={course} />
        </form>
        {/* self-stretch: the rail is sticky, so its column must run the full height of the form */}
        <aside className="hidden self-stretch lg:block">
          <BlocksRail blocks={outline} />
        </aside>
      </div>
      <MobileOutline blocks={outline} />
    </>
  )
}
