import { courseColumns } from '../../../data/enrolment/enrolmentForm'
import { ApplyField } from '../../ApplyField'

const REQUIRED = ['course', 'courseTitle']

// (A) Course Details as one row of the paper form's table: code, title, duration and the three fees.
// A value the API has is shown as fixed text; anything it doesn't have becomes an input for the student.
export function CourseDetailsRow({ apiRow, values, errors, onEdit }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line md:grid-cols-4">
      {courseColumns.map(({ key, label, placeholder, className = '' }) => {
        const fixed = apiRow?.[key]
        return (
          <div key={key} className={`bg-surface p-3.5 ${className}`}>
            {fixed ? (
              <>
                <p className="font-heading text-sm font-semibold text-secondary">{label}</p>
                <p className="mt-1.5 font-heading text-lg leading-snug font-semibold text-ink-strong">{fixed}</p>
              </>
            ) : (
              <ApplyField
                name={key} label={label} placeholder={placeholder} required={REQUIRED.includes(key)}
                value={values[key]} error={errors[key]} onChange={(e) => onEdit(key, e.target.value)}
                className="[&>input]:mt-1"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
