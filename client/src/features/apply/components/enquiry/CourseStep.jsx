import { useRef, useState } from 'react'
import { courseOptions } from '../../data/applyOptions'
import { areaOfCourse, studyAreas } from '../../data/enquirySteps'
import { ApplySelect } from '../ApplySelect'
import { selectClass } from '../enrolment/fields/fieldStyles'
import { ChoiceCard } from './ChoiceCard'

const toChoice = (c) => ({ value: c.code, label: c.title, badge: c.code, group: c.group })

// Step 2: study-area tiles, then the course dropdown, which lists only the chosen area's courses (or every
// course before an area is picked / after "Show all courses"). Clicking an area with several courses opens
// the dropdown straight away; an area with one course picks it. A course from ?course= opens with its area set.
export function CourseStep({ form }) {
  const { values, setValue } = form
  const [area, setArea] = useState(() => areaOfCourse(values.course) ?? '')
  const [openKey, setOpenKey] = useState(0)
  const pointer = useRef(false)
  const chosen = studyAreas.find((a) => a.id === area)
  const options = courseOptions.filter((c) => !chosen || chosen.codes.includes(c.code)).map(toChoice)

  const pickArea = (next) => {
    setArea(next.id)
    if (next.codes.length === 1) return setValue('course', next.codes[0])
    if (!next.codes.includes(values.course)) setValue('course', '')
    if (pointer.current) setOpenKey((k) => k + 1) // keyboard users stay on the tiles
  }

  return (
    <div className="grid gap-6">
      <fieldset onPointerDown={() => { pointer.current = true }} onKeyDown={() => { pointer.current = false }}>
        <legend className="sr-only">Study area</legend>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {studyAreas.map((a) => (
            <ChoiceCard key={a.id} name="area" value={a.id} size="sm" Icon={a.Icon} title={a.label} checked={area === a.id} onChange={() => pickArea(a)} />
          ))}
        </div>
      </fieldset>
      <div className="grid gap-2">
        <ApplySelect
          name="course" label={chosen ? `Course in ${chosen.label}` : 'Course'} options={options} value={values.course} triggerClass={selectClass}
          placeholder={chosen ? `Choose one of ${options.length} courses` : 'Pick an area above, or any course here'} openKey={openKey}
          onChange={(e) => { setValue('course', e.target.value); if (!chosen) setArea(areaOfCourse(e.target.value) ?? '') }}
        />
        {chosen && (
          <button type="button" onClick={() => setArea('')} className="justify-self-start text-sm font-semibold text-secondary-muted underline-offset-2 hover:text-secondary hover:underline">
            Show all courses
          </button>
        )}
      </div>
    </div>
  )
}
