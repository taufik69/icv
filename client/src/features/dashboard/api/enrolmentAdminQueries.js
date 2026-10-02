import { queryOptions } from '@tanstack/react-query'
import { enrolmentAdminApi } from './enrolmentAdminApi'
import { enrolmentAdminKeys } from './enrolmentAdminKeys'

// Shared by route loaders (ensureQueryData) and hooks.
export const enrolmentsQuery = (filters = {}) =>
  queryOptions({ queryKey: enrolmentAdminKeys.list(filters), queryFn: () => enrolmentAdminApi.list(filters) })

export const enrolmentCountsQuery = () =>
  queryOptions({ queryKey: enrolmentAdminKeys.counts(), queryFn: enrolmentAdminApi.counts })

export const enrolmentQuery = (id) =>
  queryOptions({ queryKey: enrolmentAdminKeys.detail(id), queryFn: () => enrolmentAdminApi.getById(id) })
