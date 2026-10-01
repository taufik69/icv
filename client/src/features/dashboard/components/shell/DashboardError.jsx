import { useState } from 'react'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { Link, useRouter } from '@tanstack/react-router'
import { ArrowRightIcon, ChevronDownIcon, RefreshIcon } from '@/shared/components/icons'
import { describeError } from '../../lib/describeError'

const action = 'btn-shine inline-flex h-11 items-center justify-center gap-2 rounded-pill px-5 font-heading text-sm font-semibold transition'

// Route errorComponent for dashboard pages: a plain-language reason, a retry that refetches,
// a way back to the course list, and the raw error tucked under "Technical details".
export function DashboardError({ error }) {
  const router = useRouter()
  const { reset } = useQueryErrorResetBoundary()
  const [retrying, setRetrying] = useState(false)
  const { Icon, tone, title, text } = describeError(error)

  const retry = async () => {
    setRetrying(true)
    reset()
    await router.invalidate().finally(() => setRetrying(false))
  }

  return (
    <section role="alert" aria-labelledby="error-title" className="mx-auto mt-6 max-w-xl rounded-3xl bg-surface p-7 text-center shadow-card ring-1 ring-line sm:mt-12 sm:p-10">
      <span className={`mx-auto grid size-20 place-items-center rounded-full ring-8 ${tone.badge} ${tone.ring}`}>
        <Icon className="size-9" />
      </span>
      <h1 id="error-title" className="mt-7 text-2xl sm:text-3xl">{title}</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-muted">{text}</p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={retry} disabled={retrying} className={`${action} bg-secondary text-white hover:bg-secondary-dark disabled:opacity-70`}>
          <RefreshIcon className={`size-4 ${retrying ? 'animate-spin motion-reduce:animate-none' : ''}`} />
          {retrying ? 'Trying again…' : 'Try again'}
        </button>
        <Link to="/dashboard/courses" className={`${action} bg-surface text-secondary ring-1 ring-line-strong hover:bg-surface-muted`}>
          Back to courses <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <details className="group mt-8 border-t border-line-soft pt-5 text-left">
        <summary className="flex cursor-pointer list-none items-center justify-center gap-1.5 text-sm font-semibold text-ink-subtle hover:text-secondary">
          Technical details <ChevronDownIcon className="size-4 transition group-open:rotate-180" />
        </summary>
        <dl className="mt-4 grid gap-2 rounded-xl bg-surface-muted p-4 text-sm">
          <div className="flex gap-3"><dt className="w-16 shrink-0 text-ink-subtle">Status</dt><dd className="text-ink">{error?.status ?? 'No response'}</dd></div>
          <div className="flex gap-3"><dt className="w-16 shrink-0 text-ink-subtle">Message</dt><dd className="min-w-0 break-words text-ink">{error?.message ?? 'Unknown error'}</dd></div>
        </dl>
      </details>
    </section>
  )
}
