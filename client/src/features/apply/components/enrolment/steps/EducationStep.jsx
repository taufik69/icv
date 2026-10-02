import { creditAnswers } from '../../../data/enrolment/enrolmentOptions'
import { ChoiceCards } from '../fields/ChoiceCards'
import { EnglishTestList } from '../fields/EnglishTestList'
import { QualificationList } from '../fields/QualificationList'

const creditOptions = [
  { value: creditAnswers[0], note: 'Attach copies of your documents in the last step.' },
  { value: creditAnswers[1], note: 'Continue without credit transfer or RPL.' },
]

const Section = ({ title, lead, children }) => (
  <section className="grid gap-4">
    <div>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-1 text-sm text-ink-muted">{lead}</p>
    </div>
    {children}
  </section>
)

// (F) Educational Details and (G) English Proficiency. Both lists are optional; the credit transfer /
// RPL question is required.
export function EducationStep({ form }) {
  return (
    <div className="grid gap-10">
      <Section title="Qualifications" lead="Please provide details of your qualifications.">
        <QualificationList form={form} />
        <ChoiceCards {...form.field('creditTransfer')} label="Do you want to apply for credit transfer or RPL?" options={creditOptions} required className="mt-2" />
      </Section>
      <Section title="English proficiency" lead="Please provide details any English test / course taken.">
        <EnglishTestList form={form} />
      </Section>
    </div>
  )
}
