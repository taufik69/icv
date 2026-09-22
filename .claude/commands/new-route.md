---
description: Add a TanStack Router route (file-based) wired to a feature page
argument-hint: <url-path e.g. /todos or /todos/$todoId> <feature-name>
---

Add route: $ARGUMENTS

Follow the `tanstack-router` skill. Create the file under `src/routes/`, prefetch data in the
`loader` with `ensureQueryData`, render the feature page. Add a NavBar link if it is top-level.
Then run `npm run build` (regenerates the route tree) and `npm run check:lines`.
