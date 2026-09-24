// Photo card with the college motto set large over a navy gradient.
export function MottoCard({ motto }) {
  return (
    <figure className="relative isolate flex h-full min-h-80 flex-col justify-end overflow-hidden rounded-3xl bg-secondary p-7 shadow-brand md:p-9">
      <img
        src={motto.image.src}
        alt={motto.image.alt}
        width="290"
        height="370"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-secondary-dark via-secondary/80 to-secondary/30" />
      <span aria-hidden="true" className="font-heading text-8xl leading-none font-extrabold text-primary">
        &ldquo;
      </span>
      <blockquote className="-mt-6 font-heading text-3xl leading-tight font-bold text-white md:text-4xl">
        {motto.quote}
      </blockquote>
      <figcaption className="mt-6 inline-flex items-center gap-3 font-condensed text-sm tracking-[0.2em] text-white/70 uppercase">
        <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
        {motto.caption}
      </figcaption>
    </figure>
  )
}
