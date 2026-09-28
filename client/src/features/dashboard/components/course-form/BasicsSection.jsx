import { categoryOptions, marketOptions } from '../../data/courseFormBlocks'
import { FormSection } from './FormSection'
import { ImageDrop } from './ImageDrop'
import { InputField } from './fields/InputField'
import { SelectField } from './fields/SelectField'
import { TextAreaField } from './fields/TextAreaField'

export function BasicsSection() {
  return (
    <FormSection id="basics" title="Course basics" description="Shown in the page hero and on the course card.">
      <InputField label="Course title" placeholder="Certificate IV in Building and Construction" />
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField label="Course code" placeholder="CPC40120" />
        <InputField label="Page address" placeholder="cert-iv-building-and-construction" hint="Lowercase words joined by dashes, e.g. icv.edu.au/domestic/cert-iv-…" />
        <SelectField label="Market" options={marketOptions} />
        <SelectField label="Category" options={categoryOptions} hint="Decides which filter the card sits under." />
      </div>
      <InputField label="Tagline" placeholder="Are you ready to be a builder?" hint="A short line under the title. Leave empty to skip." />
      <TextAreaField label="Card summary" rows={2} placeholder="This qualification reflects the role of builders, site managers…" hint="About 20 words. Shown on the course card." />
      <div className="grid gap-5 sm:grid-cols-2">
        <ImageDrop label="Hero image" hint="WebP, at least 1600 px wide" />
        <ImageDrop label="Card image" hint="WebP, 4:3, at least 800 px wide" />
      </div>
    </FormSection>
  )
}
