import { CardSkeleton } from '../skeleton/CardSkeleton'
import { PageHeaderSkeleton } from '../skeleton/PageHeaderSkeleton'

const trail = [{ label: 'Enquiries', to: '/dashboard/enquiries' }]
const pairs = (n) => Array.from({ length: n }, (_, i) => (
  <div key={i} className="grid gap-2">
    <span className="skeleton h-3 w-24 rounded-md" />
    <span className="skeleton h-4 w-40 max-w-full rounded-md" />
  </div>
))

// One application while it loads: header, the three detail cards and the navy status panel.
export function ApplicationViewSkeleton() {
  return (
    <div aria-busy="true">
      <p className="sr-only" role="status">Loading enquiry…</p>
      <PageHeaderSkeleton trail={trail} actions={['w-36', 'w-28']} />
      <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="grid min-w-0 grid-cols-1 gap-6">
          <CardSkeleton titleWidth="w-48"><div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">{pairs(4)}</div></CardSkeleton>
          <CardSkeleton titleWidth="w-36"><div className="grid gap-4">{pairs(3)}</div></CardSkeleton>
          <CardSkeleton titleWidth="w-24"><div className="grid gap-4">{pairs(1)}</div></CardSkeleton>
        </div>
        <div aria-hidden="true" className="grid gap-3 rounded-2xl bg-secondary p-5">
          <span className="h-4 w-16 animate-pulse rounded-md bg-white/20 motion-reduce:animate-none" />
          <span className="h-6 w-20 animate-pulse rounded-pill bg-white/15 motion-reduce:animate-none" />
          <span className="mt-3 h-11 animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none" />
          <span className="mt-4 h-3 w-full animate-pulse rounded-md bg-white/10 motion-reduce:animate-none" />
          <span className="h-3 w-full animate-pulse rounded-md bg-white/10 motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  )
}
