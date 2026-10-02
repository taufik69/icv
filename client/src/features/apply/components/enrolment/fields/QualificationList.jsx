import { emptyQualification } from '../../../data/enrolment/enrolmentOptions'
import { inputClass, labelClass } from './fieldStyles'
import { ListShell } from './ListShell'

const columns = [
  { field: 'qualification', label: 'Qualification', placeholder: 'e.g. Higher Secondary Certificate' },
  { field: 'year', label: 'Completion year', placeholder: 'e.g. 2022', inputMode: 'numeric' },
  { field: 'country', label: 'Country', placeholder: 'e.g. India' },
]
const grid = 'grid gap-3 sm:grid-cols-[minmax(0,1fr)_8rem_10rem]'

// (F) qualifications as a small table: column names once in a header on sm+, labels per field on phones.
export function QualificationList({ form }) {
  const { values, setRow, addRow, removeRow } = form
  const header = (
    <div aria-hidden="true" className="hidden grid-cols-[1.75rem_minmax(0,1fr)] gap-4 border-b border-line bg-surface-alt px-4 py-2.5 pr-12 sm:grid">
      <span />
      <div className={grid}>{columns.map((c) => <span key={c.field} className={labelClass}>{c.label}</span>)}</div>
    </div>
  )

  return (
    <ListShell
      header={header}
      items={values.qualifications}
      itemLabel="qualification"
      addLabel="Add another qualification"
      onAdd={() => addRow('qualifications', emptyQualification)}
      onRemove={(i) => removeRow('qualifications', i)}
      renderItem={(row, i) => (
        <div className={grid}>
          {columns.map((c) => {
            const id = `apply-qualifications-${i}-${c.field}`
            return (
              <div key={c.field} className="grid gap-1.5">
                <label htmlFor={id} className={`${labelClass} sm:sr-only`}>{c.label}</label>
                <input id={id} value={row[c.field]} onChange={setRow('qualifications', i, c.field)} placeholder={c.placeholder} inputMode={c.inputMode} className={inputClass} />
              </div>
            )
          })}
        </div>
      )}
    />
  )
}
