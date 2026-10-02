import { Field } from '../enrolment/fields/Field'

// Step 4 (optional): date of birth and postal address.
export function AboutStep({ form }) {
  const { values, errors, set } = form
  const field = (name) => ({ name, value: values[name], onChange: set(name), error: errors[name] })
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
      <Field {...field('dob')} label="Date of birth" type="date" autoComplete="bday" />
      <Field {...field('country')} label="Country" autoComplete="country-name" placeholder="e.g. Australia" />
      <Field {...field('street')} label="Street address" autoComplete="street-address" placeholder="House number and street" className="sm:col-span-2" />
      <Field {...field('city')} label="City" autoComplete="address-level2" />
      <Field {...field('state')} label="State / Province" autoComplete="address-level1" />
      <Field {...field('postcode')} label="ZIP / Postal code" autoComplete="postal-code" />
    </div>
  )
}
