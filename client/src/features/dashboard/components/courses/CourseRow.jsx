import { Link } from '@tanstack/react-router'
import { ArrowUpRightIcon, EyeIcon, PenLineIcon } from '@/shared/components/icons'
import { marketLabel } from '../../data/courseOptions'
import { useTaxonomyLabel } from '../../hooks/useTaxonomy'
import { useArchiveCourse, useSetCourseStatus } from '../../hooks/useCourseMutations'
import { ArchiveButton } from './ArchiveButton'
import { rowGrid } from './rowGrid'
import { StatusSwitch } from './StatusSwitch'

const Slash = () => <span aria-hidden="true" className="mx-1.5 text-line-strong">/</span>

// Soft tinted action buttons (same shape as the delete button) view + edit navy, open neutral grey.
const iconButton = 'grid size-9 place-items-center rounded-lg transition'
const tone = {
  view: 'bg-secondary/8 text-secondary hover:bg-secondary hover:text-white',
  edit: 'bg-secondary/8 text-secondary hover:bg-secondary hover:text-white',
  open: 'bg-surface-sunken text-ink-muted hover:bg-ink-muted hover:text-white',
}

// One course: thumbnail, title + code, market, active switch (saves), actions. Stacks into a card below md.
export function CourseRow({ course }) {
  const { id, title, code, studyArea, market, slug, status, images, externalUrl } = course
  const setStatus = useSetCourseStatus()
  const archive = useArchiveCourse()
  const studyAreaLabel = useTaxonomyLabel('study-areas')
  const image = images?.card ?? images?.hero
  const active = status === 'active'
  const params = { market, slug }

  return (
    <li className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 px-5 py-4 transition hover:bg-surface-alt ${rowGrid}`}>
      <div className="col-span-2 flex min-w-0 items-center gap-4 md:col-span-1">
        {image ? (
          <img src={image.src} alt="" width="64" height="48" loading="lazy" className={`h-12 w-16 shrink-0 rounded-lg object-cover transition ${active ? '' : 'opacity-50 grayscale'}`} />
        ) : (
          <span className="h-12 w-16 shrink-0 rounded-lg bg-surface-sunken" />
        )}
        <div className="min-w-0">
          <p className={`truncate font-heading font-semibold ${active ? 'text-secondary' : 'text-ink-subtle'}`}>{title}</p>
          <p className="mt-0.5 truncate text-sm text-ink-subtle">
            {code}<Slash />{studyAreaLabel(studyArea)}<span className="md:hidden"><Slash />{marketLabel(market)}</span>
          </p>
        </div>
      </div>
      <span className="hidden text-sm text-ink-muted md:block">{marketLabel(market)}</span>
      <div>
        <StatusSwitch status={status} label={title} disabled={setStatus.isPending} onChange={(next) => setStatus.mutate({ id, status: next })} />
        {setStatus.isError && <p role="alert" className="mt-1 text-xs text-danger-ink">{setStatus.error.message}</p>}
      </div>
      <div className="flex items-center justify-end gap-1.5">
        <Link to="/dashboard/courses/$market/$slug" params={params} aria-label={`View ${title}`} title="View" className={`${iconButton} ${tone.view}`}>
          <EyeIcon className="size-4.5" />
        </Link>
        <Link to="/dashboard/courses/$market/$slug/edit" params={params} aria-label={`Edit ${title}`} title="Edit" className={`${iconButton} ${tone.edit}`}>
          <PenLineIcon className="size-4.5" />
        </Link>
        {externalUrl ? (
          <a href={externalUrl} target="_blank" rel="noreferrer" aria-label={`Open ${title} on icv.edu.au`} title="Open on website" className={`${iconButton} ${tone.open}`}>
            <ArrowUpRightIcon className="size-4.5" />
          </a>
        ) : (
          <Link to="/courses/$market/$slug" params={params} aria-label={`Open ${title} on the website`} title="Open on website" className={`${iconButton} ${tone.open}`}>
            <ArrowUpRightIcon className="size-4.5" />
          </Link>
        )}
        <span aria-hidden="true" className="mx-1 h-5 w-px bg-line" />
        <ArchiveButton title={title} pending={archive.isPending} onConfirm={() => archive.mutate(id)} />
      </div>
    </li>
  )
}
