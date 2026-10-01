import { bentoLayout } from '@/features/home/lib/bentoLayout'

// Placeholder cards in the same bento cells while the popular courses load.
export function CoursesGridSkeleton({ count = 8 }) {
  const layout = bentoLayout(count)
  return (
    <ul aria-hidden="true" className="-mx-5 mt-10 flex gap-4 overflow-hidden px-5 pb-4 sm:mx-0 sm:grid sm:grid-flow-row-dense sm:auto-rows-[20rem] sm:grid-cols-2 sm:gap-5 sm:px-0 sm:pb-0 lg:auto-rows-[17rem] lg:grid-cols-4">
      {layout.map((cell, i) => (
        <li key={i} className={`w-[80%] shrink-0 sm:w-auto ${cell.span}`}>
          <div className="skeleton flex aspect-3/4 h-full flex-col justify-between rounded-2xl p-5 sm:aspect-auto">
            <span className="flex justify-between">
              <span className="size-11 rounded-full bg-surface" />
              <span className="h-6 w-24 rounded-full bg-surface" />
            </span>
            <span className="grid gap-2">
              <span className="h-3 w-16 rounded-md bg-surface" />
              <span className="h-5 w-4/5 rounded-md bg-surface" />
              <span className="h-3 w-1/2 rounded-md bg-surface" />
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
