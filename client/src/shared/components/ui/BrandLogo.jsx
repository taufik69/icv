import { wordmarkGlyphs, wordmarkViewBox } from './wordmarkGlyphs'

// Crest + green rule + four-line blackletter wordmark (Engravers' Old English from the user's Canva file),
// drawn as inline SVG in currentColor so it stays crisp at any size. Everything is sized in em: set the size
// with a text-* class and the colour with text-white / text-secondary on className.
export function BrandLogo({ className = '', eager = false }) {
  return (
    <span className={`inline-flex items-center gap-[0.6em] ${className}`}>
      <img
        src="/images/icv-crest-112.webp"
        srcSet="/images/icv-crest-169.webp 1.5x"
        alt=""
        width="127"
        height="112"
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        className="h-[4.4em] w-auto shrink-0"
      />
      <span className="border-l-[0.2em] border-primary py-[0.15em] pl-[0.5em]">
        <svg role="img" aria-label="International College of Victoria" viewBox={wordmarkViewBox} fill="currentColor" className="block h-[4.4em] w-auto">
          {wordmarkGlyphs.map(([transform, d]) => (
            <path key={transform} transform={transform} d={d} />
          ))}
        </svg>
      </span>
    </span>
  )
}
