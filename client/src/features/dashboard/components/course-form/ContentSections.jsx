import { RichTextField } from '../rich-text/RichTextField'
import { FormSection } from './FormSection'
import { RowList } from './RowList'

export function OverviewSection({ values, set }) {
  return (
    <FormSection id="overview">
      <RichTextField
        label="Course description"
        placeholder="This qualification reflects the role of…"
        hint="Use the toolbar for headings, lists and links. The course view shows it exactly as it looks here."
        value={values.overviewHtml}
        onChange={(html) => set('overviewHtml', html)}
      />
    </FormSection>
  )
}

const glanceColumns = [
  { key: 'label', label: 'Label', placeholder: 'Duration', required: true },
  { key: 'value', label: 'Value', placeholder: '48 Weeks', required: true },
]

// Verbatim "at a glance" table on the icv.edu.au-style course page.
export function GlanceSection({ values, set }) {
  return (
    <FormSection id="glance" optional>
      <RowList itemLabel="Fact" columns={glanceColumns} rows={values.glance} onChange={(rows) => set('glance', rows)} blank={{ label: '', value: '' }} addLabel="Add a fact" />
    </FormSection>
  )
}
