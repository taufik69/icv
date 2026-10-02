import { genders, titles } from '../../../data/enrolment/enrolmentOptions'
import { BoxField } from '../fields/BoxField'
import { ChoiceGroup } from '../fields/ChoiceGroup'
import { Field } from '../fields/Field'
import { Section } from '../fields/Section'

// (B) Personal Details in three parts: name (as in the passport), about you, passport.
export function PersonalStep({ form }) {
  const { field } = form
  return (
    <>
      <Section id="name" title="Your name">
        <ChoiceGroup {...field('title')} label="Title" options={titles} required fill className="sm:col-span-2" />
        <Field {...field('givenNames')} label="Given name(s)" placeholder="e.g. Priya" required autoComplete="given-name" />
        <Field {...field('lastName')} label="Last name" placeholder="e.g. Sharma" required autoComplete="family-name" />
      </Section>

      <Section id="about" title="About you">
        <ChoiceGroup {...field('gender')} label="Gender" options={genders} required fill />
        <Field {...field('dob')} label="Date of birth" required type="date" autoComplete="bday" />
        <Field {...field('countryOfBirth')} label="Country of birth" placeholder="e.g. India" required />
        <Field {...field('nationality')} label="Nationality" placeholder="e.g. Indian" required />
        <Field {...field('firstLanguage')} label="First language" placeholder="e.g. Hindi" />
      </Section>

      <Section id="passport" title="Passport">
        <BoxField {...field('passportNumber')} label="Passport number" required hint="Type your passport number, up to 12 characters. A preview shows here." className="sm:col-span-2" />
        <Field {...field('passportExpiry')} label="Expiry date" required type="date" />
      </Section>
    </>
  )
}
