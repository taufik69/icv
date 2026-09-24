// Mission / vision summary tile; icon rotates and border turns green on hover.
export function PillarCard({ pillar: { title, text, Icon } }) {
  return (
    <div className="group h-full rounded-2xl bg-surface p-5 shadow-raised ring-1 ring-line-soft transition duration-300 hover:-translate-y-0.5 hover:ring-primary">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary transition duration-300 group-hover:rotate-6">
          <Icon className="size-5" />
        </span>
        <h3 className="font-condensed text-lg font-bold uppercase">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{text}</p>
    </div>
  )
}
