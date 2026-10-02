import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { applyApi } from '../api/applyApi'
import { enquirySteps as steps } from '../data/enquirySteps'
import { validateApplication } from '../lib/validateApplication'

const EMPTY = {
  studentType: '', firstName: '', lastName: '', email: '', phone: '', dob: '',
  street: '', city: '', state: '', postcode: '', country: '', course: '', message: '', heard: '',
}
const pick = (errors, fields) => Object.fromEntries(Object.entries(errors).filter(([k]) => fields.includes(k)))

// The step-by-step enquiry form. Continue checks only the open step; the last step sends to the API.
// Field errors from the server open the first step that has one. `initial` pre-fills (e.g. ?course=).
export function useEnquiryWizard(initial) {
  const [values, setValues] = useState(() => ({ ...EMPTY, ...initial }))
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})
  const send = useMutation({ mutationFn: applyApi.submit })
  const current = steps[step]
  const last = step === steps.length - 1

  const setValue = (key, value) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (errors[key]) setErrors(pick(validateApplication(next), current.fields))
  }
  const set = (key) => (e) => setValue(key, e.target.value)

  const next = (e) => {
    e?.preventDefault()
    const found = pick(validateApplication(values), current.fields)
    setErrors(found)
    if (Object.keys(found).length) return false
    if (!last) return setStep(step + 1)
    send.mutate(values, {
      onError: (err) => {
        const fields = Object.fromEntries(Object.entries(err.details ?? {}).map(([k, v]) => [k, `Please check this (${[v].flat()[0]}).`]))
        const at = steps.findIndex((s) => s.fields.some((f) => fields[f]))
        if (at >= 0) { setStep(at); setErrors(pick(fields, steps[at].fields)) }
      },
    })
  }
  const back = () => { setErrors({}); setStep((s) => Math.max(0, s - 1)) }

  return {
    steps, step, current, last, values, errors, set, setValue, next, back,
    sent: send.isSuccess, sending: send.isPending, sendError: send.error,
  }
}
