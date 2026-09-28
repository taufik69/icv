// White card holding the official AQF / NRT logos (they're artwork on white) + ID tiles.
export function RecognitionCard({ recognition }) {
  return (
    <div className="relative rounded-3xl bg-surface p-6 shadow-card ring-1 ring-line-soft md:p-10">
      <span aria-hidden="true" className="absolute -top-3 -right-3 -z-10 size-full rounded-3xl bg-primary-soft" />
      <p className="font-condensed text-sm tracking-[0.2em] text-primary-hover uppercase">Accredited</p>
      <h3 className="mt-2 text-2xl leading-snug">{recognition.title}</h3>
      <img
        src={recognition.image}
        alt={recognition.alt}
        width="600"
        height="160"
        loading="lazy"
        decoding="async"
        className="mt-8 h-auto w-full"
      />
      <div className="mt-8 grid grid-cols-2 gap-3">
        {recognition.ids.map((id) => (
          <div key={id.label} className="rounded-2xl bg-surface-muted px-4 py-3">
            <p className="font-condensed text-xs tracking-widest text-ink-subtle uppercase">{id.label}</p>
            <p className="font-heading text-xl font-bold text-secondary">{id.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
