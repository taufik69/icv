import { RichTextField } from '../rich-text/RichTextField'
import { FormSection } from './FormSection'
import { InputField } from './fields/InputField'
import { TextAreaField } from './fields/TextAreaField'

const Locked = ({ label }) => (
  <p className="rounded-xl bg-surface-muted px-4 py-3 text-sm text-ink-muted">{label} uses formatting this editor can't show yet, so it's kept as imported.</p>
)

// Sections of the course detail page (/courses/$market/$slug): entry, pathways, careers, course guide.
export function DetailSection({ values, set, bind }) {
  const { pathwaysEditable } = values.detail
  return (
    <FormSection id="detail" title="Detail page" description="Entry requirements, careers and further study on the course detail page.">
      <RichTextField
        label="Entry requirements"
        placeholder="Applicants must be 18 years of age or above…"
        value={values.detail.entryHtml}
        onChange={(html) => set('detail.entryHtml', html)}
      />
      <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <InputField label="Additional requirements heading" placeholder="Before starting work placement" {...bind('detail.additionalTitle')} />
        <TextAreaField label="Additional requirements" rows={3} hint="One per line." placeholder="Working with children check" {...bind('detail.additionalText')} />
      </div>
      {pathwaysEditable ? (
        <TextAreaField label="Further study pathways" rows={4} hint="Course codes in this text (e.g. CHC50125) link to those courses." {...bind('detail.pathwaysText')} />
      ) : (
        <Locked label="Further study pathways" />
      )}
      <TextAreaField label="Career outcomes" rows={4} hint="One job title per line." placeholder="Site Manager" {...bind('detail.careersText')} />
      <InputField label="Course guide link" type="url" placeholder="https://…/course-outline.pdf" hint="Used by the Download course guide button." {...bind('detail.guideUrl')} />
    </FormSection>
  )
}
