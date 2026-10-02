import { CheckIcon } from '@/shared/components/icons'

// Multi-choice checkboxes. `layout="chips"` puts short options in a row; the default stacks long ones.
export function CheckList({ name, label, options, values, onToggle, error, hint, layout = 'stack', className = '' }) {
  const errId = `apply-${name}-error`
  const chips = layout === 'chips'
  return (
    <fieldset className={className} aria-describedby={error ? errId : undefined}>
      <legend className="font-heading text-sm font-semibold text-secondary">{label}</legend>
      {hint && <p className="mt-0.5 text-sm text-ink-subtle">{hint}</p>}
      <div className={`mt-1.5 ${chips ? 'flex flex-wrap gap-2' : 'grid gap-2'}`}>
        {options.map((o) => (
          <label
            key={o}
            className={`flex cursor-pointer items-start gap-3 rounded-xl px-3.5 py-2.5 ring-1 ring-line transition hover:ring-line-strong has-checked:bg-surface-muted has-checked:ring-secondary has-focus-visible:shadow-focus-success ${chips ? 'items-center' : ''}`}
          >
            <input type="checkbox" name={name} checked={values.includes(o)} onChange={() => onToggle(o)} className="peer sr-only" />
            <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md ring-1 ring-line-strong peer-checked:bg-secondary peer-checked:ring-secondary [&>svg]:invisible peer-checked:[&>svg]:visible">
              <CheckIcon className="size-3.5 text-white" />
            </span>
            <span className={chips ? 'font-heading font-semibold text-secondary' : 'text-sm leading-relaxed text-ink'}>{o}</span>
          </label>
        ))}
      </div>
      {error && <p id={errId} className="mt-1.5 text-sm text-danger-ink">{error}</p>}
    </fieldset>
  )
}
