import { PageHeader } from '../shell/PageHeader'
import { EnrolmentRowsSkeleton } from './EnrolmentRowsSkeleton'

// First visit to the enrolments list: real header, placeholder toolbar and rows.
export function EnrolmentsSkeleton() {
  return (
    <div aria-busy="true">
      <p className="sr-only" role="status">Loading enrolments…</p>
      <PageHeader title="Enrolments" crumbs={{ current: 'Enrolments' }} description="International enrolment applications from the website." />
      <section aria-hidden="true" className="mt-8 overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">
          <div className="flex max-w-full gap-1 overflow-hidden rounded-xl bg-surface-muted p-1">
            {['w-14', 'w-16', 'w-24', 'w-26', 'w-24', 'w-24', 'w-26'].map((w, i) => <span key={i} className={`skeleton h-8 shrink-0 rounded-lg ${w}`} />)}
          </div>
          <span className="skeleton h-9 w-full rounded-xl xl:w-80" />
        </div>
        <EnrolmentRowsSkeleton />
      </section>
    </div>
  )
}
