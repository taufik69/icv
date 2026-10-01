import { deliveryOptions, studyModeOptions } from '../../data/courseOptions'
import { FormSection } from './FormSection'
import { InputField } from './fields/InputField'
import { SelectField } from './fields/SelectField'

// Typed facts: hero tiles on the course detail page, finder cards, filters and sorting.
export function FactsSection({ bind }) {
  return (
    <FormSection id="facts">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <InputField label="Duration" placeholder="48 Weeks" {...bind('facts.durationText')} />
        <InputField label="Duration in weeks" type="number" min="0" hint="Longest end of the range; 0 for courses measured in hours." {...bind('facts.durationWeeks')} />
        <SelectField label="Delivery" options={deliveryOptions} {...bind('facts.delivery')} />
        <InputField label="Delivery wording" placeholder="Blended (Face-to-Face & Virtual Classroom)" {...bind('facts.deliveryText')} />
        <SelectField label="Study mode" options={studyModeOptions} {...bind('facts.studyMode')} />
        <InputField label="Campus" placeholder="Melbourne CBD" {...bind('facts.campus')} />
        <InputField label="Next intake" placeholder="Monthly Intake" {...bind('facts.intake')} />
        <InputField label="Work placement hours" type="number" min="0" {...bind('facts.placementHours')} />
        <InputField label="CRICOS code" placeholder="International courses only" {...bind('facts.cricosCode')} />
      </div>
    </FormSection>
  )
}
