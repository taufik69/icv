// The wordmark is Engravers' Old English exported from Canva (public/images/icv-wordmark.svg), used as a
// mask over `bg-current` so it takes the text colour. Everything is sized in em, so set the size with a
// text-* class and the colour with text-white / text-secondary on className. Lockup: crest | hairline | two-line wordmark.
export function BrandLogo({ className = '', eager = false }) {
  return (
    <span className={`inline-flex items-center gap-[0.8em] ${className}`}>
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
      <span className="border-l border-current/30 py-[0.6em] pl-[0.8em]">
        <span
          role="img"
          aria-label="International College of Victoria"
          className="block aspect-420/94 h-[2.8em] bg-current [mask-image:url(/images/icv-wordmark.svg)] [mask-position:left_center] [mask-repeat:no-repeat] [mask-size:contain]"
        />
      </span>
    </span>
  )
}
