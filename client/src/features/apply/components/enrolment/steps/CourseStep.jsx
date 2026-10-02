import { feeNote, intakeYears } from '../../../data/enrolment/enrolmentForm'
import { FormGroup } from '../../FormGroup'
import { ChoiceGroup } from '../fields/ChoiceGroup'
import { CourseChoice } from '../fields/CourseChoice'

const yearOptions = intakeYears.map((y) => `Year – ${y}`)

// (A) Course Details: course (from the API, or typed in), the fee note from the paper form, intake year.
export function CourseStep({ form }) {
  const { field } = form
  return (
    <FormGroup title="Course details">
      <CourseChoice form={form} />
      <p className="text-sm text-ink-subtle sm:col-span-2">{feeNote}</p>
      <ChoiceGroup {...field('year')} label="Intake year" options={yearOptions} look="circle" required className="sm:col-span-2" />
    </FormGroup>
  )
}
