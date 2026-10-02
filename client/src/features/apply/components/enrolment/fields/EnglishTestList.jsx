import { emptyEnglishTest } from '../../../data/enrolment/enrolmentOptions'
import { inputClass, labelClass } from './fieldStyles'
import { ListShell } from './ListShell'
import { ScorePanel } from './ScorePanel'

// (G) English tests: test name + date on one line, the scores panel under them.
export function EnglishTestList({ form }) {
  const { values, setRow, addRow, removeRow } = form

  return (
    <ListShell
      items={values.englishTests}
      itemLabel="test"
      addLabel="Add another test"
      onAdd={() => addRow('englishTests', emptyEnglishTest)}
      onRemove={(i) => removeRow('englishTests', i)}
      renderItem={(row, i) => (
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_11rem]">
            <div className="grid gap-1.5">
              <label htmlFor={`apply-englishTests-${i}-test`} className={labelClass}>Test name</label>
              <input id={`apply-englishTests-${i}-test`} value={row.test} onChange={setRow('englishTests', i, 'test')} placeholder="e.g. IELTS Academic, PTE, TOEFL" className={inputClass} />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor={`apply-englishTests-${i}-date`} className={labelClass}>Date taken</label>
              <input id={`apply-englishTests-${i}-date`} type="date" value={row.date} onChange={setRow('englishTests', i, 'date')} className={inputClass} />
            </div>
          </div>
          <ScorePanel name={`englishTests-${i}`} row={row} onChange={(f) => setRow('englishTests', i, f)} />
        </div>
      )}
    />
  )
}
