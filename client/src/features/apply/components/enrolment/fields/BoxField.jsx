import { useState } from 'react'

// The paper form's one-letter-per-box field (used for the passport number, 12 boxes). One real <input>
// sits invisibly over the boxes, so typing, pasting and screen readers work as normal; the boxes only
// display it, and a preview underneath shows the whole value. Any character is allowed; letters are
// upper-cased and spaces dropped, since a blank box reads as empty.
export function BoxField({
  name, label, value, onChange, error, required, length = 12,
  hint = `Up to ${length} characters. A preview shows here.`, className = '',
}) {
  const [focused, setFocused] = useState(false)
  const id = `apply-${name}`
  const chars = value.split('')
  const handle = (e) => onChange({ target: { value: e.target.value.toUpperCase().replace(/\s/g, '').slice(0, length) } })

  return (
    <div className={className}>
      <label htmlFor={id} className="font-heading text-sm font-semibold text-secondary">
        {label}
        {required && <span aria-hidden="true" className="text-danger"> *</span>}
      </label>
      <div className="min-w-0">
        <div className={"relative mt-1.5 grid grid-cols-12 gap-1 sm:gap-1.5"}>
          {Array.from({ length }, (_, i) => {
            const caret = focused && i === Math.min(chars.length, length - 1)
            return (
              <span
                key={i}
                aria-hidden="true"
                className={`grid aspect-square min-w-0 place-items-center rounded-md bg-surface font-heading font-semibold text-ink-strong ring-1 transition text-lg sm:text-xl ${caret ? 'ring-2 ring-secondary' : error ? 'ring-danger' : 'ring-line-strong'}`}
              >
                {chars[i] ?? ''}
              </span>
            )
          })}
          <input
            id={id}
            name={name}
            value={value}
            onChange={handle}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            maxLength={length}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            aria-invalid={error ? true : undefined}
            aria-describedby={`${id}-preview${error ? ` ${id}-error` : ''}`}
            className="absolute inset-0 size-full cursor-text opacity-0"
          />
        </div>
        <p id={`${id}-preview`} aria-live="polite" className="mt-2 text-left text-sm text-ink-subtle">
          {value ? (
            <>Preview: <span className="font-heading text-base font-semibold tracking-widest text-secondary">{value}</span> ({value.length} of {length})</>
          ) : hint}
        </p>
        {error && <p id={`${id}-error`} className="mt-1 text-sm text-danger-ink">{error}</p>}
      </div>
    </div>
  )
}
