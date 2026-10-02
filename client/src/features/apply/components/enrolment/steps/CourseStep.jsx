import { feeNote, intakeYears } from '../../../data/enrolment/enrolmentForm'
import { ChoiceGroup } from '../fields/ChoiceGroup'
import { CourseChoice } from '../fields/CourseChoice'
import { Section } from '../fields/Section'

const yearOptions = intakeYears.map((y) => `Year – ${y}`)

// (A) Course Details: course (from the API, or typed in), the fee note from the paper form, intake year.
export function CourseStep({ form }) {
  const { field } = form
  return (
    <>
      <Section id="course" title="Course details">
        <CourseChoice form={form} />
        <p className="text-sm leading-relaxed text-ink-subtle sm:col-span-2">{feeNote}</p>
      </Section>
      <Section id="intake" title="Intake">
        <ChoiceGroup {...field('year')} label="Intake year" options={yearOptions} look="circle" required className="sm:col-span-2" />
      </Section>
    </>
  )
}
