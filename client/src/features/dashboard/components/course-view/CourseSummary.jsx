// Hero photo with the facts staff check first: code, market, category, page address, status.
export function CourseSummary({ course }) {
  const { images, code, market, category, slug, tagline } = course
  const facts = [
    ['Course code', code],
    ['Market', market === 'domestic' ? 'Domestic' : 'International'],
    ['Category', category ?? 'Not set'],
    ['Page address', `/${market}/${slug}`],
  ]

  return (
    <section aria-label="Course summary" className="overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
      {images?.hero && (
        <img src={images.hero.src} srcSet={images.hero.srcSet} sizes="(min-width: 1024px) 70vw, 100vw" alt={images.hero.alt} className="aspect-[21/8] w-full object-cover" />
      )}
      <div className="p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 rounded-pill bg-success-soft px-3 py-1 text-sm font-semibold text-success-ink">
            <span className="size-2 rounded-full bg-success" /> Published
          </span>
          {tagline && <p className="text-ink-muted">{tagline}</p>}
        </div>
        <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
          {facts.map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="text-sm text-ink-subtle">{label}</dt>
              <dd className="mt-0.5 truncate font-heading font-semibold text-secondary">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
