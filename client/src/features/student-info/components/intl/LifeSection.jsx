import { lifeSection as content } from '@/features/student-info/data/intlContent'
import { DocSection } from '../common/DocSection'

// "Lalor" is bold on icv.edu.au; keep that emphasis.
const withBold = (text, word) => {
  const [a, b] = text.split(word)
  return b === undefined ? text : (<>{a}<strong className="text-secondary">{word}</strong>{b}</>)
}

// Copy beside a two-photo stack (sticky on xl); photos zoom on hover, the published caption sits on its photo.
export function LifeSection() {
  return (
    <DocSection section={content}>
      <div className="mt-6 grid gap-8 xl:grid-cols-[3fr_2fr]">
        <div className="space-y-4 leading-relaxed text-ink-muted">
          {content.paragraphs.map((text) => (
            <p key={text.slice(0, 24)}>{withBold(text, 'Lalor')}</p>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 self-start xl:sticky xl:top-28 xl:grid-cols-1">
          {content.images.map(({ caption, ...img }) => (
            <figure key={img.src} className="group relative overflow-hidden rounded-2xl shadow-card">
              <img {...img} loading="lazy" decoding="async" className="aspect-4/5 w-full object-cover transition duration-1000 group-hover:scale-105 xl:aspect-3/2" />
              {caption && (
                <figcaption className="absolute inset-x-3 bottom-3 rounded-xl bg-secondary/80 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
                  {caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </DocSection>
  )
}
