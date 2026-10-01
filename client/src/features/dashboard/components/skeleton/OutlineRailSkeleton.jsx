const ITEMS = 12

// Navy "Page outline" rail while loading: heading, caption and hollow steps along the spine.
export function OutlineRailSkeleton() {
  return (
    <div aria-hidden="true" className="sticky top-8 rounded-2xl bg-secondary p-5">
      <span className="block h-4 w-28 animate-pulse rounded-md bg-white/20 motion-reduce:animate-none" />
      <span className="mt-2 block h-3 w-40 animate-pulse rounded-md bg-white/10 motion-reduce:animate-none" />
      <ol className="relative mt-5 grid gap-1 before:absolute before:inset-y-3 before:left-[0.6875rem] before:w-px before:bg-white/15">
        {Array.from({ length: ITEMS }, (_, i) => (
          <li key={i} className="relative flex items-center gap-3 py-1.5">
            <span className="size-6 shrink-0 rounded-full border-2 border-white/15 bg-secondary" />
            <span className={`h-3 animate-pulse rounded-md bg-white/15 motion-reduce:animate-none ${i % 3 ? 'w-24' : 'w-32'}`} />
          </li>
        ))}
      </ol>
    </div>
  )
}
