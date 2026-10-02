import { ArrowUpRightIcon, FileTextIcon, ImageIcon } from '@/shared/components/icons'
import { enrolmentAdminApi } from '../../api/enrolmentAdminApi'

const size = (bytes) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`)

// One uploaded file: opens in a new tab (the API serves it inline, under its original name).
export function FileLink({ enrolmentId, file }) {
  const Icon = file.mimeType === 'application/pdf' ? FileTextIcon : ImageIcon
  return (
    <a
      href={enrolmentAdminApi.fileUrl(enrolmentId, file.id)} target="_blank" rel="noreferrer"
      className="group flex min-w-0 items-center gap-3 rounded-xl bg-surface px-3.5 py-2.5 ring-1 ring-line transition hover:ring-secondary"
    >
      <Icon className="size-5 shrink-0 text-secondary-muted" />
      <span className="min-w-0 flex-1 truncate text-sm text-ink">{file.name}</span>
      <span className="shrink-0 text-xs text-ink-subtle">{size(file.size)}</span>
      <ArrowUpRightIcon aria-label="Opens in a new tab" className="size-4 shrink-0 text-ink-subtle group-hover:text-secondary" />
    </a>
  )
}
