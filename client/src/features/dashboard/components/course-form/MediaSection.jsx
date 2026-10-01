import { FormSection } from './FormSection'
import { ImageField } from './ImageField'
import { InputField } from './fields/InputField'

// Part 8: the photos and the downloadable course guide.
export function MediaSection({ values, set, bind }) {
  return (
    <FormSection id="media">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <ImageField label="Header photo" hint="Wide photo, at least 1600 px." value={values.images.hero} onChange={(img) => set('images.hero', img)} />
        <ImageField label="Course card photo" hint="4:3 photo, at least 800 px." value={values.images.card} onChange={(img) => set('images.card', img)} />
      </div>
      <InputField label="Course guide link" type="url" placeholder="https://…/course-outline.pdf" hint="Opens from the Download course guide button. Leave empty to hide the button's link." {...bind('detail.guideUrl')} />
    </FormSection>
  )
}
