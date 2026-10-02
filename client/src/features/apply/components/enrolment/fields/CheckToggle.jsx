import { CheckIcon } from '@/shared/components/icons'

// A single checkbox question that opens follow-up fields when ticked (e.g. "Do you already have OSHC?").
export function CheckToggle({ name, label, checked, onChange, className = '' }) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 min-h-12 rounded-xl px-4 py-3 ring-1 ring-line transition hover:ring-line-strong has-checked:bg-surface-muted has-checked:ring-secondary has-focus-visible:shadow-focus-success ${className}`}>
      <input type="checkbox" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-md ring-1 ring-line-strong peer-checked:bg-secondary peer-checked:ring-secondary [&>svg]:invisible peer-checked:[&>svg]:visible">
        <CheckIcon className="size-3.5 text-white" />
      </span>
      <span className="font-heading font-semibold text-secondary">{label}</span>
    </label>
  )
}
