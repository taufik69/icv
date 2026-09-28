const tones = {
  light: { box: 'bg-primary-soft ring-primary/30', title: 'text-secondary', chip: 'bg-surface text-secondary ring-line-soft' },
  navy: { box: 'bg-secondary ring-secondary', title: 'text-white', chip: 'bg-white/10 text-white ring-white/15' },
}

// Titled box of pill chips.
export function TagList({ title, items, tone = 'light' }) {
  const t = tones[tone]

  return (
    <div className={`h-full rounded-2xl p-5 ring-1 ${t.box}`}>
      <h3 className={`font-condensed text-sm font-bold tracking-[0.2em] uppercase ${t.title}`}>{title}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className={`rounded-pill px-3.5 py-1.5 text-sm font-medium ring-1 ${t.chip}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
