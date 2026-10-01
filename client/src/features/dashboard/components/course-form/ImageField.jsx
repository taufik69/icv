import { useId, useState } from 'react'
import { TrashIcon } from '@/shared/components/icons'
import { useUploadImage } from '../../hooks/useCourseMutations'
import { ImageDropZone } from './ImageDropZone'
import { InputField } from './fields/InputField'

// One image slot: drop or pick a file → uploaded to the API server (stored as WebP in several sizes)
// → the returned { src, srcSet, width, height } goes into the form. Alt text is typed here.
export function ImageField({ label, hint, value, onChange }) {
  const upload = useUploadImage()
  const [preview, setPreview] = useState(null)
  const id = useId()

  const pick = (file) => {
    const local = URL.createObjectURL(file)
    setPreview(local)
    upload.mutate(file, {
      onSuccess: (img) => onChange({ ...img, alt: value.alt }),
      onSettled: () => {
        setPreview(null)
        URL.revokeObjectURL(local)
      },
    })
  }

  const src = preview ?? value.src
  return (
    <div className="grid content-start gap-3">
      <p id={id} className="font-heading text-sm font-semibold text-secondary">{label}</p>
      {src ? (
        <div className="relative aspect-video overflow-hidden rounded-xl bg-surface-sunken ring-1 ring-line">
          <img src={src} alt="" className={`size-full object-cover ${upload.isPending ? 'opacity-50' : ''}`} />
          {upload.isPending && <p className="absolute inset-x-0 bottom-0 bg-secondary/80 px-3 py-2 text-sm text-white">Uploading…</p>}
          {!upload.isPending && (
            <div className="absolute top-2 right-2 flex gap-2">
              <ImageDropZone compact labelledBy={id} onFile={pick} />
              <button type="button" onClick={() => onChange({ src: '', alt: value.alt })} aria-label={`Remove ${label.toLowerCase()}`} className="grid size-9 place-items-center rounded-lg bg-surface/90 text-danger-ink shadow-raised hover:bg-danger hover:text-white">
                <TrashIcon className="size-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <ImageDropZone labelledBy={id} hint={hint} onFile={pick} />
      )}
      {upload.isError && <p role="alert" className="text-sm text-danger-ink">{upload.error.message}</p>}
      <InputField label="Alt text" placeholder="What the photo shows" value={value.alt} onChange={(e) => onChange({ ...value, alt: e.target.value })} />
    </div>
  )
}
