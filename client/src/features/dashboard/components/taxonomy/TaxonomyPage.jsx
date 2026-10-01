import { taxonomyPages } from '../../data/taxonomyPages'
import { useTaxonomy } from '../../hooks/useTaxonomy'
import { useTaxonomyMutations } from '../../hooks/useTaxonomyMutations'
import { PageHeader } from '../shell/PageHeader'
import { AddTaxonomyForm } from './AddTaxonomyForm'
import { TaxonomyRow } from './TaxonomyRow'

// Manage one course classification list (Study areas or Levels): add, rename, reorder, delete.
// The order here is the order used in course form dropdowns.
export function TaxonomyPage({ type }) {
  const page = taxonomyPages[type]
  const { items, loading } = useTaxonomy(type)
  const mutations = useTaxonomyMutations(type)

  const move = (index, step) => {
    const ids = items.map((i) => i.id)
    ;[ids[index], ids[index + step]] = [ids[index + step], ids[index]]
    mutations.reorder.mutate(ids)
  }

  return (
    <>
      <PageHeader title={page.title} crumbs={{ current: page.title }} description={page.description} />
      <section aria-label={page.title} className="mt-8 overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
        <AddTaxonomyForm page={page} mutation={mutations.create} />
        {loading ? (
          <ul aria-hidden="true" className="divide-y divide-line-soft">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="flex items-center gap-3 px-5 py-4 sm:px-7">
                <span className="grid flex-1 gap-2"><span className="skeleton h-4 w-48 rounded-md" /><span className="skeleton h-3 w-20 rounded-md" /></span>
              </li>
            ))}
          </ul>
        ) : items.length ? (
          <ul className={`divide-y divide-line-soft transition-opacity ${mutations.reorder.isPending ? 'opacity-60' : ''}`}>
            {items.map((item, i) => (
              <TaxonomyRow key={`${item.id}-${item.label}`} item={item} first={i === 0} last={i === items.length - 1} onMove={(step) => move(i, step)} mutations={mutations} />
            ))}
          </ul>
        ) : (
          <p className="px-5 py-12 text-center text-ink-muted">No {page.noun}s yet. Add the first one above.</p>
        )}
      </section>
    </>
  )
}
