import { yesNo } from '../../../data/enrolment/enrolmentOptions'
import { ChoiceGroup } from '../fields/ChoiceGroup'
import { Field } from '../fields/Field'
import { Section } from '../fields/Section'

// (H) Visa Details and (I) Address of Australian Immigration or Commission Office. As on the paper form,
// Visa type / Subclass / Expiry date are always shown; they fade out on "No" and are required on "Yes".
export function VisaStep({ form }) {
  const { values, field } = form
  const holds = values.holdsVisa === 'Yes'
  return (
    <>
      <Section id="visa" title="Visa details">
        <ChoiceGroup {...field('holdsVisa')} label="Do you currently hold any type of Australian Visa?" options={yesNo} required look="check" className="sm:col-span-2" />
        <fieldset disabled={values.holdsVisa === 'No'} className="grid gap-4 transition disabled:opacity-50 sm:col-span-2 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.3fr)]">
          <legend className="sr-only">Your current visa</legend>
          <Field {...field('visaType')} label="Visa type" placeholder="e.g. Student visa" required={holds} />
          <Field {...field('visaSubclass')} label="Subclass" placeholder="e.g. 500" inputMode="numeric" maxLength={3} />
          <Field {...field('visaExpiry')} label="Expiry date" type="date" />
        </fieldset>
      </Section>

      <Section id="office" title="Immigration or Commission Office"
        description="Address of Australian Immigration or Commission Office where Visa application is lodged or will be lodged.">
        <Field {...field('immigrationOffice')} label="Address (City & Country)" placeholder="e.g. Australian High Commission, New Delhi, India" className="sm:col-span-2" />
        <Field {...field('visaApplicationDate')} label="Date (or intended date) of application" type="date" />
      </Section>
    </>
  )
}
