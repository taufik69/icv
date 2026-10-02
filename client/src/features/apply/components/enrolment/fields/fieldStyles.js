// One look for every enrolment field: 48px tall, quiet border, navy focus ring (no browser/site default
// ring on top), red border when invalid. Labels are navy and semibold, like the rest of the apply form.
const focus = 'transition hover:border-line-strong focus:border-secondary focus:ring-4 focus:ring-secondary/10 focus:outline-none focus-visible:shadow-none aria-invalid:border-danger'

export const inputClass = `min-h-12 w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink-strong placeholder:text-ink-disabled ${focus}`

export const selectClass = `mt-1.5 flex min-h-12 w-full items-center gap-3 rounded-xl border border-line bg-surface px-4 py-2.5 text-left aria-expanded:border-secondary aria-expanded:ring-4 aria-expanded:ring-secondary/10 disabled:cursor-wait disabled:bg-surface-alt ${focus}`

export const labelClass = 'font-heading text-sm font-semibold text-secondary'
