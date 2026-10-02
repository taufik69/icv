import { enrolGrid } from './enrolGrid'

const names = ['w-36', 'w-44', 'w-32', 'w-40', 'w-48', 'w-36']

// Placeholder rows in the enrolments table's own grid, so nothing jumps when the real rows arrive.
export function EnrolmentRowsSkeleton({ rows = 6 }) {
  return (
    <ul aria-hidden="true" className="divide-y divide-line-soft">
      {Array.from({ length: rows }, (_, i) => (
        <li key={i} className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-5 py-4 ${enrolGrid}`}>
          <div className="col-span-2 flex min-w-0 items-center gap-3 md:col-span-1">
            <span className="skeleton size-10 shrink-0 rounded-full" />
            <span className="grid min-w-0 flex-1 gap-2">
              <span className={`skeleton h-4 max-w-full rounded-md ${names[i % names.length]}`} />
              <span className="skeleton h-3 w-28 rounded-md" />
            </span>
          </div>
          <span className="col-span-2 grid gap-2 pl-13 md:col-span-1 md:pl-0">
            <span className="skeleton h-3.5 w-full max-w-60 rounded-md" />
            <span className="skeleton h-3 w-32 rounded-md" />
          </span>
          <span className="skeleton hidden h-3.5 w-16 rounded-md md:block" />
          <span className="hidden gap-1.5 md:grid">
            <span className="skeleton h-3.5 w-20 rounded-md" />
            <span className="skeleton h-3 w-12 rounded-md" />
          </span>
          <span className="skeleton ml-13 h-6 w-20 rounded-pill md:ml-0" />
          <span className="flex justify-end gap-1.5">
            <span className="skeleton size-9 rounded-lg" />
            <span className="skeleton size-9 rounded-lg" />
          </span>
        </li>
      ))}
    </ul>
  )
}
