import { RichTextField } from '../rich-text/RichTextField'
import { FormSection } from './FormSection'
import { RowList } from './RowList'
import { InputField } from './fields/InputField'
import { SelectField } from './fields/SelectField'

const widths = 'sm:grid-cols-[9rem_minmax(0,1fr)]'
const columns = [
  { key: 'code', label: 'Code', placeholder: 'CPCCBC4001', required: true },
  { key: 'title', label: 'Unit title', required: true },
]
const displayOptions = [
  { value: 'tabs', label: 'Core / elective tabs', hint: 'Two tabs on the course page' },
  { value: 'table', label: 'Table with hours', hint: 'One table with training hours' },
]

// Packaging rules + core and elective unit lists.
export function UnitsSection({ values, set, bind }) {
  const { core, elective } = values.units
  return (
    <FormSection id="units" title="Units" optional>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InputField label="Section title" placeholder="Format and Packaging Rules" {...bind('units.title')} />
        <SelectField label="Display" options={displayOptions} {...bind('units.display')} />
      </div>
      <RichTextField
        label="Packaging rules"
        placeholder="To achieve this qualification, the candidate must demonstrate competency in…"
        value={values.units.rulesHtml}
        onChange={(html) => set('units.rulesHtml', html)}
      />
      <div>
        <h3 className="mb-3 text-base">Core units <span className="font-normal text-ink-subtle">({core.length})</span></h3>
        <RowList itemLabel="Unit" columns={columns} rows={core} onChange={(rows) => set('units.core', rows)} blank={{ code: '', title: '' }} addLabel="Add a core unit" widths={widths} />
      </div>
      <div className="border-t border-line-soft pt-5">
        <h3 className="mb-3 text-base">Elective units <span className="font-normal text-ink-subtle">({elective.length})</span></h3>
        <RowList itemLabel="Unit" columns={columns} rows={elective} onChange={(rows) => set('units.elective', rows)} blank={{ code: '', title: '' }} addLabel="Add an elective unit" widths={widths} />
      </div>
    </FormSection>
  )
}
