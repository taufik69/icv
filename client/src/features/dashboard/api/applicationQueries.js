import { queryOptions } from '@tanstack/react-query'
import { applicationApi } from './applicationApi'
import { applicationKeys } from './applicationKeys'

// Shared by route loaders (ensureQueryData) and hooks.
export const applicationsQuery = (filters = {}) =>
  queryOptions({ queryKey: applicationKeys.list(filters), queryFn: () => applicationApi.list(filters) })

export const applicationCountsQuery = () =>
  queryOptions({ queryKey: applicationKeys.counts(), queryFn: applicationApi.counts })

export const applicationQuery = (id) =>
  queryOptions({ queryKey: applicationKeys.detail(id), queryFn: () => applicationApi.getById(id) })
