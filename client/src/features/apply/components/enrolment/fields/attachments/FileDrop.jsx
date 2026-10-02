import { useState } from 'react'
import { UploadIcon } from '@/shared/components/icons'

// Drop zone for one document: click to browse or drag files onto it. `onFiles` gets the FileList.
export function FileDrop({ id, label, onFiles }) {
  const [over, setOver] = useState(false)
  const drop = (e) => {
    e.preventDefault()
    setOver(false)
    onFiles(e.dataTransfer.files)
  }

  return (
    <label
      htmlFor={id}
      onDragOver={(e) => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={drop}
      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed px-4 py-3.5 transition has-focus-visible:border-secondary has-focus-visible:ring-4 has-focus-visible:ring-secondary/10 ${over ? 'border-secondary bg-surface-muted' : 'border-line-strong bg-surface hover:border-secondary'}`}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-muted text-secondary">
        <UploadIcon className="size-5" />
      </span>
      <span className="min-w-0 text-sm">
        <span className="block font-heading font-semibold text-secondary">{over ? 'Drop to add' : `Upload ${label}`}</span>
        <span className="block text-ink-subtle">Drag files here or browse. PDF, JPG or PNG, up to 10 MB each.</span>
      </span>
      <input
        id={id} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="sr-only"
        onChange={(e) => { onFiles(e.target.files); e.target.value = '' }}
      />
    </label>
  )
}
