import { legal } from '@/shared/config/footer'

const [rto, cricos] = legal.ids.slice(1).map((id) => id.split(' '))

// Drawing-sheet title block along the card's foot: what this sheet is, then the college's registration ids.
export function TitleBlock() {
  const cells = [
    ['Sheet', 'Staff access'],
    [rto[0], rto[1]],
    [cricos[0], cricos[1]],
  ]
  return (
    <dl className="grid grid-cols-[1.4fr_1fr_1fr] divide-x divide-line border-t border-line text-left">
      {cells.map(([label, value]) => (
        <div key={label} className="px-4 py-3 sm:px-5">
          <dt className="text-xs text-ink-subtle">{label}</dt>
          <dd className="mt-0.5 font-heading text-sm font-semibold text-secondary">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
