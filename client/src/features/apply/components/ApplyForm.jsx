import { courseOptions, heardOptions } from '../data/applyOptions'
import { ApplyField } from './ApplyField'
import { ApplySelect } from './ApplySelect'
import { FormGroup } from './FormGroup'
import { StudentTypeChoice } from './StudentTypeChoice'

const courseChoices = courseOptions.map((c) => ({ value: c.code, label: c.title, badge: c.code, group: c.group }))
const heardChoices = heardOptions.map((o) => ({ value: o, label: o }))

// Fields and order follow the live icv.edu.au "Course Enquiry" form.
export function ApplyForm({ form }) {
  const { values, errors, set, submit } = form
  const field = (name) => ({ name, value: values[name], onChange: set(name), error: errors[name] })

  return (
    <form noValidate onSubmit={submit} aria-labelledby="apply-title" className="grid gap-6">
      <div>
        <h2 id="apply-title" className="text-3xl">Course enquiry</h2>
        <p className="mt-1.5 text-ink-muted">Fields marked * are required. Everything else helps us advise you.</p>
      </div>

      <FormGroup title="About you">
        <StudentTypeChoice value={values.studentType} error={errors.studentType} onChange={set('studentType')} />
        <ApplyField {...field('firstName')} label="First name" required autoComplete="given-name" />
        <ApplyField {...field('lastName')} label="Last name" required autoComplete="family-name" />
        <ApplyField {...field('email')} label="Email" required type="email" autoComplete="email" />
        <ApplyField {...field('phone')} label="Phone number" type="tel" autoComplete="tel" />
        <ApplyField {...field('dob')} label="Date of birth" type="date" autoComplete="bday" />
      </FormGroup>

      <FormGroup title="Address" note="Optional">
        <ApplyField {...field('street')} label="Street address" autoComplete="street-address" className="sm:col-span-2" />
        <ApplyField {...field('city')} label="City" autoComplete="address-level2" />
        <ApplyField {...field('state')} label="State / Province" autoComplete="address-level1" />
        <ApplyField {...field('postcode')} label="ZIP / Postal code" autoComplete="postal-code" />
        <ApplyField {...field('country')} label="Country" autoComplete="country-name" />
      </FormGroup>

      <FormGroup title="Your course">
        <ApplySelect {...field('course')} label="What course are you interested in?" options={courseChoices} className="sm:col-span-2" />
        <ApplyField {...field('message')} as="textarea" label="Anything else we should know?" className="sm:col-span-2" />
        <ApplySelect {...field('heard')} label="How did you hear about us?" options={heardChoices} className="sm:col-span-2" />
      </FormGroup>

      {form.failed && (
        <p role="alert" className="rounded-xl bg-danger-soft px-4 py-3 text-sm text-danger-ink">
          Your application wasn't sent. Check your connection and try again, or call us on 03 9942 1836.
        </p>
      )}
      <div className="flex justify-end border-t border-line-soft pt-6">
        <button type="submit" disabled={form.sending} className="btn-shine w-full rounded-pill bg-primary px-8 py-3 font-heading font-semibold text-on-primary transition hover:bg-primary-hover disabled:opacity-60 sm:w-auto">
          {form.sending ? 'Sending…' : 'Submit application'}
        </button>
      </div>
    </form>
  )
}
