import { PlusIcon, TrashIcon } from '@/shared/components/icons'

// Frame for a repeatable list (qualifications, English tests): optional column header (sm+), one row per
// entry with its number and a remove button (phones: number on its own line above the fields), and an
// "Add …" footer.
export function ListShell({ header, items, renderItem, onAdd, onRemove, addLabel, itemLabel, max = 6 }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
      {header}
      <ol className="divide-y divide-line">
        {items.map((item, i) => (
          <li key={i} className="relative grid gap-3 p-4 sm:grid-cols-[1.75rem_minmax(0,1fr)] sm:gap-4 sm:pr-12">
            <span aria-hidden="true" className="grid size-7 place-items-center rounded-full bg-surface-muted text-xs font-semibold text-secondary sm:mt-1.5">
              {i + 1}
            </span>
            {renderItem(item, i)}
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(i)}
                aria-label={`Remove ${itemLabel} ${i + 1}`}
                className="absolute top-4 right-3 grid size-8 place-items-center rounded-full bg-danger-soft text-danger-ink transition hover:bg-danger hover:text-white focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-secondary/30 focus-visible:outline-none sm:top-5"
              >
                <TrashIcon className="size-4" />
              </button>
            )}
          </li>
        ))}
      </ol>
      {items.length < max && (
        <button
          type="button"
          onClick={onAdd}
          className="flex w-full items-center gap-2 border-t border-line bg-surface-alt px-4 py-3 text-sm font-semibold text-secondary transition hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:shadow-none focus-visible:outline-none"
        >
          <PlusIcon className="size-4" /> {addLabel}
        </button>
      )}
    </div>
  )
}
