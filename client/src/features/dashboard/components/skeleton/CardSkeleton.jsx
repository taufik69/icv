// White card shell matching ViewCard / FormSection: a title bar, then whatever placeholder content it wraps.
export function CardSkeleton({ titleWidth = 'w-40', children }) {
  return (
    <div className="rounded-2xl bg-surface p-5 ring-1 ring-line sm:p-7">
      <span className={`skeleton mb-6 block h-6 rounded-md ${titleWidth}`} />
      <div className="grid gap-5">{children}</div>
    </div>
  )
}
