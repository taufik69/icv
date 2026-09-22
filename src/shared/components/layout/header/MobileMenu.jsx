// Lazy-loaded (see SiteHeader) — only downloaded when the menu is first opened.
import { ChevronDownIcon, CloseIcon } from '@/shared/components/icons'
import { applyLink, mainNav, portalLinks } from '@/shared/config/navigation'

const row = 'flex items-center justify-between py-3 font-heading text-lg text-white'

function MobileGroup({ item }) {
  if (!item.children) {
    return (
      <a href={item.href} className={row}>
        {item.label}
      </a>
    )
  }
  return (
    <details className="group">
      <summary className={`${row} cursor-pointer list-none`}>
        {item.label}
        <ChevronDownIcon className="size-5 transition group-open:rotate-180" />
      </summary>
      <ul className="space-y-1 pb-3 pl-3">
        {item.children.map((child) => (
          <li key={child.href}>
            <a href={child.href} className="block py-1.5 text-sm text-white/75 hover:text-primary">
              {child.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default function MobileMenu({ onClose }) {
  return (
    <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 overflow-y-auto bg-secondary-dark px-6 py-5">
      <div className="flex justify-end">
        <button type="button" onClick={onClose} aria-label="Close menu" className="p-2 text-white">
          <CloseIcon className="size-7" />
        </button>
      </div>
      <nav aria-label="Mobile" className="mt-4 divide-y divide-white/10">
        {[...mainNav, { label: 'Portal', children: portalLinks }].map((item) => (
          <MobileGroup key={item.label} item={item} />
        ))}
      </nav>
      <a
        href={applyLink.href}
        className="btn-shine mt-8 block rounded-md bg-primary py-3 text-center font-heading font-semibold text-on-primary"
      >
        {applyLink.label}
      </a>
    </div>
  )
}
