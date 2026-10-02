import { coverDurations, coverTypes, disabilityAnswers, disabilityTypes } from '../../../data/enrolment/enrolmentOptions'
import { ApplyField } from '../../ApplyField'
import { FormGroup } from '../../FormGroup'
import { CheckList } from '../fields/CheckList'
import { CheckToggle } from '../fields/CheckToggle'
import { ChoiceGroup } from '../fields/ChoiceGroup'

// (E) Overseas Health Cover (OSHC) Details. Each OSHC question is a checkbox; ticking it opens its
// details (required once open). The disability question is always required.
export function HealthStep({ form }) {
  const { values, errors, field, set, toggle } = form
  const noCondition = values.disability === disabilityAnswers[1]
  return (
    <>
      <FormGroup title="Your OSHC">
        <CheckToggle name="hasOshc" label="Do you already have OSHC? If Yes then please provide details:" checked={values.hasOshc} onChange={set('hasOshc')} className="sm:col-span-2" />
        {values.hasOshc && (
          <>
            <ApplyField {...field('oshcProvider')} label="Provider's name" placeholder="e.g. Allianz Care, Bupa, Medibank" required />
            <ApplyField {...field('oshcMembership')} label="Membership number" placeholder="As shown on your OSHC card" required />
            <ChoiceGroup {...field('oshcType')} label="Type" options={coverTypes} look="check" />
            <ApplyField {...field('oshcExpiry')} label="Expiry date" type="date" />
          </>
        )}
      </FormGroup>

      <FormGroup title="OSHC through ICV">
        <CheckToggle name="arrangeOshc" label="Do you want ICV to arrange OSHC for you? If yes then please provide details:" checked={values.arrangeOshc} onChange={set('arrangeOshc')} className="sm:col-span-2" />
        {values.arrangeOshc && (
          <>
            <ChoiceGroup {...field('arrangeDuration')} label="Duration" options={coverDurations} required fill />
            <ApplyField
              {...field('arrangeDurationOther')} label="Other (please specify)" placeholder="e.g. 18 months"
              disabled={values.arrangeDuration !== 'Other'} className="[&_input:disabled]:bg-surface-alt"
            />
            <ChoiceGroup {...field('arrangeType')} label="Type" options={coverTypes} required look="check" className="sm:col-span-2" />
          </>
        )}
      </FormGroup>

      <FormGroup title="Disability or medical condition">
        <ChoiceGroup
          {...field('disability')} options={disabilityAnswers} required className="sm:col-span-2"
          label="Do you have a disability, impairment or permanent medical condition that can affect your studies?"
        />
        <fieldset disabled={noCondition} className="grid gap-4 transition disabled:opacity-50 sm:col-span-2">
          <CheckList name="disabilityTypes" label="If yes, which ones?" options={disabilityTypes} values={values.disabilityTypes}
            onToggle={(o) => toggle('disabilityTypes', o)} error={errors.disabilityTypes} layout="chips" />
          <ApplyField {...field('otherMedical')} label="Other medical conditions" placeholder="Describe any other medical condition" />
        </fieldset>
      </FormGroup>
    </>
  )
}
