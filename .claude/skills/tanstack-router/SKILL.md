---
name: tanstack-router
description: File-based routing with TanStack Router in this project — adding routes, params, loaders that prefetch TanStack Query data, links, layouts. Use when adding a page/URL or navigation.
---

# TanStack Router (file-based)

Routes live in `src/routes/`. The Vite plugin regenerates `src/routeTree.gen.js` on save —
**never edit it**. Route files are thin: they wire a URL to a feature page and prefetch data.

## File → URL
| File | URL |
|---|---|
| `routes/__root.jsx` | layout for every page (`RootLayout`, `NotFound`) |
| `routes/index.jsx` | `/` |
| `routes/posts/index.jsx` | `/posts` |
| `routes/posts/$postId.jsx` | `/posts/:postId` |
| `routes/_auth.jsx` + `routes/_auth/*.jsx` | pathless layout (e.g. guarded area) |

## Route template (list)
```jsx
import { createFileRoute } from '@tanstack/react-router'
import { todosListQuery, TodosPage } from '@/features/todos'
import { ErrorMessage, Spinner } from '@/shared/components/ui'

export const Route = createFileRoute('/todos/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(todosListQuery()),
  pendingComponent: Spinner,
  errorComponent: ErrorMessage,
  component: TodosPage,
})
```

## Params
Read with `Route.useParams()` in a small wrapper inside the route file, pass as props to the feature page.
Search params: add `validateSearch` and read with `Route.useSearch()`.

## Data: Router + Query together
- Feature exports `queryOptions` factories from `api/<name>Queries.js`.
- Loader calls `queryClient.ensureQueryData(opts)` (queryClient comes from router context in `src/app/router.js`).
- Page hook calls `useSuspenseQuery(opts)` — data is guaranteed, no loading checks in components.
- Loading/error UI is the route's `pendingComponent` / `errorComponent`.
- Mutations invalidate query keys; optionally `router.invalidate()` to rerun loaders.

## Navigation
- `<Link to="/posts/$postId" params={{ postId }}>` — never `<a href>` for internal links.
- Programmatic: `const navigate = useNavigate(); navigate({ to: '/posts' })`.
- Active styling: `[&.active]:` Tailwind variant.

## Rules
- Route files ≤100 lines, usually <25. No business logic or JSX-heavy UI — that lives in `src/features/`.
- Add the nav link in `src/shared/components/layout/NavBar.jsx` if the page is top-level.
