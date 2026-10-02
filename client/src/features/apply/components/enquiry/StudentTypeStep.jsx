import { GlobeIcon, UserIcon } from '@/shared/components/icons'
import { ChoiceCard } from './ChoiceCard'

const types = [
  { value: 'Domestic', Icon: UserIcon, title: 'I am in Australia', text: 'Domestic student or permanent resident' },
  { value: 'International', Icon: GlobeIcon, title: 'I am overseas', text: 'International student looking to study in Melbourne' },
]

// Step 1: domestic or international (the form's Student Type), as two big cards.
export function StudentTypeStep({ form }) {
  const { values, errors, set } = form
  return (
    <fieldset aria-describedby={errors.studentType ? 'enq-type-error' : undefined}>
      <legend className="sr-only">Student type</legend>
      <div className="grid gap-4 sm:grid-cols-2">
        {types.map((t) => (
          <ChoiceCard key={t.value} name="studentType" {...t} checked={values.studentType === t.value} onChange={set('studentType')} />
        ))}
      </div>
      {errors.studentType && <p id="enq-type-error" className="mt-3 text-sm text-danger-ink">Choose one to continue.</p>}
    </fieldset>
  )
}
