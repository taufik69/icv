import { ArrowRightIcon, UserIcon } from '@/shared/components/icons'
import { applyLink, portalLabel, portalLinks } from '@/shared/config/navigation'
import { NavDropdown } from './NavDropdown'

// Apply Now + Portal (Student / Trainer login). Floating bar: same square green CTA and a round person button.
export function HeaderActions() {
  return (
    <div className="hidden items-center gap-2.5 md:flex">
      <a
        href={applyLink.href}
        className="group btn-shine inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 font-heading text-sm font-semibold whitespace-nowrap text-on-primary transition hover:bg-primary-hover hover:text-on-primary group-data-[floating=true]/header:shadow-card"
      >
        {applyLink.label}
        <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
      </a>
      <div className="group relative">
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
