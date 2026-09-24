import { fileType } from '@/features/student-info/lib/fileType'
import { DownloadIcon, FileTextIcon } from '@/shared/components/icons'

const tones = {
  PDF: 'bg-secondary text-primary',
  DOCX: 'bg-sky/15 text-secondary',
  XLSX: 'bg-primary-soft text-primary-hover',
}

// Whole row is the link: numbered file tile, title, type badge, and a download pill that fills green on hover.
export function DocumentCard({ doc, index, action }) {
  const type = fileType(doc.href)

  return (
    <a
      href={doc.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full items-center gap-4 rounded-2xl bg-surface p-4 shadow-raised ring-1 ring-line-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-card hover:ring-primary md:gap-5 md:p-5"
    >
      <span className={`relative grid size-14 shrink-0 place-items-center rounded-xl transition duration-300 group-hover:rotate-3 ${tones[type] ?? tones.PDF}`}>
        <FileTextIcon className="size-6" />
        <span className="absolute -top-2 -left-2 grid size-6 place-items-center rounded-full bg-surface font-heading text-[0.65rem] font-bold text-secondary ring-1 ring-line-soft">
          {index + 1}
        </span>
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-heading leading-snug font-semibold text-secondary">{doc.title}</span>
        <span className="mt-1.5 inline-block rounded-md bg-surface-muted px-2 py-0.5 font-condensed text-xs tracking-wider text-ink-subtle">{type}</span>
      </span>

      <span className="hidden shrink-0 items-center gap-2 rounded-pill px-4 py-2 font-heading text-sm font-semibold text-secondary ring-1 ring-line transition group-hover:bg-primary group-hover:text-on-primary group-hover:ring-primary sm:inline-flex">
        <DownloadIcon className="size-4" />
        {action}
      </span>
      <span className="grid size-10 shrink-0 place-items-center rounded-full text-secondary ring-1 ring-line transition group-hover:bg-primary group-hover:text-on-primary sm:hidden">
        <DownloadIcon className="size-4" />
        <span className="sr-only">{action}</span>
      </span>
    </a>
  )
}
