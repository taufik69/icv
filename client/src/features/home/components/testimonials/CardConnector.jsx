// Concave "bridge" drawn from a side card toward its neighbour (the connected look).
const PATHS = {
  lg: { box: '0 0 20 37.33', d: 'M0 0C0 0 1.24 13.58 10 13.58C18.76 13.58 20 0 20 0V37.33C20 37.33 18.76 23.76 10 23.76C1.24 23.76 0 37.33 0 37.33V0Z', w: 22, h: 42 },
  sm: { box: '0 0 16 28', d: 'M0 0C0 0 1 10.18 8 10.18C15 10.18 16 0 16 0V28C16 28 15 17.82 8 17.82C1 17.82 0 28 0 28V0Z', w: 18, h: 28 },
}
const SIZES = { lg: 'h-[42px] w-[22px]', sm: 'h-[28px] w-[18px]' }

export function CardConnector({ towards, size = 'lg' }) {
  const p = PATHS[size]
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 my-auto text-surface ${SIZES[size]} ${towards === 'right' ? 'left-[calc(100%-1px)]' : 'right-[calc(100%-1px)]'}`}
    >
      <svg viewBox={p.box} preserveAspectRatio="none" className="block size-full fill-current">
        <path d={p.d} />
      </svg>
    </span>
  )
}
