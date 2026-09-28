import { useState } from 'react'
import { validateApplication } from '../lib/validateApplication'

const EMPTY = {
  studentType: '', firstName: '', lastName: '', email: '', phone: '', dob: '',
  street: '', city: '', state: '', postcode: '', country: '', course: '', message: '', heard: '',
}

// Form state for one application. `initial` pre-fills fields (e.g. the course from ?course=).
// Errors show after the first submit attempt. UI only: a valid form just shows the success state (nothing is sent).
export function useApplyForm(initial) {
  const [values, setValues] = useState(() => ({ ...EMPTY, ...initial }))
  const [errors, setErrors] = useState({})
  const [tried, setTried] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (key) => (e) => {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (tried) setErrors(validateApplication(next))
  }

  const submit = (e) => {
    e.preventDefault()
    setTried(true)
    const found = validateApplication(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) return e.currentTarget.querySelector(`[name="${first}"]`)?.focus()
    setSent(true)
    e.currentTarget.closest('section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) // keep the success message in view
  }

  return { values, errors, set, submit, sent }
}
