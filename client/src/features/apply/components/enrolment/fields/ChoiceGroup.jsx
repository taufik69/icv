import { CheckIcon } from '@/shared/components/icons'

const option = 'cursor-pointer rounded-xl px-4 py-2.5 text-center font-heading font-semibold text-ink-muted ring-1 ring-line transition hover:text-secondary hover:ring-line-strong has-checked:bg-secondary has-checked:text-white has-checked:ring-secondary has-focus-visible:shadow-focus-success'

// Chip with a marker beside the label (circle = radio dot, check = ticked square like the CheckList chips).
const chip = 'flex cursor-pointer items-center gap-2.5 rounded-xl px-4 py-2.5 font-heading font-semibold text-secondary ring-1 ring-line transition hover:ring-line-strong has-checked:bg-surface-muted has-checked:ring-secondary has-focus-visible:shadow-focus-success'

const markers = {
  circle: () => <span aria-hidden="true" className="size-5 shrink-0 rounded-full ring-1 ring-line-strong ring-inset peer-checked:ring-6 peer-checked:ring-secondary" />,
  check: () => (
    <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-md ring-1 ring-line-strong peer-checked:bg-secondary peer-checked:ring-secondary [&>svg]:invisible peer-checked:[&>svg]:visible">
      <CheckIcon className="size-3.5 text-white" />
    </span>
  ),
}

// Phones: tiles on an equal-width grid (all in one row when there are up to 4); sm+: a wrapping row.
const phoneCols = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }

// Single choice (radio inputs underneath). Default look = a row of tiles, e.g. Mr / Miss / Mrs / Ms or Yes / No;
// `fill` keeps the equal-width grid at every size so the tiles span their column.
// `look="circle"` = radio circle beside each label (the paper form's Year – 2026 / 2027);
// `look="check"` = ticked-square chips like the Hearing / Vision list (OSHC cover type).
export function ChoiceGroup({ name, label, options, value, onChange, error, required, hint, look = 'tile', fill = false, className = '' }) {
  const errId = `apply-${name}-error`
  const Marker = markers[look]
  const track = Marker ? 'flex flex-wrap gap-2' : `grid gap-2 ${fill ? '' : 'sm:flex sm:flex-wrap'} ${phoneCols[options.length] ?? 'grid-cols-2'}`
  const item = Marker ? chip : `${option} min-w-0 sm:min-w-20`
  return (
    <fieldset className={className} aria-describedby={error ? errId : undefined}>
      <legend className="font-heading text-sm font-semibold text-secondary">
        {label}
        {required && <span aria-hidden="true" className="text-danger"> *</span>}
      </legend>
      {hint && <p className="mt-0.5 text-sm text-ink-subtle">{hint}</p>}
      <div className={`mt-1.5 ${track}`}>
        {options.map((o) => (
          <label key={o} className={item}>
            <input type="radio" name={name} value={o} checked={value === o} onChange={onChange} className="peer sr-only" />
            {Marker && <Marker />}
            {o}
          </label>
        ))}
      </div>
      {error && <p id={errId} className="mt-1.5 text-sm text-danger-ink">{error}</p>}
    </fieldset>
  )
}
