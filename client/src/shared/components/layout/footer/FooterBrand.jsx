import { BrandLogo } from '@/shared/components/ui'
import { legal, socialLinks } from '@/shared/config/footer'

export function FooterBrand() {
  return (
    <div>
      <BrandLogo className="text-[0.875rem] text-white" />
      <p className="mt-6 text-sm leading-relaxed text-white/60">{legal.acknowledgement}</p>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{legal.welcome}</p>
      <ul className="mt-6 flex gap-2">
        {socialLinks.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-primary hover:text-on-primary"
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
