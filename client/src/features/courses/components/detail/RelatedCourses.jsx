import { FinderCard } from '../finder/FinderCard'

// Other courses in the same study area, as finder cards.
export function RelatedCourses({ courses, marketNames }) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {courses.map((c) => (
        <li key={c.id}>
          <FinderCard course={c} marketName={marketNames[c.market]} saved={false} onToggleSave={() => {}} />
        </li>
      ))}
    </ul>
  )
}
