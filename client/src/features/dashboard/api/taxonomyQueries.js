import { queryOptions } from '@tanstack/react-query'
import { taxonomyApi } from './taxonomyApi'

export const taxonomyKeys = {
  all: ['taxonomies'],
  list: (type) => [...taxonomyKeys.all, type],
}

export const taxonomyQuery = (type) => queryOptions({ queryKey: taxonomyKeys.list(type), queryFn: () => taxonomyApi.list(type) })
