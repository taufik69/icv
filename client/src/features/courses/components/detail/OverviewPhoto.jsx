// Wide rounded course photo that opens the Overview section (lazy: it sits below the hero).
export function OverviewPhoto({ image }) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes="(min-width: 1024px) 800px, 100vw"
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      className="mb-6 aspect-video w-full rounded-2xl object-cover shadow-card md:aspect-[5/2]"
    />
  )
}
