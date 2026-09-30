import { FilterGroup } from './FilterGroup'
import { StudentTypeFilter } from './StudentTypeFilter'

// Every filter; used by the desktop sidebar and the mobile filter sheet.
export function FilterPanel({ content, finder }) {
  return (
    <div>
      <StudentTypeFilter content={content} finder={finder} />
      {content.facets.map(({ key, label, variant }) => (
        <FilterGroup
          key={key}
          label={label}
          variant={variant}
          options={finder.facets[key]}
          selected={finder.filters[key]}
          onToggle={(value) => finder.toggle(key, value)}
        />
      ))}
    </div>
  )
}
