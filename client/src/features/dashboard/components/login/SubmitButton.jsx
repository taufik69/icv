import { ArrowRightIcon } from '@/shared/components/icons'

// Full-width navy submit for the sign-in steps; shows `busyLabel` and stops double submits while busy.
export function SubmitButton({ busy, busyLabel, children }) {
  return (
    <button
      type="submit" disabled={busy}
      className="group mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-secondary font-heading font-semibold text-white transition hover:bg-secondary-dark focus-visible:ring-4 focus-visible:ring-secondary/25 focus-visible:outline-none disabled:cursor-wait disabled:opacity-70"
    >
      {busy ? busyLabel : children}
      {!busy && <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />}
    </button>
  )
}
