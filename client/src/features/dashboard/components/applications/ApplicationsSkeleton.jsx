import { PageHeader } from '../shell/PageHeader'
import { ApplicationRowsSkeleton } from './ApplicationRowsSkeleton'

// First visit to the applications list: real header, placeholder toolbar and rows.
export function ApplicationsSkeleton() {
  return (
    <div aria-busy="true">
      <p className="sr-only" role="status">Loading applications…</p>
      <PageHeader title="Applications" crumbs={{ current: 'Applications' }} description="Sent from the Apply now form on the website." />
      <section aria-hidden="true" className="mt-8 overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">
          <div className="flex gap-1 rounded-xl bg-surface-muted p-1">
            {['w-14', 'w-16', 'w-24', 'w-24', 'w-20'].map((w, i) => <span key={i} className={`skeleton h-8 rounded-lg ${w}`} />)}
          </div>
          <span className="skeleton h-9 w-full rounded-xl sm:w-72" />
        </div>
        <ApplicationRowsSkeleton />
      </section>
    </div>
  )
}
