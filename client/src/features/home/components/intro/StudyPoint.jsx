// On desktop the left column mirrors (icon on the inner side, text aligned toward the video).
export function StudyPoint({ point: { title, text, Icon }, side }) {
  const mirrored = side === 'left'

  return (
    <div className={`group flex gap-4 ${mirrored ? 'lg:flex-row-reverse lg:text-right' : ''}`}>
      <span className="relative grid size-13 shrink-0 place-items-center rounded-2xl bg-surface text-secondary shadow-card ring-1 ring-line-soft transition duration-300 group-hover:-rotate-6 group-hover:bg-primary">
        <Icon className="size-6" />
        <span className="absolute -top-1 -right-1 size-3 rounded-full bg-primary ring-2 ring-surface transition group-hover:bg-secondary" />
      </span>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <span
          aria-hidden="true"
          className={`mt-1.5 block h-0.5 w-8 rounded-full bg-primary transition-all duration-300 group-hover:w-16 ${mirrored ? 'lg:ml-auto' : ''}`}
        />
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{text}</p>
      </div>
    </div>
  )
}
