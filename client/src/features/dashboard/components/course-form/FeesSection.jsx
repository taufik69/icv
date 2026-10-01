import { feeKindOptions } from '../../data/courseOptions'
import { FormSection } from './FormSection'
import { RowList } from './RowList'
import { InputField } from './fields/InputField'

const columns = [
  { key: 'kind', label: 'Type', options: feeKindOptions, required: true },
  { key: 'label', label: 'Label', placeholder: 'Tuition Fee', required: true },
  { key: 'amount', label: 'Amount ($)', placeholder: '3000', inputMode: 'decimal' },
  { key: 'text', label: 'Wording if not a price', placeholder: '0* Fee for Eligible Students' },
]

// Fee lines for the Fees section, sidebar price and finder "From $X" (tuition first, then fee for service).
export function FeesSection({ values, set, bind }) {
  return (
    <FormSection id="fees" title="Fees" description="Tuition sets the headline price; fee for service is used when tuition isn't a dollar amount.">
      <RowList
        itemLabel="Fee"
        columns={columns}
        rows={values.fees}
        onChange={(rows) => set('fees', rows)}
        blank={{ kind: 'tuition', label: '', amount: '', text: '' }}
        addLabel="Add a fee"
        widths="sm:grid-cols-[9rem_minmax(0,1fr)_7rem_minmax(0,1fr)]"
      />
      <InputField label="Payment options" placeholder="Weekly and Monthly payment plans available" {...bind('paymentOptions')} />
    </FormSection>
  )
}
