import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taxonomyApi } from '../api/taxonomyApi'
import { taxonomyKeys } from '../api/taxonomyQueries'

// Writes for one managed list. Each refreshes that list (and its course counts) on success.
export function useTaxonomyMutations(type) {
  const queryClient = useQueryClient()
  const refresh = () => queryClient.invalidateQueries({ queryKey: taxonomyKeys.list(type) })
  const opts = (mutationFn) => ({ mutationFn, onSuccess: refresh })

  return {
    create: useMutation(opts((body) => taxonomyApi.create(type, body))),
    update: useMutation(opts(({ id, ...body }) => taxonomyApi.update(type, id, body))),
    reorder: useMutation(opts((ids) => taxonomyApi.reorder(type, ids))),
    remove: useMutation(opts((id) => taxonomyApi.remove(type, id))),
  }
}
