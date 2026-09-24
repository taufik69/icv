// Shared photo card: soft green block offset behind (bottom-right), faint green dot grid peeking out
// top-left, rounded photo that zooms slowly on hover. `overlay` renders on top of the photo (e.g. a name plate).
// Pass the <img> as `image` props; `aspect` sets the photo box ratio.
export function PhotoFrame({ image, aspect = 'aspect-3/2', imgClassName = '', overlay, className = '' }) {
  return (
    <div className={`group relative mr-4 mb-4 sm:mr-6 sm:mb-6 ${className}`}>
      <span
        aria-hidden="true"
        className="absolute -top-5 -left-5 size-28 rounded-2xl bg-[radial-gradient(var(--color-primary)_1.5px,transparent_1.5px)] bg-size-[12px_12px] opacity-40"
      />
      <span aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-primary-soft sm:translate-x-6 sm:translate-y-6" />
      <div className={`relative overflow-hidden rounded-3xl bg-surface-sunken shadow-card ${aspect}`}>
        <img
          loading="lazy"
          decoding="async"
          {...image}
          className={`absolute inset-0 size-full object-cover transition duration-1000 ease-out group-hover:scale-105 ${imgClassName}`}
        />
        {overlay}
      </div>
    </div>
  )
}
