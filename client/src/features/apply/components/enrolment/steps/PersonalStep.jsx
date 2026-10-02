import { genders, titles } from '../../../data/enrolment/enrolmentOptions'
import { ApplyField } from '../../ApplyField'
import { BoxField } from '../fields/BoxField'
import { ChoiceGroup } from '../fields/ChoiceGroup'

// (B) Personal Details in two equal columns with no gaps (one column on phones): Title | Given name(s),
// Last name | Gender, Date of birth | Country of birth, Nationality | First language; then the passport
// block on a 6-column grid (boxed number | expiry date).
export function PersonalStep({ form }) {
  const { field } = form
  return (
    <>
      <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
        <ChoiceGroup {...field('title')} label="Title" options={titles} required fill />
        <ApplyField {...field('givenNames')} label="Given name(s)" placeholder="As shown in your passport" required autoComplete="given-name" />
        <ApplyField {...field('lastName')} label="Last name" placeholder="As shown in your passport" required autoComplete="family-name" />
        <ChoiceGroup {...field('gender')} label="Gender" options={genders} required fill />
        <ApplyField {...field('dob')} label="Date of birth" required type="date" autoComplete="bday" />
        <ApplyField {...field('countryOfBirth')} label="Country of birth" placeholder="e.g. India" required />
        <ApplyField {...field('nationality')} label="Nationality" placeholder="e.g. Indian" required />
        <ApplyField {...field('firstLanguage')} label="First language" placeholder="e.g. Hindi" />
      </div>

      <fieldset className="border-t border-line-soft pt-6">
        <legend className="float-left mb-4 w-full font-heading text-lg font-bold text-secondary">Passport</legend>
        <div className="clear-both grid grid-cols-1 items-start gap-x-4 gap-y-5 md:grid-cols-6">
          <BoxField {...field('passportNumber')} label="Passport number" required hint="Type your passport number, up to 12 characters. A preview shows here." className="md:col-span-4" />
          <ApplyField {...field('passportExpiry')} label="Expiry date" required type="date" className="md:col-span-2" />
        </div>
      </fieldset>
    </>
  )
}
