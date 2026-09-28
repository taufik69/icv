import { ArrowRightIcon } from '@/shared/components/icons'

const arrow =
  'grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-primary hover:text-on-primary'
const pause =
  'group-hover/carousel:[animation-play-state:paused] group-has-focus-visible/carousel:[animation-play-state:paused]'

// Dots double as the autoplay timer: the active dot's fill animation ends → next slide.
export function CarouselControls({ reviews, active, page, paused, onPrev, onNext, onSelect }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-5">
      <button type="button" onClick={onPrev} aria-label="Previous review" className={arrow}>
        <ArrowRightIcon className="size-5 rotate-180" />
      </button>
      <div role="tablist" aria-label="Reviews" className="flex items-center gap-1.5">
        {reviews.map((r, i) => (
          <button
            key={r.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Review ${i + 1}: ${r.name}`}
            onClick={() => onSelect(i)}
            className={`h-2 overflow-hidden rounded-full transition-[width,background-color] duration-300 ${i === active ? 'w-16 bg-white/25' : 'w-2 bg-white/40 hover:bg-white/70'}`}
          >
            {i === active && (
              <span
                key={page}
                onAnimationEnd={onNext}
                className={`block h-full origin-left rounded-full bg-primary animate-progress-fill [--progress-duration:7s] motion-reduce:animate-none ${paused ? '[animation-play-state:paused]' : ''} ${pause}`}
              />
            )}
          </button>
        ))}
      </div>
      <button type="button" onClick={onNext} aria-label="Next review" className={arrow}>
        <ArrowRightIcon className="size-5" />
      </button>
    </div>
  )
}
