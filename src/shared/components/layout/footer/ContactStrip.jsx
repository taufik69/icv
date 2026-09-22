import { contactCards } from '@/shared/config/footer'

// Minimal contact row at the top of the footer: outline icon, small label, value.
export function ContactStrip() {
  return (
    <ul className="grid gap-8 border-b border-white/10 pb-12 md:grid-cols-3 md:gap-10">
      {contactCards.map(({ title, Icon, lines }) => (
        <li key={title} className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full text-primary ring-1 ring-white/20">
            <Icon className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-condensed text-xs tracking-[0.2em] text-white/50 uppercase">{title}</p>
            {lines.map((l) => (
              <a key={l.href} href={l.href} className="mt-1 block text-white transition hover:text-primary">
                {l.label}
              </a>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
