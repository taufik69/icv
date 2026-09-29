import { FilterCheckList } from './FilterCheckList'
import { FilterChips } from './FilterChips'

// One facet: a labelled fieldset holding either a checkbox list or toggle chips.
export function FilterGroup({ label, variant, ...props }) {
  const Control = variant === 'chips' ? FilterChips : FilterCheckList
  return (
    <fieldset className="border-t border-line py-5">
      <legend className="float-left mb-3 w-full font-heading text-sm font-semibold text-secondary">{label}</legend>
      <div className="clear-both">
        <Control {...props} />
      </div>
    </fieldset>
  )
}
