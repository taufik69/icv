import { CheckCircleIcon } from '@/shared/components/icons'

// One sub-clause: bold label, optional text, optional points.
// String points render as a check list; { label, text } points render as small tinted cards.
export function DocItem({ item }) {
  return (
    <div className="rounded-2xl bg-surface-muted/60 p-4 ring-1 ring-line-soft md:p-6">
      {item.label && <h3 className="text-lg leading-snug">{item.label}</h3>}
      {item.text && <p className={`leading-relaxed text-ink-muted ${item.label ? 'mt-2' : ''}`}>{item.text}</p>}
      {item.points && (
        <ul className="mt-4 grid gap-3">
          {item.points.map((p) =>
            typeof p === 'string' ? (
              <li key={p} className="flex items-start gap-3 leading-relaxed text-ink">
                <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-primary-hover" />
                {p}
              </li>
            ) : (
              <li key={p.label} className="rounded-xl border-l-4 border-primary bg-surface px-4 py-3 shadow-raised">
                <p className="font-heading font-semibold text-secondary">{p.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{p.text}</p>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  )
}
