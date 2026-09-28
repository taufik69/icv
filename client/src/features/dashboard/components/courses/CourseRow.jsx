import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRightIcon, EyeIcon, PenLineIcon, TrashIcon } from '@/shared/components/icons'
import { rowGrid } from './rowGrid'
import { StatusSwitch } from './StatusSwitch'

const Slash = () => <span aria-hidden="true" className="mx-1.5 text-line-strong">/</span>

const iconButton = 'grid size-9 place-items-center rounded-lg text-ink-subtle transition hover:bg-surface-muted hover:text-secondary'

// One course: thumbnail, title + code, market, active switch, actions. Stacks into a card below md.
// The switch only changes local state and delete does nothing yet (UI only).
export function CourseRow({ course }) {
  const { title, code, category, market, marketId, slug, image, to } = course
  const [active, setActive] = useState(true)

  return (
    <li className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 px-5 py-4 transition hover:bg-surface-alt ${rowGrid}`}>
      <div className="col-span-2 flex min-w-0 items-center gap-4 md:col-span-1">
        <img src={image.src} alt="" width="64" height="48" loading="lazy" className={`h-12 w-16 shrink-0 rounded-lg object-cover transition ${active ? '' : 'opacity-50 grayscale'}`} />
        <div className="min-w-0">
          <p className={`truncate font-heading font-semibold ${active ? 'text-secondary' : 'text-ink-subtle'}`}>{title}</p>
          <p className="mt-0.5 truncate text-sm text-ink-subtle">
            {code}<Slash />{category}<span className="md:hidden"><Slash />{market}</span>
          </p>
        </div>
      </div>
      <span className="hidden text-sm text-ink-muted md:block">{market}</span>
      <div>
        <StatusSwitch active={active} onChange={setActive} label={title} />
      </div>
      <div className="flex items-center justify-end gap-0.5">
        <Link to="/dashboard/courses/$market/$slug" params={{ market: marketId, slug }} aria-label={`View ${title}`} title="View" className={iconButton}>
          <EyeIcon className="size-4.5" />
        </Link>
        <Link to="/dashboard/courses/new" aria-label={`Edit ${title}`} title="Edit" className={iconButton}>
          <PenLineIcon className="size-4.5" />
        </Link>
        <Link to={to} aria-label={`Open ${title} on the website`} title="Open on website" className={iconButton}>
          <ArrowUpRightIcon className="size-4.5" />
        </Link>
        <span aria-hidden="true" className="mx-1 h-5 w-px bg-line" />
        <button type="button" aria-label={`Delete ${title}`} title="Delete" className="grid size-9 place-items-center rounded-lg bg-danger-soft text-danger-ink transition">
          <TrashIcon className="size-4.5" />
        </button>
      </div>
    </li>
  )
}
