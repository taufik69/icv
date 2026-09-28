import { UploadIcon } from '@/shared/components/icons'

// Image slot placeholder (hero, card…). No upload wiring yet.
export function ImageDrop({ label, hint }) {
  return (
    <div>
      <p className="mb-1.5 font-heading text-sm font-semibold text-secondary">{label}</p>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-surface-alt px-4 py-7 text-center transition hover:border-primary hover:bg-primary-soft">
        <UploadIcon className="size-6 text-primary-hover" />
        <span className="text-sm font-semibold text-secondary">Choose an image</span>
        <span className="text-xs text-ink-subtle">{hint}</span>
        <input type="file" accept="image/webp,image/jpeg,image/png" className="sr-only" />
      </label>
    </div>
  )
}
