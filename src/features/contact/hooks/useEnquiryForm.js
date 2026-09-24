import { useState } from 'react'
import { buildMailto } from '@/features/contact/lib/buildMailto'
import { validateEnquiry } from '@/features/contact/lib/validateEnquiry'

const EMPTY = { firstName: '', lastName: '', email: '', phone: '', studentType: '', visa: '', location: '', course: '', message: '' }

// Controlled form state + validation. Errors show after the first submit attempt and update as the user types.
export function useEnquiryForm({ to, labels }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [tried, setTried] = useState(false)

  const set = (key) => (e) => {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (tried) setErrors(validateEnquiry(next))
  }

  const submit = (e) => {
    e.preventDefault()
    setTried(true)
    const found = validateEnquiry(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      e.currentTarget.querySelector(`[name="${first}"]`)?.focus()
      return
    }
    window.location.href = buildMailto(to, labels, values)
  }

  return { values, errors, set, submit }
}
