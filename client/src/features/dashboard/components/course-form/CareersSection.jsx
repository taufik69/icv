import { FormSection } from './FormSection'
import { TextAreaField } from './fields/TextAreaField'

const Locked = ({ label }) => (
  <p className="rounded-xl bg-surface-muted px-4 py-3 text-sm text-ink-muted">{label} uses formatting this editor can't show yet, so it's kept as imported.</p>
)

// Part 7: the jobs this course leads to, and what students can study next.
export function CareersSection({ values, bind }) {
  return (
    <FormSection id="careers">
      <TextAreaField label="Career outcomes" rows={5} hint="One job title per line." placeholder={'Site Manager\nLeading Hand'} {...bind('detail.careersText')} />
      {values.detail.pathwaysEditable ? (
        <TextAreaField label="Further study pathways" rows={4} hint="Course codes in this text (e.g. CHC50125) link to those courses." {...bind('detail.pathwaysText')} />
      ) : (
        <Locked label="Further study pathways" />
      )}
    </FormSection>
  )
}
