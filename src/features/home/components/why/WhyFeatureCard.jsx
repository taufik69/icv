// Numbered feature card; fills navy on hover with the green icon circle kept from icv.edu.au.
export function WhyFeatureCard({ feature: { title, text, Icon }, index }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-line-soft bg-surface p-6 shadow-raised transition duration-500 hover:-translate-y-1 hover:border-secondary hover:bg-secondary hover:shadow-brand md:p-7">
      <span
        aria-hidden="true"
        className="absolute top-4 right-5 font-heading text-5xl font-extrabold text-surface-sunken transition duration-500 group-hover:text-white/10"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="relative grid size-16 place-items-center rounded-full bg-primary text-white shadow-card transition duration-500 group-hover:scale-110 group-hover:rotate-6">
        <Icon className="size-7" />
      </span>
      <h3 className="relative mt-6 font-condensed text-lg font-bold uppercase transition-colors duration-500 group-hover:text-white">
        {title}
      </h3>
      <span
        aria-hidden="true"
        className="mt-2 block h-0.5 w-8 bg-primary transition-all duration-500 group-hover:w-16"
      />
      <p className="relative mt-3 text-sm leading-relaxed text-ink-muted transition-colors duration-500 group-hover:text-white/75">
        {text}
      </p>
    </div>
  )
}
