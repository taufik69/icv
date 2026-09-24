// Lazy-loaded (see RootLayout) — only downloaded when the menu is first opened.
import { useEffect, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { CloseIcon, UserIcon } from '@/shared/components/icons'
import { mainNav, portalLabel, portalLinks } from '@/shared/config/navigation'
import { MobileMenuFooter } from './MobileMenuFooter'
import { MobileNavGroup } from './MobileNavGroup'

const items = [...mainNav, { label: portalLabel, Icon: UserIcon, children: portalLinks }]
const isActive = (item, path) => item.to === path || (!item.passive && !!item.children?.some((c) => !c.hash && c.to === path))

// Full-height navy sheet (full width on phones, 28rem max): logo + close, accordion groups with icons
// (current section's group open and its tile green), Portal last, call / email / Apply pinned at the bottom.
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
      <div role="dialog" aria-modal="true" aria-label="Menu" className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-secondary shadow-elevated motion-safe:animate-[slide-in-right_300ms_ease-out] sm:rounded-l-3xl">
        <div className="flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
          <img src="/images/icv-logo-white.webp" alt="International College of Victoria" width="240" height="110" className="h-12 w-auto" />
          <button type="button" onClick={onClose} aria-label="Close menu" className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition active:scale-95 hover:rotate-90 hover:bg-white/20">
            <CloseIcon className="size-5" />
          </button>
        </div>

        <p className="px-6 pt-2 pb-2 font-condensed text-xs font-bold tracking-[0.25em] text-white/40 uppercase">Menu</p>
        <nav aria-label="Mobile" className="flex-1 space-y-1.5 overflow-y-auto overscroll-contain px-3 pb-6">
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

        <MobileMenuFooter />
      </div>
    </div>
  )
}
