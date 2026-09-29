const lines = ['International', 'College', 'of', 'Victoria']

// Crest + green rule + blackletter wordmark. Everything is sized in em, so set the size with a
// text-* class and the colour with text-white / text-secondary on className.
export function BrandLogo({ className = '', eager = false }) {
  return (
    <span className={`inline-flex items-center gap-[0.6em] ${className}`}>
      <img
        src="/images/icv-crest-112.webp"
        srcSet="/images/icv-crest-224.webp 2x"
        alt=""
        width="116"
        height="112"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        className="h-[4.4em] w-auto shrink-0"
      />
      <span className="border-l-[0.2em] border-primary py-[0.1em] pl-[0.45em] font-logo leading-[1.05] font-normal whitespace-nowrap">
        {lines.map((line) => <span key={line} className="block">{line}</span>)}
      </span>
    </span>
  )
}
