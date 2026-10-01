import { useState } from 'react'
import { ChevronDownIcon, PenLineIcon } from '@/shared/components/icons'
import { taxonomyIcons } from '../../data/taxonomyIcons'
import { ArchiveButton } from '../courses/ArchiveButton'
import { controlClass } from '../course-form/fields/fieldStyles'
import { IconPicker } from './IconPicker'

const iconBtn = 'grid size-9 place-items-center rounded-lg bg-secondary/8 text-secondary transition hover:bg-secondary hover:text-white disabled:pointer-events-none disabled:opacity-30'

// One item: icon, name, how many courses use it; move up/down, rename (+ change icon), delete.
// Delete is refused by the server while courses use it — the reason shows under the row.
export function TaxonomyRow({ item, page, first, last, onMove, mutations }) {
  const [editing, setEditing] = useState(false)
  const [label, setLabel] = useState(item.label)
  const [icon, setIcon] = useState(item.icon)
  const Icon = taxonomyIcons[item.icon]
  const { update, remove } = mutations

  const save = (e) => {
    e.preventDefault()
    update.mutate({ id: item.id, label: label.trim(), ...(page.icons && { icon }) }, { onSuccess: () => setEditing(false) })
  }

  if (editing) {
    return (
      <li className="grid gap-3 bg-surface-alt px-5 py-4 sm:px-7">
        <form onSubmit={save} className="flex flex-wrap items-center gap-2">
          <input autoFocus value={label} onChange={(e) => setLabel(e.target.value)} aria-label={`Name of ${item.label}`} className={`${controlClass} min-w-0 flex-1 basis-56`} />
          <button type="submit" disabled={!label.trim() || update.isPending} className="h-11 rounded-xl bg-secondary px-4 text-sm font-semibold text-white disabled:opacity-50">Save</button>
          <button type="button" onClick={() => setEditing(false)} className="h-11 rounded-xl px-3 text-sm font-semibold text-ink-muted hover:bg-surface-muted">Cancel</button>
        </form>
        {page.icons && <IconPicker value={icon} onChange={setIcon} label={`Icon for ${item.label}`} />}
        {update.isError && <p role="alert" className="text-sm text-danger-ink">{update.error.message}</p>}
      </li>
    )
  }

  return (
    <li className="px-5 py-3.5 sm:px-7">
      <div className="flex items-center gap-3">
        {page.icons && (
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary/8 text-secondary">{Icon && <Icon className="size-4.5" />}</span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading font-semibold text-secondary">{item.label}</p>
          <p className="text-xs text-ink-subtle">{item.courses ? `${item.courses} course${item.courses === 1 ? '' : 's'}` : 'Not used yet'}</p>
        </div>
        <button type="button" onClick={() => onMove(-1)} disabled={first} aria-label={`Move ${item.label} up`} className={iconBtn}><ChevronDownIcon className="size-4 rotate-180" /></button>
        <button type="button" onClick={() => onMove(1)} disabled={last} aria-label={`Move ${item.label} down`} className={iconBtn}><ChevronDownIcon className="size-4" /></button>
        <button type="button" onClick={() => setEditing(true)} aria-label={`Rename ${item.label}`} title="Rename" className={iconBtn}><PenLineIcon className="size-4" /></button>
        <ArchiveButton title={item.label} pending={remove.isPending && remove.variables === item.id} onConfirm={() => remove.mutate(item.id)} />
      </div>
      {remove.isError && remove.variables === item.id && <p role="alert" className="mt-2 text-sm text-danger-ink">{remove.error.message}</p>}
    </li>
  )
}
