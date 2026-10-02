import { useEffect } from 'react'
import { ChevronDownIcon } from '@/shared/components/icons'
import { useListbox } from '@/shared/hooks/useListbox'
import { SelectOption } from './SelectOption'

const trigger = 'mt-1.5 flex w-full items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-left transition hover:border-line-strong focus:border-primary-hover focus:shadow-focus-success focus:outline-none aria-expanded:border-primary-hover aria-expanded:shadow-focus-success aria-invalid:border-danger disabled:cursor-wait disabled:bg-surface-alt'

// Styled single-select for the apply form. options = [{ value, label, badge?, group? }]. Optional `error`
// (shown under it), `required` marker and `disabled` (e.g. while options load).
// Calls onChange({ target: { value } }) so it plugs into the same `set(key)` handler as native fields.
// The list stays mounted and fades/slides in and out (a hidden list is `invisible`, so out of the tab order
// and the accessibility tree). Visibility animates only on close: on open it must be visible at once so the
// list can take keyboard focus. Reduced motion skips the animation.
// `triggerClass` swaps the button look (the enrolment form passes its own).
export function ApplySelect({ name, label, value, options, placeholder = 'Please select', onChange, error, required, disabled, triggerClass = trigger, openKey, className = '' }) {
  const { open, active, setActive, rootRef, triggerRef, listRef, show, toggle, pick, onTriggerKeyDown, onListKeyDown } =
    useListbox({ options, value, onSelect: (v) => onChange({ target: { value: v } }) })
  // A new `openKey` opens the list (e.g. right after a study area is clicked).
  useEffect(() => {
    if (openKey) show()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openKey])
  const selected = options.find((o) => o.value === value)
  const id = `apply-${name}`

  return (
    <div ref={rootRef} className={className}>
      <span id={`${id}-label`} className="font-heading text-sm font-semibold text-secondary">
        {label}
        {required && <span aria-hidden="true" className="text-danger"> *</span>}
      </span>
      <div className="relative">
        <button
          ref={triggerRef}
          id={id}
          name={name}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-labelledby={`${id}-label ${id}`}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onClick={toggle}
          onKeyDown={onTriggerKeyDown}
          className={triggerClass}
        >
          {selected?.badge && <span className="shrink-0 rounded-md bg-primary-soft px-2 py-0.5 font-heading text-xs font-bold text-secondary">{selected.badge}</span>}
          <span className={`min-w-0 flex-1 truncate ${selected ? 'text-ink' : 'text-ink-disabled'}`}>{selected?.label ?? placeholder}</span>
          <ChevronDownIcon className={`size-4.5 shrink-0 text-ink-subtle transition ${open ? 'rotate-180 text-primary-hover' : ''}`} />
        </button>
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
          onKeyDown={onListKeyDown}
          className={`absolute inset-x-0 top-full z-30 mt-2 max-h-80 origin-top overflow-y-auto overscroll-contain rounded-2xl bg-surface p-1.5 shadow-elevated ring-1 ring-line duration-200 ease-out focus:outline-none motion-reduce:transition-none ${open ? 'visible translate-y-0 scale-100 opacity-100 transition-[opacity,translate,scale]' : 'pointer-events-none invisible -translate-y-1.5 scale-[0.98] opacity-0 transition-[opacity,translate,scale,visibility]'}`}
        >
          {options.map((o, i) => (
            <SelectOption
              key={o.value}
              id={`${id}-opt-${i}`}
              index={i}
              option={o}
              heading={o.group && o.group !== options[i - 1]?.group ? o.group : null}
              selected={o.value === value}
              active={open && i === active}
              onHover={() => setActive(i)}
              onPick={() => pick(i)}
            />
          ))}
        </ul>
      </div>
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm text-danger-ink">{error}</p>}
    </div>
  )
}
