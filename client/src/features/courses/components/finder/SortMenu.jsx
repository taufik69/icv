import { CheckIcon, ChevronDownIcon } from '@/shared/components/icons'
import { useListbox } from '@/shared/hooks/useListbox'

// Sort dropdown: pill trigger ("Sort by  Recommended") and a right-aligned listbox with an icon + hint per
// option. Keyboard behaviour comes from the shared useListbox (arrows, Home/End, Enter, Escape).
export function SortMenu({ label, options, value, onChange }) {
  const { open, active, setActive, rootRef, triggerRef, listRef, toggle, pick, onTriggerKeyDown, onListKeyDown } =
    useListbox({ options, value, onSelect: onChange })
  const selected = options.find((o) => o.value === value) ?? options[0]

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${selected.label}`}
        onClick={toggle}
        onKeyDown={onTriggerKeyDown}
        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-white pr-3 pl-4 text-sm ring-1 ring-line transition hover:ring-secondary/40 aria-expanded:ring-2 aria-expanded:ring-secondary"
      >
        <span className="text-secondary-muted max-sm:hidden">{label}</span>
        <span className="font-semibold text-secondary">{selected.label}</span>
        <ChevronDownIcon className={`size-4 text-secondary-muted transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`sort-opt-${active}`}
          onKeyDown={onListKeyDown}
          className="absolute top-full right-0 z-30 mt-2 w-64 rounded-2xl bg-white p-1.5 shadow-elevated ring-1 ring-line focus:outline-none motion-safe:animate-[fade-in_150ms_ease-out]"
        >
          {options.map(({ value: v, label: text, hint, Icon }, i) => {
            const isSelected = v === value
            return (
              <li
                key={v}
                id={`sort-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                data-index={i}
                onPointerMove={() => setActive(i)}
                onClick={() => pick(i)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${i === active ? 'bg-surface-muted' : ''}`}
              >
                <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${isSelected ? 'bg-secondary text-white' : 'bg-surface-muted text-secondary-muted'}`}>
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm ${isSelected ? 'font-semibold text-secondary' : 'text-secondary'}`}>{text}</span>
                  <span className="block text-xs text-secondary-muted">{hint}</span>
                </span>
                <CheckIcon className={`size-4 shrink-0 text-secondary ${isSelected ? '' : 'invisible'}`} />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
