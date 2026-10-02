import { australianStates } from '../../../data/enrolment/enrolmentOptions'
import { Field } from '../fields/Field'
import { Section } from '../fields/Section'
import { Select } from '../fields/Select'

const stateChoices = australianStates.map((s) => ({ value: s, label: s }))

// (C) Contact Details and (D) Emergency Contact Details
export function ContactStep({ form }) {
  const { field } = form
  return (
    <>
      <Section id="home" title="Address in home country">
        <Field {...field('homeAddress')} label="Address" placeholder="House number, street and area" required autoComplete="street-address" className="sm:col-span-2" />
        <Field {...field('homeCity')} label="City" placeholder="e.g. Kathmandu" required autoComplete="address-level2" />
        <Field {...field('homeCountry')} label="Country" placeholder="e.g. Nepal" required autoComplete="country-name" />
        <Field {...field('homePostcode')} label="Post code" placeholder="e.g. 44600" autoComplete="postal-code" />
      </Section>
      <Section id="australia" title="Address in Australia" note="If applicable">
        <Field {...field('auAddress')} label="Address" placeholder="Unit, street number and street name" className="sm:col-span-2" />
        <Field {...field('auSuburb')} label="Suburb" placeholder="e.g. West Melbourne" />
        <Select {...field('auState')} label="State" options={stateChoices} placeholder="Choose a state" />
        <Field {...field('auPostcode')} label="Post code" placeholder="e.g. 3003" inputMode="numeric" />
      </Section>
      <Section id="reach" title="Phone and email" description="We send your letter of offer to this email address.">
        <Field {...field('mobile')} label="Mobile" placeholder="e.g. +61 400 123 456" required type="tel" autoComplete="tel" />
        <Field {...field('phone')} label="Phone number" placeholder="Including country code" type="tel" />
        <Field {...field('email')} label="Email address" placeholder="name@example.com" required type="email" autoComplete="email" className="sm:col-span-2" />
      </Section>
      <Section id="emergency" title="Emergency contact" description="Someone we can call if something happens to you.">
        <Field {...field('emergencyName')} label="Name" placeholder="Full name" required />
        <Field {...field('emergencyRelationship')} label="Relationship" placeholder="e.g. Mother, brother, spouse" required />
        <Field {...field('emergencyNumber')} label="Number" placeholder="Including country code" required type="tel" />
      </Section>
    </>
  )
}
