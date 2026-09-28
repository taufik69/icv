import { contactContent } from '@/features/contact/data/contactContent'
import { useEnquiryForm } from '@/features/contact/hooks/useEnquiryForm'
import { ArrowRightIcon } from '@/shared/components/icons'
import { Field } from './Field'
import { StudentTypeField } from './StudentTypeField'

const { form } = contactContent
const f = form.fields

// "Enrol For Courses Today": 2-column form card. All fields required, validated on submit.
export function EnquiryForm() {
  const { values, errors, set, submit } = useEnquiryForm({ to: form.to, labels: f })
  const text = (name, type = 'text', autoComplete) => (
    <Field name={name} label={f[name]} type={type} autoComplete={autoComplete} value={values[name]} onChange={set(name)} error={errors[name]} />
  )

  return (
    <form noValidate onSubmit={submit} aria-labelledby="enquiry-title" className="rounded-3xl bg-surface p-6 shadow-card ring-1 ring-line-soft md:p-10">
      <h2 id="enquiry-title" className="text-3xl leading-tight md:text-4xl">{form.title}</h2>
      <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-pill bg-primary" />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {text('firstName', 'text', 'given-name')}
        {text('lastName', 'text', 'family-name')}
        {text('email', 'email', 'email')}
        {text('phone', 'tel', 'tel')}
        <StudentTypeField label={f.studentType} options={form.studentTypes} value={values.studentType} error={errors.studentType} onChange={set('studentType')} />
        {text('visa')}
        {text('location', 'text', 'address-level2')}
        <Field as="select" name="course" label={f.course} value={values.course} onChange={set('course')} error={errors.course} className="sm:col-span-2">
          <option value="">{form.placeholderCourse}</option>
          {form.courses.map((c) => <option key={c} value={c}>{c}</option>)}
        </Field>
        <Field as="textarea" name="message" label={f.message} value={values.message} onChange={set('message')} error={errors.message} className="sm:col-span-2" />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" className="group btn-shine inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-heading font-semibold text-on-primary shadow-card transition hover:bg-primary-hover">
          {form.submit}
          <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  )
}
