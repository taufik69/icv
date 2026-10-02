import { useState } from 'react'
import { courseOptions } from '../../data/applyOptions'
import { areaOfCourse, studyAreas } from '../../data/enquirySteps'
import { ApplySelect } from '../ApplySelect'
import { selectClass } from '../enrolment/fields/fieldStyles'
import { ChoiceCard } from './ChoiceCard'

const allCourses = courseOptions.map((c) => ({ value: c.code, label: c.title, badge: c.code, group: c.group }))

// Step 2: pick a study area tile, then one of its courses (listed under the tiles); or choose any course
// from the full list. A course from ?course= opens with its area already picked.
export function CourseStep({ form }) {
  const { values, setValue } = form
  const [area, setArea] = useState(() => areaOfCourse(values.course) ?? '')
  const inArea = studyAreas.find((a) => a.id === area)?.codes ?? []
  const pickArea = (id) => {
    setArea(id)
    const codes = studyAreas.find((a) => a.id === id).codes
    if (!codes.includes(values.course)) setValue('course', codes.length === 1 ? codes[0] : '')
  }

  return (
    <div className="grid gap-6">
      <fieldset>
        <legend className="sr-only">Study area</legend>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {studyAreas.map((a) => (
            <ChoiceCard key={a.id} name="area" value={a.id} size="sm" Icon={a.Icon} title={a.label} checked={area === a.id} onChange={() => pickArea(a.id)} />
          ))}
        </div>
      </fieldset>
      {inArea.length > 1 && (
        <fieldset className="grid gap-2">
          <legend className="mb-2 font-heading text-sm font-semibold text-secondary">Which course?</legend>
          {courseOptions.filter((c) => inArea.includes(c.code)).map((c) => (
            <label key={c.code} className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 ring-1 ring-line transition hover:ring-line-strong has-checked:bg-surface-muted has-checked:ring-secondary has-focus-visible:ring-2 has-focus-visible:ring-secondary">
              <input type="radio" name="courseChoice" value={c.code} checked={values.course === c.code} onChange={() => setValue('course', c.code)} className="size-4 accent-secondary" />
              <span className="min-w-0 flex-1 text-ink">{c.title}</span>
              <span className="rounded-md bg-surface-muted px-2 py-0.5 font-heading text-xs font-bold text-secondary">{c.code}</span>
            </label>
          ))}
        </fieldset>
      )}
      <ApplySelect name="course" label="Or choose a course" options={allCourses} value={values.course} triggerClass={selectClass}
        placeholder="Any course from the list" onChange={(e) => { setValue('course', e.target.value); setArea(areaOfCourse(e.target.value) ?? '') }} />
    </div>
  )
}
