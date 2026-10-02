import { heardOptions } from '../../data/applyOptions'
import { ApplySelect } from '../ApplySelect'
import { Field } from '../enrolment/fields/Field'
import { selectClass } from '../enrolment/fields/fieldStyles'

const heardChoices = heardOptions.map((o) => ({ value: o, label: o }))

// Step 5: how they heard about ICV, and anything else (both optional), then Send enquiry.
export function ExtraStep({ form }) {
  const { values, set } = form
  return (
    <div className="grid gap-5">
      <ApplySelect name="heard" label="How did you hear about us?" options={heardChoices} value={values.heard} onChange={set('heard')} triggerClass={selectClass} />
      <Field name="message" as="textarea" label="Anything else we should know?" value={values.message} onChange={set('message')}
        placeholder="Questions about intakes, fees, entry requirements…" rows={4} />
    </div>
  )
}
