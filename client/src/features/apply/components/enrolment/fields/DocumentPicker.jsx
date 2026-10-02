import { useState } from 'react'
import { FileTextIcon, TrashIcon, UploadIcon } from '@/shared/components/icons'

// File picker for the checklist documents. UI only: files stay in this page (not uploaded or saved
// with the draft), so they need to be added again after a reload.
export function DocumentPicker() {
  const [files, setFiles] = useState([])
  const add = (e) => {
    const picked = [...e.target.files]
    setFiles((list) => [...list, ...picked.filter((f) => !list.some((x) => x.name === f.name))])
    e.target.value = ''
  }

  return (
    <div className="sm:col-span-2">
      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-line-strong bg-surface-alt px-6 py-8 text-center transition hover:border-secondary has-focus-visible:shadow-focus-success">
        <UploadIcon className="size-7 text-secondary-muted" />
        <span className="font-heading font-semibold text-secondary">Attach documents</span>
        <span className="text-sm text-ink-subtle">PDF, JPG or PNG. You can choose several files at once.</span>
        <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={add} className="sr-only" />
      </label>
      {files.length > 0 && (
        <ul className="mt-3 grid gap-2">
          {files.map((f) => (
            <li key={f.name} className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 ring-1 ring-line">
              <FileTextIcon className="size-5 shrink-0 text-secondary-muted" />
              <span className="min-w-0 flex-1 truncate text-sm text-ink">{f.name}</span>
              <span className="text-xs text-ink-subtle">{Math.max(1, Math.round(f.size / 1024))} KB</span>
              <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles((list) => list.filter((x) => x !== f))}
                className="rounded-lg p-1.5 text-ink-subtle transition hover:bg-danger-soft hover:text-danger-ink">
                <TrashIcon className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
