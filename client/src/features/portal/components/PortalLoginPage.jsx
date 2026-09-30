import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@/shared/components/icons'
import { BrandLogo } from '@/shared/components/ui'
import { portalHelp, portalRoles } from '../data/portalContent'
import { PortalAside } from './PortalAside'
import { PortalLoginForm } from './PortalLoginForm'
import { RoleSwitch } from './RoleSwitch'

// Student / Trainer portal sign-in (standalone page, no site header). lg+: photo panel | form column.
// `role` comes from ?role= and `onRoleChange` writes it back, so a Trainer Login link can open that tab.
export function PortalLoginPage({ role, onRoleChange }) {
  const r = portalRoles[role]
  return (
    <div className="grid min-h-svh bg-surface-muted lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <PortalAside />
      <main className="flex flex-col px-5 py-6 sm:px-8">
        <Link to="/" className="group inline-flex items-center gap-2 self-start text-sm font-medium text-secondary hover:text-secondary">
          <ArrowRightIcon className="size-4 rotate-180 transition group-hover:-translate-x-0.5" />
          Back to website
        </Link>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">
            <BrandLogo eager className="mb-8 text-[0.6875rem] text-secondary lg:hidden" />
            <p className="font-heading text-sm font-semibold text-ink-subtle">ICV Portal</p>
            <h1 className="mt-1 text-3xl md:text-4xl">{r.title}</h1>
            <p className="mt-2 text-left text-ink-muted">{r.lead}</p>
            <div className="mt-7">
              <RoleSwitch role={role} onChange={onRoleChange} />
            </div>
            <PortalLoginForm key={role} role={role} />
            <p className="mt-8 text-center text-sm text-ink-muted">
              <a href={portalHelp.href} className="font-semibold text-secondary hover:text-secondary hover:underline">{portalHelp.label}</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
