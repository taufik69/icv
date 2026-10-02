import { useCallback, useId, useState } from 'react'
import { PlusIcon } from '@/shared/components/icons'
import { taxonomyPages } from '../../data/taxonomyPages'
import { useTaxonomy, useTaxonomyOptions } from '../../hooks/useTaxonomy'
import { FieldShell } from './fields/FieldShell'
import { SelectMenu } from './fields/SelectMenu'
import { QuickAddTaxonomy } from './QuickAddTaxonomy'

// Study area / Level dropdown, loaded from the API, with a "+" button to create a new item right here.
// The new item is selected straight away. onChange gets ({ target: { value } }) like the form's bind().
export function TaxonomyField({ type, label, required, error, value, onChange }) {
  const id = useId()
  const page = taxonomyPages[type]
  const { loading } = useTaxonomy(type)
  const options = useTaxonomyOptions(type)
  const [adding, setAdding] = useState(false)
  const close = useCallback(() => setAdding(false), [])

  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={`Pick one, or press + to add a new ${page.noun}.`}>
      <div className="relative flex gap-2">
        <div className="min-w-0 flex-1">
          <SelectMenu
            id={id}
            value={value}
            options={options}
            placeholder={loading ? 'Loading…' : `Choose a ${page.noun}`}
            emptyText={loading ? 'Loading…' : `No ${page.noun}s yet — press + to add one`}
            onChange={(v) => onChange({ target: { value: v } })}
            aria-describedby={`${id}-hint`}
          />
        </div>
        <button
          type="button"
          onClick={() => setAdding((a) => !a)}
          aria-expanded={adding}
          aria-label={`Add a new ${page.noun}`}
          title={`Add a new ${page.noun}`}
          className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary/8 text-secondary ring-1 ring-line transition hover:bg-secondary hover:text-white aria-expanded:bg-secondary aria-expanded:text-white"
        >
          <PlusIcon className={`size-4.5 transition ${adding ? 'rotate-45' : ''}`} />
        </button>
        {adding && <QuickAddTaxonomy type={type} page={page} onCreated={(item) => onChange({ target: { value: item.key } })} onClose={close} />}
      </div>
    </FieldShell>
  )
}
