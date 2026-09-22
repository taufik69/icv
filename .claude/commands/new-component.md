---
description: Create a React component following project rules
argument-hint: <ComponentName> <shared|feature-name> [purpose]
---

Create component: $ARGUMENTS

Follow the `react-component` skill. If the second argument is `shared`, put it in
`src/shared/components/ui/` and export it from that folder's `index.js`; otherwise put it in
`src/features/<feature>/components/`. Max 100 lines. Tailwind only.
