// Form field placeholder: label line + control. `rows` > 1 makes it textarea-tall.
export function FieldSkeleton({ rows = 1, label = 'w-24' }) {
  const height = rows > 1 ? (rows > 4 ? 'h-36' : 'h-24') : 'h-11'
  return (
    <div className="grid gap-2">
      <span className={`skeleton h-3.5 rounded-md ${label}`} />
      <span className={`skeleton rounded-xl ${height}`} />
    </div>
  )
}
