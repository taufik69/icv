import { UserIcon } from '@/shared/components/icons'
import { applyLink, portalLinks } from '@/shared/config/navigation'
import { NavDropdown } from './NavDropdown'

export function HeaderActions() {
  return (
    <div className="hidden items-center gap-2 md:flex">
      <a
        href={applyLink.href}
        className="btn-shine rounded-md bg-primary px-6 py-2.5 font-heading text-sm font-semibold text-on-primary transition hover:bg-primary-hover hover:text-on-primary"
      >
        {applyLink.label}
      </a>
      <div className="group relative">
        <button
          type="button"
          aria-label="Portal login"
          aria-haspopup="true"
          className="grid size-10 place-items-center rounded-md bg-ink-strong/35 text-white backdrop-blur-md transition hover:bg-ink-strong/55 group-data-[floating=true]/header:bg-white/15 group-data-[floating=true]/header:hover:bg-white/25"
        >
          <UserIcon className="size-4" />
        </button>
        <NavDropdown items={portalLinks} align="right" />
      </div>
    </div>
  )
}
