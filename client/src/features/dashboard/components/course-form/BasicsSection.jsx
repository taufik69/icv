import { levelOptions, marketOptions, studyAreaOptions } from '../../data/courseOptions'
import { FeaturedToggle } from './FeaturedToggle'
import { FormSection } from './FormSection'
import { ImageField } from './ImageField'
import { InputField } from './fields/InputField'
import { SelectField } from './fields/SelectField'
import { TextAreaField } from './fields/TextAreaField'

// Identity + listing fields: shown in the page hero, on course cards and in the finder.
export function BasicsSection({ values, set, bind }) {
  return (
    <FormSection id="basics" title="Course basics" description="Shown in the page hero, on the course card and in the course finder. Fields marked * are required.">
      <InputField label="Course title" required placeholder="Certificate IV in Building and Construction" {...bind('title')} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InputField label="Course code" required placeholder="CPC40120" {...bind('code')} />
        <InputField label="Page address" required placeholder="cert-iv-building-and-construction" hint="Lowercase words joined by dashes." {...bind('slug')} />
        <SelectField label="Market" required options={marketOptions} {...bind('market')} />
        <SelectField label="Study area" required options={studyAreaOptions} hint="Decides the filter chip and finder group." {...bind('studyArea')} />
        <SelectField label="Level" required options={levelOptions} {...bind('level')} />
        <InputField label="Category label" placeholder="Building and Construction" hint="Text shown on the course page." {...bind('category')} />
        <InputField label="Apply form code" placeholder="Leave empty to use the course code" {...bind('applyCode')} />
        <InputField label="External page" placeholder="https://icv.edu.au/…" hint="Only for courses without a page on this site." {...bind('externalUrl')} />
      </div>
      <FeaturedToggle checked={values.featured} onChange={(on) => set('featured', on)} />
      <InputField label="Tagline" placeholder="Are you ready to be a builder?" hint="A short line under the title. Leave empty to skip." {...bind('tagline')} />
      <TextAreaField label="Card summary" rows={2} maxLength={300} placeholder="This qualification reflects the role of builders, site managers…" hint="Up to 300 characters. Shown on the course card." {...bind('summary')} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <ImageField label="Hero image" hint="Wide photo, at least 1600 px." value={values.images.hero} onChange={(img) => set('images.hero', img)} />
        <ImageField label="Card image" hint="4:3 photo, at least 800 px." value={values.images.card} onChange={(img) => set('images.card', img)} />
      </div>
    </FormSection>
  )
}
