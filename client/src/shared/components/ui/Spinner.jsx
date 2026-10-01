// Route loading state: fills the viewport and centres a ring spinner, so it sits in the middle of the
// screen (clear of the fixed header) and the footer stays below the fold until the page arrives.
export function Spinner({ label = 'Loading' }) {
  return (
    <div role="status" aria-label={label} className="grid min-h-svh place-items-center px-5">
      <div className="flex flex-col items-center gap-4">
        <span className="relative size-14">
          <span className="absolute inset-0 rounded-full border-4 border-line" />
          <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary border-r-primary motion-reduce:animate-none" />
        </span>
        <span className="font-heading text-sm font-semibold text-secondary-muted">{label}…</span>
      </div>
    </div>
  )
}
