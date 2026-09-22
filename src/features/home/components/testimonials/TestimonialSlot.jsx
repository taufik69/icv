import { CardConnector } from './CardConnector'
import { TestimonialContent } from './TestimonialContent'

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]'

// One positioned card. Geometry comes from carouselLayout (dynamic px values, so this is the
// one place that needs an inline style). The active content is laid out at full active size
// and centred, so text never reflows while a card grows or shrinks.
export function TestimonialSlot({ review, offset, box, activeSize, onSelect }) {
  const active = offset === 0
  const near = Math.abs(offset) === 1
  const far = Math.abs(offset) === 2
  const towards = offset < 0 ? 'right' : 'left'

  return (
    <div
      aria-hidden={!active}
      onClick={active ? undefined : () => onSelect(offset)}
      className={`absolute top-1/2 left-1/2 rounded-[28px] bg-surface shadow-elevated transition-[transform,width,height,opacity] duration-700 motion-reduce:transition-none ${EASE} ${active ? 'z-0' : 'z-10 cursor-pointer'} ${box.visible ? '' : 'pointer-events-none'}`}
      style={{ width: box.w, height: box.h, transform: `translate(${box.x}px, ${box.y}px)`, opacity: box.visible ? 1 : 0 }}
    >
      {near && box.visible && <CardConnector towards={towards} />}
      {far && box.visible && <CardConnector towards={towards} size="sm" />}

      <div className="relative size-full overflow-hidden rounded-[inherit]">
        <div className={`absolute inset-0 p-2 transition-opacity duration-300 ${active ? 'opacity-0' : 'opacity-100'}`}>
          <img src={review.image} alt="" loading="lazy" decoding="async" className="size-full rounded-[20px] object-cover" />
        </div>
        <div
          className={`absolute top-1/2 left-1/2 -translate-1/2 transition-opacity duration-500 ${active ? 'opacity-100 delay-200' : 'pointer-events-none opacity-0'}`}
          style={{ width: activeSize[0], height: activeSize[1] }}
        >
          <TestimonialContent review={review} />
        </div>
      </div>
    </div>
  )
}
