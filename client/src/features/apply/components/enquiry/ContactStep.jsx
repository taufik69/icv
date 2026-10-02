import { Field } from '../enrolment/fields/Field'

// Step 3: name, email (required) and phone.
export function ContactStep({ form }) {
  const { values, errors, set } = form
  const field = (name) => ({ name, value: values[name], onChange: set(name), error: errors[name] })
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
      <Field {...field('firstName')} label="First name" required autoComplete="given-name" placeholder="e.g. Jane" autoFocus />
      <Field {...field('lastName')} label="Last name" required autoComplete="family-name" placeholder="e.g. Smith" />
      <Field {...field('email')} label="Email" required type="email" autoComplete="email" placeholder="name@example.com" className="sm:col-span-2" />
      <Field {...field('phone')} label="Phone number" type="tel" autoComplete="tel" placeholder="e.g. +61 4xx xxx xxx" className="sm:col-span-2" />
    </div>
  )
}
