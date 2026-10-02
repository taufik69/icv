import { FileTextIcon, ImageIcon, TrashIcon } from '@/shared/components/icons'
import { PreviewButton } from '../preview/PreviewButton'

const size = (bytes) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`)

// One attached file: type icon, name, size, preview and remove buttons.
export function FileRow({ file, onRemove }) {
  const Icon = /\.pdf$/i.test(file.name) ? FileTextIcon : ImageIcon
  return (
    <li className="flex items-center gap-3 rounded-xl bg-surface px-3 py-2.5 ring-1 ring-line">
      <Icon className="size-5 shrink-0 text-secondary-muted" />
      <span className="min-w-0 flex-1 truncate text-sm text-ink">{file.name}</span>
      <span className="shrink-0 text-xs text-ink-subtle">{size(file.size)}</span>
      <PreviewButton file={file} look="icon" />
      <button
        type="button" onClick={onRemove} aria-label={`Remove ${file.name}`}
        className="grid size-8 shrink-0 place-items-center rounded-lg bg-danger-soft text-danger-ink transition hover:bg-danger hover:text-white"
      >
        <TrashIcon className="size-4" />
      </button>
    </li>
  )
}
