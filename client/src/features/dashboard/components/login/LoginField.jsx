import { useId } from 'react'

// Tall sign-in input: navy label, leading icon, optional trailing button (show password).
export function LoginField({ label, icon: LeadIcon, trailing, ...props }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-heading font-semibold text-secondary">{label}</label>
      <div className="relative flex items-center">
        <LeadIcon className="pointer-events-none absolute left-4 size-5 text-ink-subtle" />
        <input
          id={id}
          className={`h-14 w-full rounded-2xl border border-line bg-surface pl-12 text-ink transition placeholder:text-ink-disabled focus:border-primary-hover focus:shadow-focus-success focus:outline-none ${trailing ? 'pr-14' : 'pr-4'}`}
          {...props}
        />
        {trailing && <div className="absolute right-2">{trailing}</div>}
      </div>
    </div>
  )
}
