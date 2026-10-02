import { australianStates } from '../../../data/enrolment/enrolmentOptions'
import { ApplyField } from '../../ApplyField'
import { ApplySelect } from '../../ApplySelect'
import { FormGroup } from '../../FormGroup'

const stateChoices = australianStates.map((s) => ({ value: s, label: s }))

// (C) Contact Details and (D) Emergency Contact Details
export function ContactStep({ form }) {
  const { field } = form
  return (
    <>
      <FormGroup title="Address in home country">
        <ApplyField {...field('homeAddress')} label="Address" placeholder="House number, street and area" required autoComplete="street-address" className="sm:col-span-2" />
        <ApplyField {...field('homeCity')} label="City" placeholder="e.g. Kathmandu" required autoComplete="address-level2" />
        <ApplyField {...field('homeCountry')} label="Country" placeholder="e.g. Nepal" required autoComplete="country-name" />
        <ApplyField {...field('homePostcode')} label="Post code" placeholder="e.g. 44600" autoComplete="postal-code" />
      </FormGroup>
      <FormGroup title="Address in Australia" note="If applicable">
        <ApplyField {...field('auAddress')} label="Address" placeholder="Unit, street number and street name" className="sm:col-span-2" />
        <ApplyField {...field('auSuburb')} label="Suburb" placeholder="e.g. West Melbourne" />
        <ApplySelect {...field('auState')} label="State" options={stateChoices} placeholder="Choose a state" />
        <ApplyField {...field('auPostcode')} label="Post code" placeholder="e.g. 3003" inputMode="numeric" />
      </FormGroup>
      <FormGroup title="Phone and email">
        <ApplyField {...field('mobile')} label="Mobile" placeholder="e.g. +61 400 123 456" required type="tel" autoComplete="tel" />
        <ApplyField {...field('phone')} label="Phone number" placeholder="Including country code" type="tel" />
        <ApplyField {...field('email')} label="Email address" placeholder="name@example.com" required type="email" autoComplete="email" className="sm:col-span-2" />
      </FormGroup>
      <FormGroup title="Emergency contact">
        <ApplyField {...field('emergencyName')} label="Name" placeholder="Full name" required />
        <ApplyField {...field('emergencyRelationship')} label="Relationship" placeholder="e.g. Mother, brother, spouse" required />
        <ApplyField {...field('emergencyNumber')} label="Number" placeholder="Including country code" required type="tel" />
      </FormGroup>
    </>
  )
}
