import { useId } from 'react'

// Sign-in input: label above, 48px control with a leading icon, soft grey fill that turns white on focus.
export function LoginField({ label, icon: LeadIcon, trailing, aside, ...props }) {
  const id = useId()
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-secondary">{label}</label>
        {aside}
      </div>
      <div className="relative flex items-center">
        <LeadIcon className="pointer-events-none absolute left-4 size-4.5 text-ink-subtle" />
        <input
          id={id}
          className={`h-12 w-full rounded-xl border border-line bg-surface-alt pl-11 text-ink transition placeholder:text-ink-disabled hover:border-line-strong focus:border-secondary focus:bg-surface focus:ring-4 focus:ring-secondary/10 focus:outline-none ${trailing ? 'pr-14' : 'pr-4'}`}
          {...props}
        />
        {trailing && <div className="absolute right-1.5">{trailing}</div>}
      </div>
    </div>
  )
}
