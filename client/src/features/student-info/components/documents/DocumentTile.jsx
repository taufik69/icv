import { fileType } from '@/features/student-info/lib/fileType'
import { DownloadIcon, FileTextIcon } from '@/shared/components/icons'
import { PlusCard } from '@/shared/components/ui'

// Compact blueprint cell for one document: the whole card is the download link. Hover fills the icon tile navy
// and the download circle green (the plus marks turn, from PlusCard).
export function DocumentTile({ doc, action }) {
  return (
    <PlusCard
      tone="light"
      as="a"
      href={doc.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full items-center gap-4 p-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary/8 text-secondary transition group-hover/plus:bg-secondary group-hover/plus:text-white">
        <FileTextIcon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-heading text-base leading-snug font-semibold text-secondary md:text-lg">{doc.title}</span>
        <span className="mt-1.5 inline-block rounded-md px-1.5 py-0.5 font-condensed text-xs tracking-wider text-secondary-muted ring-1 ring-line">{fileType(doc.href)}</span>
      </span>
      <span className="grid size-10 shrink-0 place-items-center rounded-full text-secondary ring-1 ring-line transition group-hover/plus:bg-primary group-hover/plus:text-on-primary group-hover/plus:ring-primary">
        <DownloadIcon className="size-4" />
        <span className="sr-only">{action} {doc.title}</span>
      </span>
    </PlusCard>
  )
}
