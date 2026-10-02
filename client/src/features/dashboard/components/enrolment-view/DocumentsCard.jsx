import { documentSummary } from '../../lib/enrolmentView'
import { FileLink } from './FileLink'
import { SectionCard } from './SectionCard'

// (M) The documents the student ticked, each with its files. A ticked document with no file is flagged.
export function DocumentsCard({ enrolmentId, attachments }) {
  const { ticked, withFiles } = documentSummary(attachments)
  return (
    <SectionCard id="documents" letters="M" title="Documents" aside={ticked ? `${withFiles} of ${ticked} with files` : undefined}>
      {ticked ? (
        <ul className="grid gap-3">
          {attachments.map((a) => (
            <li key={a.key} className="grid gap-2.5 rounded-xl bg-surface-alt p-4 ring-1 ring-line-soft">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="min-w-0 flex-1 text-sm leading-relaxed text-ink">{a.key === 'other' ? `Other: ${a.name || 'not named'}` : a.label}</p>
                {!a.files.length && <span className="rounded-md bg-warning-soft px-2 py-0.5 text-xs font-semibold text-warning-ink">No file</span>}
              </div>
              {a.files.length > 0 && (
                <div className="grid gap-2 sm:grid-cols-2">{a.files.map((f) => <FileLink key={f.id} enrolmentId={enrolmentId} file={f} />)}</div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-ink-disabled">No documents ticked.</p>
      )}
    </SectionCard>
  )
}
