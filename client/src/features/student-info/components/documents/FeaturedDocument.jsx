import { fileType } from '@/features/student-info/lib/fileType'
import { DownloadIcon, FileTextIcon } from '@/shared/components/icons'
import { PlusCard } from '@/shared/components/ui'

// Tall intro cell: the section heading on top, the first (main) document pinned to the bottom as a large
// file tile with a green download button — the same anatomy as the home page's "Launch your career" cell.
export function FeaturedDocument({ id, heading, doc, action }) {
  return (
    <PlusCard tone="light" className="flex h-full flex-col justify-between gap-12 md:p-8">
      <div>
        <h2 id={id} className="text-3xl leading-tight md:text-4xl">{heading}</h2>
        <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-pill bg-primary" />
      </div>

      <div>
        <span aria-hidden="true" className="relative grid h-36 w-28 place-items-center rounded-xl bg-secondary text-white shadow-brand">
          <FileTextIcon className="size-10" />
          <span className="absolute -right-3 -bottom-3 rounded-md bg-primary px-2 py-1 font-condensed text-xs font-bold tracking-wider text-on-primary">
            {fileType(doc.href)}
          </span>
        </span>
        <p className="mt-8 text-left font-heading text-2xl leading-snug font-semibold text-secondary hyphens-none md:text-3xl">{doc.title}</p>
        <a
          href={doc.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group btn-shine mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-heading font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary"
        >
          <DownloadIcon className="size-4 transition group-hover:translate-y-0.5" />
          {action}
          <span className="sr-only">{doc.title}</span>
        </a>
      </div>
    </PlusCard>
  )
}
