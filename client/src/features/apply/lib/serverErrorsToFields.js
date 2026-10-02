import { enrolmentFields } from '../data/enrolment/enrolmentFields'
import { enrolmentSteps } from '../data/enrolment/enrolmentSteps'

const owner = (path) => {
  const key = path.replace(/^attachment_\w+$/, 'attachments')
  return enrolmentFields.find((f) => key === f.path || key.startsWith(`${f.path}.`))
}
const sentence = (s) => `${s[0].toUpperCase()}${s.slice(1)}${/[.!?]$/.test(s) ? '' : '.'}`

// The API's error `details` ({ "personal.dob": ["use YYYY-MM-DD"] }) → form errors ({ dob: "Use YYYY-MM-DD." })
// plus the index of the earliest step that has one, so the form can open it. Paths with no field are
// left out (the general message still shows).
export function serverErrorsToFields(details = {}) {
  const errors = {}
  let step = -1
  for (const [path, messages] of Object.entries(details ?? {})) {
    const field = owner(path)
    if (!field || errors[field.field]) continue
    errors[field.field] = sentence(messages?.[0] ?? 'check this answer')
    const index = enrolmentSteps.findIndex((s) => s.id === field.step)
    if (step === -1 || index < step) step = index
  }
  return { errors, step }
}
