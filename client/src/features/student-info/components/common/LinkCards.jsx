import { ArrowUpRightIcon } from '@/shared/components/icons'

// External link tiles (open in a new tab); label is the link text as published. `note` shows the URL-style text if given.
export function LinkCards({ links, cols = 'md:grid-cols-3' }) {
  return (
    <ul className={`mt-6 grid grid-cols-1 gap-3 ${cols}`}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full items-center justify-between gap-4 rounded-2xl bg-surface p-5 ring-1 ring-line-soft transition hover:-translate-y-0.5 hover:shadow-card hover:ring-primary"
          >
            <span className="min-w-0">
              <span className="block font-heading font-semibold text-secondary">{link.label}</span>
              {link.note && <span className="mt-1 block truncate text-sm text-ink-subtle">{link.note}</span>}
            </span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-muted text-secondary transition group-hover:bg-primary group-hover:text-on-primary">
              <ArrowUpRightIcon className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
