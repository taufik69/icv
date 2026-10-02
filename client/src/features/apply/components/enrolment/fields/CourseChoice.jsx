import { RefreshIcon } from '@/shared/components/icons'
import { useEnrolmentCourses } from '../../../hooks/useEnrolmentCourses'
import { ApplySelect } from '../../ApplySelect'
import { CourseDetailsRow } from './CourseDetailsRow'

const OTHER = 'other'
const blankRow = { course: '', courseTitle: '', duration: '', applicationFee: '', tuitionFee: '', materialFee: '' }

// (A) Course dropdown filled from the API (active international courses), then the paper form's course
// row. "My course is not listed", or an API that can't be reached, lets the student type every value.
export function CourseChoice({ form }) {
  const { values, errors, patch } = form
  const { courses, loading, failed, retry } = useEnrolmentCourses()
  const manual = values.courseManual || failed
  const apiRow = manual ? null : courses.find((c) => c.course === values.course)
  const options = [
    ...courses.map((c) => ({ value: c.course, label: c.courseTitle, badge: c.course })),
    ...(courses.length ? [{ value: OTHER, label: 'My course is not listed' }] : []),
  ]

  const pick = (e) => {
    const code = e.target.value
    patch(code === OTHER ? { ...blankRow, courseManual: true } : { ...blankRow, ...courses.find((c) => c.course === code), courseManual: false })
  }

  return (
    <div className="grid gap-4 sm:col-span-2">
      {!failed && (
        <ApplySelect
          name={manual ? 'courseSource' : 'course'} label="Course" required options={options} onChange={pick}
          value={values.courseManual ? OTHER : values.course} disabled={loading} error={manual ? undefined : errors.course}
          placeholder={loading ? 'Loading courses…' : 'Choose a course'}
        />
      )}
      {failed && (
        <p role="alert" className="flex flex-wrap items-center gap-3 rounded-xl bg-warning-soft px-4 py-3 text-sm text-warning-ink">
          The course list could not be loaded. Enter your course details below, or try loading the list again.
          <button type="button" onClick={() => retry()} className="inline-flex items-center gap-1.5 font-heading font-semibold underline underline-offset-2">
            <RefreshIcon className="size-4" /> Try again
          </button>
        </p>
      )}
      {(manual || values.course) && (
        <CourseDetailsRow apiRow={apiRow} values={values} errors={errors} onEdit={(key, v) => patch({ [key]: v, ...(failed && { courseManual: true }) })} />
      )}
    </div>
  )
}
