import { queryOptions } from '@tanstack/react-query'
import { enrolmentCoursesApi } from './enrolmentCoursesApi'
import { enrolmentCoursesKeys } from './enrolmentCoursesKeys'

export const enrolmentCoursesQuery = () => queryOptions({ queryKey: enrolmentCoursesKeys.all, queryFn: enrolmentCoursesApi.list })
