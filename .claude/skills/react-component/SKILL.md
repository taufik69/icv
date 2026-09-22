---
name: react-component
description: Create or refactor a React component following this project's modular rules (≤100 lines, one component per file, Tailwind styling). Use when adding or editing any .jsx component.
---

# React Component

## Rules
- One exported component per file, named export, PascalCase filename = component name.
- **Hard limit: 100 lines per file.** Near 80 lines → split into subcomponents or extract a hook.
- Styling: Tailwind utilities using ICV design tokens only (see `design-system` skill). No CSS files per component, no raw hex.
- No data fetching inside components — call a feature hook (`useX`) instead.
- Props in, JSX out. Business logic lives in hooks (`hooks/`) or pure helpers (`lib/`).

## Where it goes
| Kind | Location |
|---|---|
| Generic UI (Button, Card, Modal) | `src/shared/components/ui/` + export from its `index.js` |
| Feature-specific | `src/features/<feature>/components/` |
| Page/screen for a feature | `src/features/<feature>/components/<Feature>Page.jsx` |

## Template
```jsx
import { Card } from '@/shared/components/ui'

export function ThingCard({ thing }) {
  return (
    <Card>
      <h2 className="font-semibold">{thing.title}</h2>
    </Card>
  )
}
```

## Splitting a big component
1. Move repeated/list-item JSX into its own component.
2. Move state + effects into `use<Name>.js` hook.
3. Move pure transforms into `lib/` helpers.
4. Run `npm run check:lines`.
