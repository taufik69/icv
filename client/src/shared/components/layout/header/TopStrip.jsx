import { MailIcon, PhoneIcon } from '@/shared/components/icons'
import { Container } from '@/shared/components/ui'
import { contactCards, legal } from '@/shared/config/footer'
import { portalLinks } from '@/shared/config/navigation'

const [, phone, email] = contactCards
const link = 'inline-flex items-center gap-1.5 text-white/85 transition hover:text-white'

// lg+ utility row above the main bar: contact on the left, registration ids + portal logins on the right.
// Folds away (grid 1fr → 0fr) once the header turns into the floating bar.
export function TopStrip() {
  return (
    <div className="hidden grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-500 group-data-[floating=true]/header:grid-rows-[0fr] group-data-[floating=true]/header:opacity-0 lg:grid">
      <div className="overflow-hidden">
        <div className="border-b border-white/10">
          <Container className="flex h-9 items-center gap-6 text-[0.8125rem] text-white/85">
            <a href={phone.lines[0].href} className={link}>
              <PhoneIcon className="size-3.5" />
              {phone.lines[0].label}
            </a>
            <a href={email.lines[0].href} className={link}>
              <MailIcon className="size-3.5" />
              {email.lines[0].label}
            </a>
            <p className="ml-auto flex gap-4 tracking-wide text-white/85">
              {legal.ids.slice(1).map((id) => <span key={id}>{id}</span>)}
            </p>
            <span aria-hidden="true" className="h-3.5 w-px bg-white/20" />
            {portalLinks.map((p) => (
              <a key={p.label} href={p.href} className={link}>
                <p.Icon className="size-3.5" />
                {p.label}
              </a>
            ))}
          </Container>
        </div>
      </div>
    </div>
  )
}
