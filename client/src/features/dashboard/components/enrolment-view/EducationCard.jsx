import { formatDate } from '../../lib/formatDate'
import { MiniTable } from './MiniTable'
import { SectionCard } from './SectionCard'

const num = 'text-center tabular-nums'
const qualificationColumns = [
  { key: 'qualification', label: 'Qualification' }, { key: 'year', label: 'Completion year' }, { key: 'country', label: 'Country' },
]
const testColumns = [
  { key: 'test', label: 'Test' }, { key: 'date', label: 'Date taken' },
  ...['reading', 'writing', 'speaking', 'listening'].map((k) => ({ key: k, label: `${k[0].toUpperCase()}${k.slice(1)}`, className: num })),
  { key: 'overall', label: 'Overall', className: `${num} font-semibold` },
]

// (F) qualifications + credit transfer / RPL and (G) English tests.
export function EducationCard({ education }) {
  const tests = education.englishTests.map((t) => ({ ...t, date: t.date && formatDate(t.date) }))
  return (
    <SectionCard id="education" letters="F G" title="Education and English" aside={`Credit transfer or RPL: ${education.creditTransfer ? 'Yes' : 'No'}`}>
      <div className="grid gap-6">
        <div className="grid gap-2.5">
          <h3 className="text-base">Qualifications</h3>
          <MiniTable caption="Qualifications" columns={qualificationColumns} rows={education.qualifications} empty="No qualifications given." />
        </div>
        <div className="grid gap-2.5">
          <h3 className="text-base">English tests</h3>
          <MiniTable caption="English tests" columns={testColumns} rows={tests} empty="No English test given." />
        </div>
      </div>
    </SectionCard>
  )
}
