import { useId } from 'react'

const control =
  'w-full rounded-xl border border-line bg-surface py-3 pr-3.5 pl-10 text-ink placeholder:text-ink-disabled transition focus:border-primary-hover focus:shadow-focus-success focus:outline-none'

// Labelled input with a leading icon and an optional trailing slot (e.g. show-password button).
export function PortalField({ label, icon: LeadIcon, trailing, ...props }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-heading text-sm font-semibold text-secondary">{label}</label>
      <div className="relative flex items-center">
        <LeadIcon className="pointer-events-none absolute left-3.5 size-4.5 text-ink-subtle" />
        <input id={id} className={`${control} ${trailing ? 'pr-12' : ''}`} {...props} />
        {trailing && <div className="absolute right-1.5">{trailing}</div>}
      </div>
    </div>
  )
}
