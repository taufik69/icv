import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { toCoursePayload } from '../lib/coursePayload'
import { toFormValues } from '../lib/courseFormValues'
import { getIn, setIn } from '../lib/setIn'
import { slugify } from '../lib/slugify'
import { validateCourseForm } from '../lib/validateCourseForm'
import { useSaveCourse } from './useCourseMutations'

// Controlled state for the add/edit course form. `bind('facts.intake')` wires an input (with its error);
// typing the title regenerates the page address (slug); `submit(status)` checks the fields first
// (problems show on their fields and in the error box, and the page scrolls to the first), then
// creates or patches the course and opens its view page.
export function useCourseForm(course) {
  const [values, setValues] = useState(() => toFormValues(course))
  const [errors, setErrors] = useState({})
  const save = useSaveCourse()
  const navigate = useNavigate()

  // The page address always follows the title (on new and existing courses); untouched titles keep theirs.
  const set = (path, value) => {
    setValues((v) => {
      const next = setIn(v, path, value)
      return path === 'title' ? { ...next, slug: slugify(value) } : next
    })
    // Editing a field clears its error (Save checks everything again).
    if (errors[path]) setErrors((all) => Object.fromEntries(Object.entries(all).filter(([key]) => key !== path)))
  }
  const bind = (path) => ({ value: getIn(values, path) ?? '', onChange: (e) => set(path, e.target.value), error: errors[path] })

  const submit = (status) => {
    const found = validateCourseForm(values)
    setErrors(found)
    if (Object.keys(found).length) {
      return requestAnimationFrame(() => document.querySelector('[data-error]')?.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' }))
    }
    const body = { ...toCoursePayload(values, course), ...(status && { status }) }
    save.mutate(
      { id: course?.id, body, previous: course && { market: course.market, slug: course.slug } },
      { onSuccess: (saved) => navigate({ to: '/dashboard/courses/$market/$slug', params: { market: saved.market, slug: saved.slug } }) },
    )
  }

    // The error box lists the form's own problems first, otherwise whatever the API refused.
  const problems = Object.keys(errors).length ? { message: 'Fix the highlighted fields', details: errors } : null
  return { values, set, bind, submit, saving: save.isPending, error: problems ?? save.error }
}
