import { sampleUnits } from '../../data/courseFormBlocks'
import { FormSection } from './FormSection'
import { RowList } from './RowList'
import { InputField } from './fields/InputField'
import { TextAreaField } from './fields/TextAreaField'

const widths = 'sm:grid-cols-[9rem_minmax(0,1fr)]'

// Packaging rules + core and elective unit lists (two tabs on the public page).
export function UnitsSection() {
  return (
    <FormSection id="units" title="Units" optional>
      <InputField label="Section title" placeholder="Format and packaging rules" />
      <TextAreaField label="Packaging rules" rows={3} placeholder="To achieve this qualification, the candidate must demonstrate competency in…" />
      <div>
        <h3 className="mb-3 text-base">Core units</h3>
        <RowList columns={['Code', 'Unit title']} rows={sampleUnits} addLabel="Add a core unit" widths={widths} />
      </div>
      <div className="border-t border-line-soft pt-5">
        <h3 className="mb-3 text-base">Elective units</h3>
        <RowList columns={['Code', 'Unit title']} rows={[]} addLabel="Add an elective unit" widths={widths} />
      </div>
    </FormSection>
  )
}
