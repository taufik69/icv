// Site-wide content width: max 1280px (7xl), 20 / 32px side gutters.
export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 md:px-8 ${className}`}>{children}</div>
}
