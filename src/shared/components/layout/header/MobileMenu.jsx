// Lazy-loaded (see RootLayout) — only downloaded when the menu is first opened.
import { useEffect, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { ArrowRightIcon, CloseIcon, MailIcon, PhoneIcon, UserIcon } from '@/shared/components/icons'
import { applyLink, mainNav, portalLabel, portalLinks } from '@/shared/config/navigation'
import { MobileNavGroup } from './MobileNavGroup'

const items = [...mainNav, { label: portalLabel, Icon: UserIcon, children: portalLinks }]
const isActive = (item, path) => item.to === path || !!item.children?.some((c) => c.to === path)
const pill = 'flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-white transition hover:bg-white/15 hover:text-primary'

// Navy drawer: desktop nav icons, Portal as the last group, current section highlighted with its group open.
export default function MobileMenu({ onClose }) {
  const path = useRouterState({ select: (s) => s.location.pathname })
  const [open, setOpen] = useState(() => items.find((i) => i.children && isActive(i, path))?.label ?? null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="Close menu" onClick={onClose} className="absolute inset-0 bg-secondary-dark/60 backdrop-blur-sm motion-safe:animate-[fade-in_200ms_ease-out]" />
      <div role="dialog" aria-modal="true" aria-label="Menu" className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-secondary shadow-elevated motion-safe:animate-[slide-in-right_300ms_ease-out]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <img src="/images/icv-logo-white.webp" alt="International College of Victoria" width="240" height="110" className="h-11 w-auto" />
          <button type="button" onClick={onClose} aria-label="Close menu" className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
            <CloseIcon className="size-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {items.map((item) => (
            <MobileNavGroup
              key={item.label}
              item={item}
              active={isActive(item, path)}
              open={open === item.label}
              onToggle={() => setOpen((cur) => (cur === item.label ? null : item.label))}
              onNavigate={onClose}
            />
          ))}
        </nav>

        <div className="space-y-3 border-t border-white/10 px-5 py-5">
          <div className="flex gap-2 text-sm">
            <a href="tel:0399421836" className={pill}>
              <PhoneIcon className="size-4 text-primary" /> Call us
            </a>
            <a href="mailto:info@icv.edu.au" className={pill}>
              <MailIcon className="size-4 text-primary" /> Email
            </a>
          </div>
          <a href={applyLink.href} className="group btn-shine flex items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 font-heading font-semibold text-on-primary shadow-card hover:bg-primary-hover hover:text-on-primary">
            {applyLink.label}
            <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  )
}
