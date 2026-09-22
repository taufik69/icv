---
name: tanstack-query
description: Patterns for TanStack Query (v5) in this project — query keys, API modules, query/mutation hooks, cache invalidation. Use when fetching or mutating server data.
---

# TanStack Query

Layering per feature (never skip a layer):
`api/<feature>Keys.js` → `api/<feature>Api.js` → `api/<feature>Queries.js` → `hooks/use<X>.js` → component

Reads are prefetched by route loaders — see the `tanstack-router` skill.

## 1. Query keys factory
```js
export const todosKeys = {
  all: ['todos'],
  list: (filters) => [...todosKeys.all, 'list', filters],
  detail: (id) => [...todosKeys.all, 'detail', id],
}
```

## 2. API module — uses shared `apiClient`, no React
```js
import { apiClient } from '@/shared/lib/apiClient'
export const todosApi = {
  getAll: () => apiClient.get('/todos'),
  create: (data) => apiClient.post('/todos', data),
}
```

## 3. queryOptions factory — shared by route loaders and hooks
```js
import { queryOptions } from '@tanstack/react-query'
export const todosListQuery = (filters) =>
  queryOptions({ queryKey: todosKeys.list(filters), queryFn: () => todosApi.getAll(filters) })
```

## 4. Query hook — suspense, because the route loader already fetched
```js
export function useTodosList(filters) {
  return useSuspenseQuery(todosListQuery(filters))
}
```
Use plain `useQuery` only for data not loaded by a route (e.g. dependent/optional widgets).

## 5. Mutation hook — always invalidate related keys
```js
export function useCreateTodo() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: todosApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: todosKeys.all }),
  })
}
```

## Rules
- v5 API: use `isPending` (not `isLoading` for first load), object signature only.
- Global defaults live in `src/shared/lib/queryClient.js` — don't repeat them per hook.
- Route-loaded data: loading/error handled by route `pendingComponent`/`errorComponent`.
- Non-route `useQuery`: handle `isPending`/`error` with shared `Spinner`/`ErrorMessage`.
- One hook per file.
