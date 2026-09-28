// A titled group of fields inside the apply form.
export function FormGroup({ title, note, children }) {
  return (
    <fieldset className="border-t border-line-soft pt-6 first:border-0 first:pt-0">
      <legend className="float-left mb-4 flex w-full items-baseline justify-between gap-3">
        <span className="font-heading text-lg font-bold text-secondary">{title}</span>
        {note && <span className="text-xs text-ink-subtle">{note}</span>}
      </legend>
      <div className="clear-both grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  )
}
