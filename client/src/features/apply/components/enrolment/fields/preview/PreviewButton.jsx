import { useState } from 'react'
import { EyeIcon } from '@/shared/components/icons'
import { PreviewDialog } from './PreviewDialog'

const styles = {
  icon: 'grid size-8 shrink-0 place-items-center rounded-lg text-ink-subtle transition hover:bg-surface-muted hover:text-secondary',
  pill: 'inline-flex min-h-11 items-center gap-2 rounded-pill px-4 text-sm font-semibold text-secondary ring-1 ring-line transition hover:ring-secondary',
}

// "Preview" button for an uploaded file: pass a File (`file`) or an image URL (`src`). A File gets a
// blob URL only while the preview is open.
export function PreviewButton({ file, src, name, look = 'pill' }) {
  const [url, setUrl] = useState('')
  const label = name ?? file?.name
  const open = () => setUrl(file ? URL.createObjectURL(file) : src)
  const close = () => {
    if (file) URL.revokeObjectURL(url)
    setUrl('')
  }

  return (
    <>
      <button type="button" onClick={open} aria-label={look === 'icon' ? `Preview ${label}` : undefined} className={styles[look]}>
        <EyeIcon className="size-4" />
        {look === 'pill' && 'Preview'}
      </button>
      {url && <PreviewDialog src={url} name={label} pdf={/\.pdf$/i.test(file?.name ?? '')} onClose={close} />}
    </>
  )
}
