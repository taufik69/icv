// A big radio choice: icon tile, title and an optional line. `size="sm"` is the compact tile used for
// study areas. The real radio input is visually hidden, so keyboard and screen readers work as usual.
export function ChoiceCard({ name, value, checked, onChange, Icon, title, text, size = 'lg' }) {
  const small = size === 'sm'
  return (
    <label className={`group flex cursor-pointer flex-col gap-3 rounded-2xl bg-surface ring-1 ring-line transition hover:ring-line-strong has-checked:bg-surface-muted has-checked:ring-2 has-checked:ring-secondary has-focus-visible:ring-2 has-focus-visible:ring-secondary ${small ? 'p-4' : 'p-5 sm:p-6'}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span aria-hidden="true" className={`grid place-items-center rounded-xl bg-secondary/8 text-secondary transition group-has-checked:bg-secondary group-has-checked:text-white ${small ? 'size-9' : 'size-12'}`}>
        <Icon className={small ? 'size-4.5' : 'size-5.5'} />
      </span>
      <span>
        <span className={`block font-heading font-semibold text-ink-strong ${small ? 'text-sm leading-snug' : 'text-lg'}`}>{title}</span>
        {text && <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{text}</span>}
      </span>
    </label>
  )
}
