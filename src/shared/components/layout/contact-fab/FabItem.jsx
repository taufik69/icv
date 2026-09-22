const SPRING = 'ease-[cubic-bezier(0.34,1.56,0.64,1)]'
const OPEN_STAGGER = 25
const CLOSE_STAGGER = 70

// One action bubble. Position / stagger are computed per item, so they go in `style`.
export function FabItem({ action, point, index, open }) {
  const { Icon, label, href, external } = action

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      aria-label={label}
      tabIndex={open ? 0 : -1}
      className={`group absolute top-1/2 left-1/2 -mt-6 -ml-6 grid size-12 place-items-center rounded-full bg-surface text-secondary shadow-elevated ring-1 ring-line-soft transition-[translate,opacity,scale,background-color,color] duration-500 hover:scale-110 hover:bg-primary hover:text-on-primary motion-reduce:transition-none ${SPRING} ${open ? 'opacity-100' : 'pointer-events-none scale-50 opacity-0'}`}
      style={{
        translate: open ? `${point.x}px ${point.y}px` : '0 0',
        transitionDelay: `${index * (open ? OPEN_STAGGER : CLOSE_STAGGER)}ms`,
      }}
    >
      <Icon className="size-5" />
      <span className="pointer-events-none absolute right-full mr-2 rounded-md bg-secondary px-2 py-1 font-heading text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-card transition group-hover:opacity-100 group-focus-visible:opacity-100">
        {label}
      </span>
    </a>
  )
}
