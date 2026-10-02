import { ShieldCheckIcon } from '@/shared/components/icons'
import { BrandLogo } from '@/shared/components/ui'

// The white card every sign-in / reset step sits in: logo (phones), title, lead, the step's form, and
// the "Protected staff access" footer. `notice` is a one-line message above the form (e.g. after a reset).
export function AuthCard({ title, lead, notice, children }) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-surface p-7 shadow-card ring-1 ring-line-soft sm:p-10 [&_p]:text-left">
      <BrandLogo className="mb-8 text-[0.625rem] text-secondary lg:hidden" />
      <h1 className="text-left text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {lead && <p className="mt-2 text-ink-subtle">{lead}</p>}
      {notice && <p role="status" className="mt-5 rounded-xl bg-success-soft px-4 py-3 text-sm text-success-ink">{notice}</p>}
      <div className="mt-8">{children}</div>
      <p className="mt-8 flex items-center justify-center gap-2 border-t border-line-soft pt-6 text-sm text-ink-subtle">
        <ShieldCheckIcon className="size-4 text-primary-hover" />
        Protected staff access
      </p>
    </div>
  )
}
