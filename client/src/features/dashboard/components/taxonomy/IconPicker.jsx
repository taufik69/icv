import { taxonomyIcons } from '../../data/taxonomyIcons'

// Row of icon choices (radio group). The selected icon fills navy.
export function IconPicker({ value, onChange, label = 'Icon' }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5">
      {Object.entries(taxonomyIcons).map(([name, Icon]) => (
        <button
          key={name}
          type="button"
          role="radio"
          aria-checked={value === name}
          aria-label={name}
          title={name}
          onClick={() => onChange(name)}
          className="grid size-9 place-items-center rounded-lg bg-surface-muted text-secondary-muted ring-1 ring-line transition hover:text-secondary aria-checked:bg-secondary aria-checked:text-white aria-checked:ring-secondary"
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  )
}
