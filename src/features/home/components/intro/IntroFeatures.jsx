import { Reveal } from '@/shared/components/ui'

// Six reasons in one panel with hairline dividers (gap-px over a line-coloured background).
// Phones: compact 2-column tiles (icon above text); sm: 2 columns, icon beside text; lg: 3 columns.
export function IntroFeatures({ points }) {
  return (
    <Reveal className="mt-16 md:mt-24">
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line-soft shadow-card ring-1 ring-line-soft lg:grid-cols-3">
        {points.map(({ title, text, Icon }) => (
          <li key={title} className="group flex flex-col gap-3 bg-surface p-4 transition duration-300 hover:bg-surface-muted sm:flex-row sm:gap-4 sm:p-6 lg:p-8">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl sm:size-12 bg-primary-soft text-secondary transition duration-300 group-hover:-rotate-6 group-hover:bg-primary group-hover:text-on-primary">
              <Icon className="size-5 sm:size-6" />
            </span>
            <div className="min-w-0">
              <h3 className="text-base leading-snug font-semibold sm:text-lg">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted sm:mt-1.5 sm:text-sm">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
