// Navy pull-quote card for the Ella Fitzgerald line.
export function CeoQuote({ quote }) {
  return (
    <figure className="my-10">
      <p className="mb-4 text-lg leading-relaxed text-ink-muted">{quote.lead}</p>
      <div className="relative overflow-hidden rounded-2xl bg-secondary p-7 shadow-brand md:p-9">
        <span aria-hidden="true" className="absolute -top-6 right-4 font-heading text-9xl leading-none font-extrabold text-white/5">
          &rdquo;
        </span>
        <span aria-hidden="true" className="block font-heading text-6xl leading-none font-extrabold text-primary">
          &ldquo;
        </span>
        <blockquote className="relative -mt-3 font-heading text-2xl leading-snug font-bold text-white md:text-3xl">
          {quote.text}
        </blockquote>
        <figcaption className="mt-5 inline-flex items-center gap-3 font-condensed text-sm tracking-[0.2em] text-white/70 uppercase">
          <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
          {quote.author}
        </figcaption>
      </div>
    </figure>
  )
}
