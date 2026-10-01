import { CheckIcon } from '@/shared/components/icons'

// One row of SelectMenu: optional icon tile, label (+ hint underneath), check on the selected row.
export function SelectMenuOption({ id, index, option: { label, hint, Icon }, selected, active, onHover, onPick }) {
  return (
    <li
      id={id}
      role="option"
      aria-selected={selected}
      data-index={index}
      onPointerMove={onHover}
      onClick={onPick}
      className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 transition-colors ${active ? 'bg-secondary/6' : ''}`}
    >
      {Icon && (
        <span className={`grid size-8 shrink-0 place-items-center rounded-lg transition-colors ${selected ? 'bg-secondary text-white' : 'bg-surface-muted text-secondary-muted'}`}>
          <Icon className="size-4" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className={`block truncate text-sm ${selected ? 'font-semibold text-secondary' : 'text-ink'}`}>{label}</span>
        {hint && <span className="block truncate text-xs text-ink-subtle">{hint}</span>}
      </span>
      <CheckIcon className={`size-4 shrink-0 text-primary-hover ${selected ? '' : 'invisible'}`} />
    </li>
  )
}
