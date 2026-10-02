import { useState } from 'react'
import { enrolmentSteps as steps } from '../data/enrolment/enrolmentSteps'
import { clearDraft, emptyEnrolment, loadDraft, saveDraft } from '../lib/enrolmentDraft'
import { useDraftAutosave } from './useDraftAutosave'
import { validateEnrolmentStep } from '../lib/validateEnrolmentStep'

const startState = (course) => {
  const draft = loadDraft()
  const values = { ...emptyEnrolment(), ...draft?.values, ...(course ? { course, courseManual: false } : {}) }
  return { values, saved: draft?.saved ?? [], step: draft?.step ?? 0, savedAt: draft?.savedAt ?? null }
}

// Tab-by-tab enrolment form. "Save and continue" validates the current tab, stores the draft in this
// browser and opens the next tab (scrolling `topRef` into view); a tab can be revisited once the one before it is saved. UI only.
export function useEnrolmentForm(course, topRef) {
  const [state, setState] = useState(() => startState(course))
  const [errors, setErrors] = useState({})
  const [tried, setTried] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { values, saved, step } = state
  const current = steps[step]
  useDraftAutosave(state, (savedAt) => setState((s) => ({ ...s, savedAt })))

  const update = (patch) => {
    const next = { ...values, ...patch }
    setState((s) => ({ ...s, values: next }))
    if (tried) setErrors(validateEnrolmentStep(current.id, next))
  }
  const setValue = (key, value) => update({ [key]: value })
  const set = (key) => (e) => setValue(key, e.target.type === 'checkbox' ? e.target.checked : e.target.value)
  const toggle = (key, item) => setValue(key, values[key].includes(item) ? values[key].filter((x) => x !== item) : [...values[key], item])
  const setRow = (key, i, field) => (e) => setValue(key, values[key].map((row, j) => (j === i ? { ...row, [field]: e.target.value } : row)))
  const addRow = (key, empty) => setValue(key, [...values[key], { ...empty }])
  const removeRow = (key, i) => setValue(key, values[key].filter((_, j) => j !== i))

  const show = (index) => {
    setState((s) => ({ ...s, step: index }))
    setErrors({})
    setTried(false)
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
  const canOpen = (index) => index === 0 || saved.includes(steps[index - 1].id)
  const goTo = (index) => canOpen(index) && show(index)

  const save = (e) => {
    e.preventDefault()
    const found = validateEnrolmentStep(current.id, values)
    setTried(true)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) return e.currentTarget.querySelector(`[name="${first}"]`)?.focus()

    const last = step === steps.length - 1
    const next = {
      values, saved: saved.includes(current.id) ? saved : [...saved, current.id],
      step: last ? step : step + 1, savedAt: new Date().toISOString(),
    }
    if (last) {
      clearDraft()
      setSubmitted(true)
      return requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
    saveDraft(next)
    setState(next)
    show(next.step)
  }

  const restart = () => {
    clearDraft()
    setState(startState())
    setSubmitted(false)
    show(0)
  }

  return {
    steps, step, current, values, errors, saved, savedAt: state.savedAt, submitted,
    field: (name) => ({ name, value: values[name], onChange: set(name), error: errors[name] }),
    set, setValue, patch: update, toggle, setRow, addRow, removeRow, canOpen, goTo, save, restart,
    back: () => step > 0 && show(step - 1),
    isLast: step === steps.length - 1,
  }
}
