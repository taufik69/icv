import { creditAnswers } from '../../../data/enrolment/enrolmentOptions'
import { ChoiceCards } from '../fields/ChoiceCards'
import { EnglishTestList } from '../fields/EnglishTestList'
import { QualificationList } from '../fields/QualificationList'
import { Section } from '../fields/Section'

const creditOptions = [
  { value: creditAnswers[0], note: 'Attach copies of your documents in the last step.' },
  { value: creditAnswers[1], note: 'Continue without credit transfer or RPL.' },
]

// (F) Educational Details and (G) English Proficiency. Both lists are optional; the credit transfer /
// RPL question is required.
export function EducationStep({ form }) {
  return (
    <>
      <Section id="qualifications" title="Qualifications" description="Please provide details of your qualifications.">
        <div className="grid gap-6 sm:col-span-2">
          <QualificationList form={form} />
          <ChoiceCards {...form.field('creditTransfer')} label="Do you want to apply for credit transfer or RPL?" options={creditOptions} required />
        </div>
      </Section>
      <Section id="english" title="English proficiency" description="Please provide details any English test / course taken.">
        <div className="sm:col-span-2">
          <EnglishTestList form={form} />
        </div>
      </Section>
    </>
  )
}
