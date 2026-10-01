import { rowGrid } from './rowGrid'

const titleWidths = ['w-72', 'w-80', 'w-64', 'w-56', 'w-96', 'w-60', 'w-72']

// Placeholder rows in the course table's own grid: thumbnail + title, market, switch, actions.
export function CourseRowsSkeleton({ rows = 7 }) {
  return (
    <ul aria-hidden="true" className="divide-y divide-line-soft">
      {Array.from({ length: rows }, (_, i) => (
        <li key={i} className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 px-5 py-4 ${rowGrid}`}>
          <div className="col-span-2 flex min-w-0 items-center gap-4 md:col-span-1">
            <span className="skeleton h-12 w-16 shrink-0 rounded-lg" />
            <div className="grid min-w-0 flex-1 gap-2">
              <span className={`skeleton h-4 max-w-full rounded-md ${titleWidths[i % titleWidths.length]}`} />
              <span className="skeleton h-3 w-44 max-w-full rounded-md" />
            </div>
          </div>
          <span className="skeleton hidden h-3.5 w-20 rounded-md md:block" />
          <div className="flex items-center gap-2.5">
            <span className="skeleton h-6 w-11 rounded-pill" />
            <span className="skeleton h-3.5 w-12 rounded-md" />
          </div>
          <div className="flex items-center justify-end gap-1.5">
            {[0, 1, 2, 3].map((n) => <span key={n} className="skeleton size-9 rounded-lg" />)}
          </div>
        </li>
      ))}
    </ul>
  )
}
