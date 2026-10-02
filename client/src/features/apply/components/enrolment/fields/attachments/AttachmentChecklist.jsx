import { OTHER_ATTACHMENT, attachmentShort, attachments } from '../../../../data/enrolment/enrolmentOptions'
import { useAttachmentFiles } from '../../../../hooks/useAttachmentFiles'
import { Field } from '../Field'
import { AttachmentItem } from './AttachmentItem'

// (M) Attachment Checklist: tick a document, then upload that document right under it. "Other" adds a
// name field. Files are kept with the draft (IndexedDB), so they survive a reload. The summary line counts ticked documents that still need a file.
export function AttachmentChecklist({ form }) {
  const { values, field, toggle } = form
  const { files, problems, add, remove } = useAttachmentFiles()
  const items = [...attachments.map((label, i) => ({ label, short: attachmentShort[i] })), { label: 'Other document', short: 'document', key: OTHER_ATTACHMENT }]
  const ticked = items.filter((it) => values.attachments.includes(it.key ?? it.label))
  const missing = ticked.filter((it) => !(files[it.key ?? it.label]?.length)).length

  return (
    <fieldset className="sm:col-span-2">
      <legend className="font-heading text-sm font-semibold text-secondary">
        Provide all the relevant documents, incomplete applications will cause delays in processing:
      </legend>
      <p aria-live="polite" className="mt-1 text-sm text-ink-subtle">
        {ticked.length === 0 ? 'Tick each document you are sending, then upload it.' : missing ? `${missing} ticked ${missing === 1 ? 'document needs' : 'documents need'} a file.` : 'Every ticked document has a file.'}
      </p>
      <ul className="mt-3 grid gap-2.5">
        {items.map((it, i) => {
          const key = it.key ?? it.label
          return (
            <AttachmentItem
              key={key} id={`attachment-${i}`} label={it.label} short={it.short}
              checked={values.attachments.includes(key)} onToggle={() => toggle('attachments', key)}
              files={files[key] ?? []} problem={problems[key]}
              onFiles={(list) => add(key, list)} onRemove={(f) => remove(key, f)}
            >
              {it.key && <Field {...field('attachmentOther')} label="Document name" placeholder="e.g. Work experience letter" />}
            </AttachmentItem>
          )
        })}
      </ul>
    </fieldset>
  )
}
