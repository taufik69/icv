import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { toCoursePayload } from '../lib/coursePayload'
import { toFormValues } from '../lib/courseFormValues'
import { getIn, setIn } from '../lib/setIn'
import { useSaveCourse } from './useCourseMutations'

// Controlled state for the add/edit course form. `bind('facts.intake')` wires an input; `save(status)`
// creates or patches the course, then opens its view page.
export function useCourseForm(course) {
  const [values, setValues] = useState(() => toFormValues(course))
  const save = useSaveCourse()
  const navigate = useNavigate()

  const set = (path, value) => setValues((v) => setIn(v, path, value))
  const bind = (path) => ({ value: getIn(values, path) ?? '', onChange: (e) => set(path, e.target.value) })

  const submit = (status) => {
    const body = { ...toCoursePayload(values, course), ...(status && { status }) }
    save.mutate(
      { id: course?.id, body },
      { onSuccess: (saved) => navigate({ to: '/dashboard/courses/$market/$slug', params: { market: saved.market, slug: saved.slug } }) },
    )
  }

  return { values, set, bind, submit, saving: save.isPending, error: save.error }
}
