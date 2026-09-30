import { PlusCard } from '@/shared/components/ui'
import { contactCards } from '@/shared/config/footer'

// Contact row at the top of the footer as blueprint bento cards (dashed outline, corner pluses):
// icon tile, small label, then each line as a link.
export function ContactStrip() {
  return (
    <ul className="grid gap-6 border-b border-white/10 pb-12 md:grid-cols-3">
      {contactCards.map(({ title, Icon, lines }) => (
        <PlusCard as="li" key={title} className="flex min-h-40 flex-col justify-between gap-6">
          <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-white transition group-hover/plus:bg-white group-hover/plus:text-secondary">
            <Icon className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="font-condensed text-xs tracking-[0.2em] text-white/75 uppercase">{title}</p>
            {lines.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="mt-1 block font-heading text-lg font-semibold break-words text-white underline-offset-4 transition hover:text-white hover:underline"
              >
                {l.label}
              </a>
            ))}
          </div>
        </PlusCard>
      ))}
    </ul>
  )
}
