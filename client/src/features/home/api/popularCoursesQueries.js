import { queryOptions } from '@tanstack/react-query'
import { popularCoursesApi } from './popularCoursesApi'

export const popularCoursesKeys = { all: ['popular-courses'] }

export const popularCoursesQuery = () => queryOptions({ queryKey: popularCoursesKeys.all, queryFn: popularCoursesApi.list })
