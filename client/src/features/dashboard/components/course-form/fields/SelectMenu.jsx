import { useLayoutEffect, useState } from 'react'
import { ChevronDownIcon } from '@/shared/components/icons'
import { useListbox } from '@/shared/hooks/useListbox'
import { SelectMenuOption } from './SelectMenuOption'

const sizes = { md: 'h-11 rounded-xl px-3.5', sm: 'h-10 rounded-xl px-3 text-sm' }

// Dashboard dropdown (replaces the native <select>): a field-styled trigger and a floating option panel,
// keyboard-driven by the shared useListbox (arrows, Home/End, Enter, Escape). Opens upwards near the
// bottom of the screen. options = [{ value, label, hint?, Icon? }]; onChange receives the new value.
export function SelectMenu({ id, value, options, onChange, placeholder = 'Choose…', size = 'md', ...aria }) {
  const { open, active, setActive, rootRef, triggerRef, listRef, toggle, pick, onTriggerKeyDown, onListKeyDown } =
    useListbox({ options, value, onSelect: onChange })
  const [up, setUp] = useState(false)
  const selected = options.find((o) => o.value === value)

  useLayoutEffect(() => {
    if (!open) return
    const r = triggerRef.current.getBoundingClientRect()
    setUp(window.innerHeight - r.bottom < 300 && r.top > window.innerHeight - r.bottom)
  }, [open, triggerRef])

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={onTriggerKeyDown}
        className={`flex w-full items-center gap-2.5 border border-line bg-surface text-left transition hover:border-line-strong focus:border-primary-hover focus:shadow-focus-success focus:outline-none aria-expanded:border-primary-hover aria-expanded:shadow-focus-success ${sizes[size]}`}
        {...aria}
      >
        {selected?.Icon && <selected.Icon className="size-4 shrink-0 text-secondary-muted" />}
        <span className={`min-w-0 flex-1 truncate ${selected ? 'text-ink' : 'text-ink-disabled'}`}>{selected?.label ?? placeholder}</span>
        <ChevronDownIcon className={`size-4 shrink-0 text-ink-subtle transition duration-200 ${open ? 'rotate-180 text-secondary' : ''}`} />
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`${id}-opt-${active}`}
          onKeyDown={onListKeyDown}
          className={`absolute inset-x-0 z-30 max-h-72 min-w-56 overflow-y-auto overscroll-contain rounded-xl bg-surface p-1.5 shadow-elevated ring-1 ring-line focus:outline-none motion-safe:animate-[fade-in_120ms_ease-out] ${up ? 'bottom-full mb-2' : 'top-full mt-2'}`}
        >
          {options.map((o, i) => (
            <SelectMenuOption
              key={o.value}
              id={`${id}-opt-${i}`}
              index={i}
              option={o}
              selected={o.value === value}
              active={i === active}
              onHover={() => setActive(i)}
              onPick={() => pick(i)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
