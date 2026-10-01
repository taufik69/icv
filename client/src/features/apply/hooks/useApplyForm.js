import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { applyApi } from '../api/applyApi'
import { validateApplication } from '../lib/validateApplication'

const EMPTY = {
  studentType: '', firstName: '', lastName: '', email: '', phone: '', dob: '',
  street: '', city: '', state: '', postcode: '', country: '', course: '', message: '', heard: '',
}

// Form state for one application. `initial` pre-fills fields (e.g. the course from ?course=).
// Errors show after the first submit attempt; a valid form is sent to the API, then the success state shows.
// Field errors the server reports (e.g. an email it rejects) are shown on those fields.
export function useApplyForm(initial) {
  const [values, setValues] = useState(() => ({ ...EMPTY, ...initial }))
  const [errors, setErrors] = useState({})
  const [tried, setTried] = useState(false)
  const send = useMutation({ mutationFn: applyApi.submit })

  const set = (key) => (e) => {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (tried) setErrors(validateApplication(next))
  }

  const submit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setTried(true)
    const found = validateApplication(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) return form.querySelector(`[name="${first}"]`)?.focus()
    send.mutate(values, {
      onSuccess: () => form.closest('section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), // keep the success message in view
      onError: (err) => {
        const fieldErrors = Object.fromEntries(Object.entries(err.details ?? {}).map(([k, v]) => [k, `Please check this field (${[v].flat()[0]}).`]))
        setErrors(fieldErrors)
      },
    })
  }

  return { values, errors, set, submit, sent: send.isSuccess, sending: send.isPending, sendError: send.error }
}
