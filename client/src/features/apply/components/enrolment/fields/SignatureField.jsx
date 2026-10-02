import { useState } from 'react'
import { PenLineIcon, TrashIcon, UploadIcon } from '@/shared/components/icons'
import { shrinkImage } from '../../../lib/shrinkImage'
import { PreviewButton } from './preview/PreviewButton'

const isImage = (v) => typeof v === 'string' && v.startsWith('data:image')

// Signature of student as an image: upload a photo or scan of the signature (JPG/PNG), shown on a
// signature line. The image is scaled down and kept in the draft as a data URL.
export function SignatureField({ name, value, onChange, error, className = '' }) {
  const [problem, setProblem] = useState('')
  const id = `apply-${name}`
  const pick = async (e) => {
    const file = e.target.files[0]
    e.target.value = ''
    if (!file) return
    if (!/\.(jpe?g|png)$/i.test(file.name)) return setProblem('Use a JPG or PNG image.')
    try {
      onChange({ target: { value: await shrinkImage(file) } })
      setProblem('')
    } catch {
      setProblem('This image could not be read. Try another photo.')
    }
  }
  const message = problem || error

  return (
    <div className={className}>
      <p id={`${id}-label`} className="font-heading text-sm font-semibold text-secondary">
        Signature of student <span aria-hidden="true" className="text-danger">*</span>
      </p>
      <div className={`mt-1.5 flex flex-wrap items-end gap-4 rounded-2xl bg-surface p-4 ring-1 ${message ? 'ring-danger' : 'ring-line'}`}>
        <div className="grid h-28 min-w-0 flex-1 basis-60 place-items-center border-b-2 border-secondary">
          {isImage(value) ? (
            <img src={value} alt="Your signature" className="max-h-24 max-w-full object-contain" />
          ) : (
            <span className="flex items-center gap-2 text-sm text-ink-disabled"><PenLineIcon className="size-5" /> No signature yet</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <label htmlFor={id} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-pill bg-secondary px-5 font-heading text-sm font-semibold text-white transition hover:bg-secondary-dark has-focus-visible:ring-4 has-focus-visible:ring-secondary/20">
            <UploadIcon className="size-4" /> {isImage(value) ? 'Replace' : 'Upload signature'}
          </label>
          <input id={id} name={name} type="file" accept=".jpg,.jpeg,.png" onChange={pick} className="sr-only"
            aria-labelledby={`${id}-label ${id}`} aria-invalid={message ? true : undefined} aria-describedby={`${id}-hint${message ? ` ${id}-error` : ''}`} />
          {isImage(value) && <PreviewButton src={value} name="Your signature" />}
          {isImage(value) && (
            <button type="button" onClick={() => onChange({ target: { value: '' } })} className="inline-flex min-h-11 items-center gap-2 rounded-pill px-4 text-sm font-semibold bg-danger-soft text-danger-ink transition hover:bg-danger hover:text-white">
              <TrashIcon className="size-4" /> Remove
            </button>
          )}
        </div>
      </div>
      <p id={`${id}-hint`} className="mt-2 text-sm text-ink-subtle">Sign on white paper with a dark pen, then upload a photo or scan (JPG or PNG).</p>
      {message && <p id={`${id}-error`} className="mt-1 text-sm text-danger-ink">{message}</p>}
    </div>
  )
}
