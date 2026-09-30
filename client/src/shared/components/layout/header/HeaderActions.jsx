import { AppLink } from '@/shared/components/ui'
import { ArrowRightIcon, UserIcon } from '@/shared/components/icons'
import { applyLink, portalLabel, portalLinks } from '@/shared/config/navigation'
import { NavDropdown } from './NavDropdown'

// Apply Now + Portal button (Student / Trainer login). With `edge` (home page) a hairline separates Apply from the
// nav on xl+, and the Portal button shows only below lg and on the floating bar — the TopStrip has the logins.
export function HeaderActions({ edge = false }) {
  return (
    <div className="hidden items-center gap-2.5 md:flex">
      {edge && <span aria-hidden="true" className="mr-2 hidden h-6 w-px bg-white/20 group-data-[floating=true]/header:bg-line xl:block" />}
      <AppLink
        href={applyLink.href}
        className="group btn-shine inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 font-heading text-sm font-semibold whitespace-nowrap text-on-primary transition hover:bg-primary-hover hover:text-on-primary group-data-[floating=true]/header:shadow-card"
      >
        {applyLink.label}
        <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
      </AppLink>
      <div className={`group relative ${edge ? 'lg:hidden lg:group-data-[floating=true]/header:block' : ''}`}>
        <button
          type="button"
          aria-label={portalLabel}
          aria-haspopup="true"
          title={portalLabel}
          className="grid size-10 place-items-center rounded-full text-white ring-1 ring-white/40 transition hover:bg-white/10 hover:ring-white/70  group-data-[floating=true]/header:bg-surface-muted group-data-[floating=true]/header:text-secondary group-data-[floating=true]/header:ring-1 group-data-[floating=true]/header:ring-line-soft group-data-[floating=true]/header:hover:bg-primary-soft"
        >
          <UserIcon className="size-5" />
        </button>
        <NavDropdown items={portalLinks} align="right" heading={portalLabel} />
      </div>
    </div>
  )
}
