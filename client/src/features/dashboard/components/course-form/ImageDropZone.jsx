import { useState } from 'react'
import { UploadIcon } from '@/shared/components/icons'

const ACCEPT = 'image/jpeg,image/png,image/webp,image/avif'

// File picker that also takes a dropped file. `compact` = small "Replace" button over a preview.
export function ImageDropZone({ onFile, hint, compact, labelledBy }) {
  const [over, setOver] = useState(false)
  const take = (file) => file && onFile(file)
  const input = (
    <input type="file" accept={ACCEPT} aria-labelledby={labelledBy} className="sr-only" onChange={(e) => { take(e.target.files[0]); e.target.value = '' }} />
  )

  if (compact) {
    return (
      <label className="flex h-9 cursor-pointer items-center rounded-lg bg-surface/90 px-3 text-sm font-semibold text-secondary shadow-raised hover:bg-surface focus-within:ring-2 focus-within:ring-focus">
        Replace{input}
      </label>
    )
  }

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); take(e.dataTransfer.files[0]) }}
      className={`flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 text-center transition focus-within:ring-2 focus-within:ring-focus hover:border-primary hover:bg-primary-soft ${over ? 'border-primary bg-primary-soft' : 'border-line bg-surface-alt'}`}
    >
      <UploadIcon className="size-6 text-primary-hover" />
      <span className="text-sm font-semibold text-secondary">Drop an image or choose a file</span>
      <span className="text-xs text-ink-subtle">JPG, PNG or WebP, up to 8 MB. {hint}</span>
      {input}
    </label>
  )
}
