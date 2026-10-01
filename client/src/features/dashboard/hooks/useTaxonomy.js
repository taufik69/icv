import { useQuery } from '@tanstack/react-query'
import { taxonomyQuery } from '../api/taxonomyQueries'
import { taxonomyIcons } from '../data/taxonomyIcons'

// One managed list (study areas or levels), in staff order. Empty while loading.
export function useTaxonomy(type) {
  const { data, isPending } = useQuery(taxonomyQuery(type))
  return { items: data ?? [], loading: isPending }
}

// Dropdown options for the course form: value = the key courses store, with the item's icon.
export function useTaxonomyOptions(type) {
  return useTaxonomy(type).items.map((i) => ({ value: i.key, label: i.label, Icon: taxonomyIcons[i.icon] }))
}

// key → label, for showing a course's study area or level. Falls back to the key itself.
export function useTaxonomyLabel(type) {
  const { items } = useTaxonomy(type)
  return (key) => items.find((i) => i.key === key)?.label ?? key
}
