const widths = ['w-full', 'w-11/12', 'w-full', 'w-10/12', 'w-3/4', 'w-full', 'w-2/3']

// Paragraph placeholder: `count` text lines of slightly varying length.
export function LinesSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 gap-2.5">
      {Array.from({ length: count }, (_, i) => <span key={i} className={`skeleton h-3.5 rounded-md ${widths[i % widths.length]}`} />)}
    </div>
  )
}
