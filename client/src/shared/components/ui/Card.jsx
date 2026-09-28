export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-line-soft bg-surface p-5 shadow-card ${className}`}>
      {children}
    </div>
  )
}
