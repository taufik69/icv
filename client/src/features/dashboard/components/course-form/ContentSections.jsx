import { sampleGlance } from '../../data/courseFormBlocks'
import { FormSection } from './FormSection'
import { RowList } from './RowList'
import { InputField } from './fields/InputField'
import { TextAreaField } from './fields/TextAreaField'

export function OverviewSection() {
  return (
    <FormSection id="overview" title="Overview">
      <TextAreaField label="Course description" rows={6} placeholder="This qualification reflects the role of…" hint="Leave a blank line between paragraphs." />
    </FormSection>
  )
}

export function GlanceSection() {
  return (
    <FormSection id="glance" title="At a glance" description="The fact list beside the overview: fees, intake, duration, delivery.">
      <RowList columns={['Label', 'Value']} rows={sampleGlance} addLabel="Add a fact" />
    </FormSection>
  )
}

export function FundingSection() {
  return (
    <FormSection id="funding" title="Funding band" optional>
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField label="Title" placeholder="Skills First" />
        <InputField label="Headline" placeholder="Government funded places available" />
      </div>
      <TextAreaField label="Details" rows={3} placeholder="This training is delivered with Victorian and Commonwealth Government funding…" />
    </FormSection>
  )
}
