import { RichTextField } from '../rich-text/RichTextField'
import { FormSection } from './FormSection'
import { InputField } from './fields/InputField'
import { TextAreaField } from './fields/TextAreaField'

// Part 5: who can enrol, plus any checks needed before placement (e.g. Working with Children).
export function EntrySection({ values, set, bind }) {
  return (
    <FormSection id="entry">
      <RichTextField
        label="Entry requirements"
        placeholder="Applicants must be 18 years of age or above…"
        value={values.detail.entryHtml}
        onChange={(html) => set('detail.entryHtml', html)}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <InputField label="Additional requirements heading" placeholder="Before starting work placement" {...bind('detail.additionalTitle')} />
        <TextAreaField label="Additional requirements" rows={3} hint="One per line." placeholder="Working with children check" {...bind('detail.additionalText')} />
      </div>
    </FormSection>
  )
}
