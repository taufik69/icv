import { ChevronRightIcon } from '@/shared/components/icons'
import { quickLinks } from '@/shared/config/footer'
import { AppLink } from '@/shared/components/ui'
import { FooterHeading } from './FooterHeading'

export function FooterLinks() {
  return (
    <nav aria-label="Footer">
      <FooterHeading>Quick links</FooterHeading>
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
        {quickLinks.map((l) => (
          <li key={l.label}>
            <AppLink to={l.to} href={l.href} className="group inline-flex items-start gap-1.5 text-sm text-white/70 transition hover:text-primary aria-[current=page]:text-primary">
              <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-primary transition group-hover:translate-x-0.5" />
              {l.label}
            </AppLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
