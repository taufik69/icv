import { useState } from 'react'
import { validateApplication } from '../lib/validateApplication'
import { useSubmitApplication } from './useSubmitApplication'

const EMPTY = {
  studentType: '', firstName: '', lastName: '', email: '', phone: '', dob: '',
  street: '', city: '', state: '', postcode: '', country: '', course: '', message: '', heard: '',
}

// Form state for one application. `initial` pre-fills fields (e.g. the course from ?course=).
// Errors show after the first submit attempt; a valid form is sent to the API.
export function useApplyForm(initial) {
  const [values, setValues] = useState(() => ({ ...EMPTY, ...initial }))
  const [errors, setErrors] = useState({})
  const [tried, setTried] = useState(false)
  const mutation = useSubmitApplication()

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
    mutation.mutate(values)
  }

  return { values, errors, set, submit, sending: mutation.isPending, sent: mutation.isSuccess, failed: mutation.isError }
}
