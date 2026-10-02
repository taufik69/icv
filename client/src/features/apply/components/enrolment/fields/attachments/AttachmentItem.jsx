import { CheckIcon } from '@/shared/components/icons'
import { FileDrop } from './FileDrop'
import { FileRow } from './FileRow'

// One checklist document. Ticking it slides open an upload area just for this document (plus `children`,
// e.g. the name field for "Other"); unticking slides it shut (files are kept). The panel's height animates
// via grid rows 0fr ↔ 1fr; while shut it is `inert`, so nothing inside can be tabbed to.
// The tag on the right says whether a file is attached yet.
export function AttachmentItem({ id, label, short, checked, onToggle, files, problem, onFiles, onRemove, children }) {
  const count = files.length
  return (
    <li className={`rounded-2xl ring-1 transition ${checked ? 'bg-surface-alt ring-secondary/40' : 'ring-line hover:ring-line-strong'}`}>
      <label className="flex cursor-pointer items-start gap-3 p-4 has-focus-visible:rounded-2xl has-focus-visible:ring-4 has-focus-visible:ring-secondary/10">
        <input type="checkbox" checked={checked} onChange={onToggle} aria-controls={`${id}-panel`} className="peer sr-only" />
        <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md ring-1 ring-line-strong peer-checked:bg-secondary peer-checked:ring-secondary [&>svg]:invisible peer-checked:[&>svg]:visible">
          <CheckIcon className="size-3.5 text-white" />
        </span>
        <span className="min-w-0 flex-1 text-sm leading-relaxed text-ink">{label}</span>
        {checked && (
          <span className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold ${count ? 'bg-success-soft text-success-ink' : 'bg-warning-soft text-warning-ink'}`}>
            {count ? `${count} ${count === 1 ? 'file' : 'files'}` : 'Needs a file'}
          </span>
        )}
      </label>
      <div
        id={`${id}-panel`} inert={!checked}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${checked ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid gap-3 px-4 pb-4 sm:pl-12">
            {children}
            <FileDrop id={`${id}-file`} label={short} onFiles={onFiles} />
            {problem && <p role="alert" className="text-sm text-danger-ink">{problem}</p>}
            {count > 0 && (
              <ul className="grid gap-2" aria-label={`Files for ${short}`}>
                {files.map((f) => <FileRow key={f.name} file={f} onRemove={() => onRemove(f)} />)}
              </ul>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
