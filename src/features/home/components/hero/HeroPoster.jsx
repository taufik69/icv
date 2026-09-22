// Static first frame — the LCP element. Preloaded in index.html so it paints before JS.
export function HeroPoster({ poster }) {
  return (
    <img
      src={poster.large}
      srcSet={`${poster.small} 640w, ${poster.large} 1280w`}
      sizes="100vw"
      alt=""
      fetchPriority="high"
      decoding="sync"
      className="absolute inset-0 size-full object-cover"
    />
  )
}
