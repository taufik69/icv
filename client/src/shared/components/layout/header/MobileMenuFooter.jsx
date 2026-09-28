import { ArrowRightIcon, MailIcon, PhoneIcon } from '@/shared/components/icons'
import { applyLink } from '@/shared/config/navigation'

const round = 'grid size-13 shrink-0 place-items-center rounded-2xl bg-white/5 text-primary ring-1 ring-white/10 transition active:scale-95 hover:bg-white/10'

// Thumb-reach actions pinned to the drawer bottom: call, email, and the main Apply CTA.
export function MobileMenuFooter() {
  return (
    <div className="flex items-center gap-2.5 border-t border-white/10 bg-secondary-dark/60 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <a href="tel:0399421836" aria-label="Call us" className={round}>
        <PhoneIcon className="size-5" />
      </a>
      <a href="mailto:info@icv.edu.au" aria-label="Email us" className={round}>
        <MailIcon className="size-5" />
      </a>
      <a
        href={applyLink.href}
        className="group btn-shine flex h-13 flex-1 items-center justify-center gap-2 rounded-2xl bg-primary font-heading font-bold text-on-primary shadow-card transition active:scale-[0.98] hover:bg-primary-hover hover:text-on-primary"
      >
        {applyLink.label}
        <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
      </a>
    </div>
  )
}
