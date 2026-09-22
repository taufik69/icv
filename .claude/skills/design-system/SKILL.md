---
name: design-system
description: ICV design tokens (colors, fonts, radius, shadows) as Tailwind v4 utilities. Use whenever styling UI — picking colors, typography, buttons, cards, shadows.
---

# ICV Design System

Tokens live in `src/styles/tokens/*.css` inside Tailwind `@theme` blocks, so each token is a utility.
Source scrape: `design/design-system.source.json` (icv.edu.au). **Never use raw hex, `gray-*`, `blue-*`, or arbitrary values like `bg-[#...]`** — add a token first if one is missing.

## Colors
| Role | Utilities | Value |
|---|---|---|
| Brand green | `bg-primary` `hover:bg-primary-hover` `bg-primary-soft` | #8cc542 |
| Text on green | `text-on-primary` (navy — white fails contrast) | #0a2449 |
| Brand navy | `bg-secondary` `bg-secondary-dark` `text-secondary` | #0a2449 / #06233e |
| Accents | `accent` (purple) `highlight` (orange) `coral` `sky` | |
| Text | `text-ink` `text-ink-strong` `text-ink-muted` `text-ink-subtle` | #212121 → #777 |
| Surfaces | `bg-surface` `bg-surface-muted` (#f4f8fa sections) `bg-surface-alt` | |
| Borders | `border-line` `border-line-soft` `border-line-strong` | |
| Links | `text-link` `hover:text-link-hover` | |
| Status | `success` / `danger` / `warning` / `info` + `-soft` (bg) + `-ink` (text) | |

Green is a fill color, never body text on white.

## Typography
- `font-sans` Open Sans — body (default on `html`).
- `font-heading` Montserrat — h1–h6 (auto, bold, navy via `base.css`), buttons, nav.
- `font-condensed` Roboto Condensed — labels/eyebrows.

## Radius
`rounded-xs` 2 · `sm` 4 · `md` 6 · `lg` 8 · `xl` 10 (cards) · `2xl` 20 · `3xl` 24 (hero panels) · `rounded-pill` 25 (buttons)

## Shadows
`shadow-raised` (subtle) · `shadow-card` (default card) · `shadow-soft` · `shadow-elevated` (hover) · `shadow-brand` (navy glow: nav, secondary button) · `shadow-focus` (focus ring, applied globally on `:focus-visible`)

## Spacing
Tailwind default 4px scale (`p-1`=4px … `p-5`=20px). Source values are 1–20px; odd px → nearest step.

## Components
Reuse `Button` (`variant`: primary | secondary | outline | ghost | danger, `size`: sm | md | lg) and `Card` from `@/shared/components/ui`.

## Adding a token
Edit the matching file in `src/styles/tokens/` (keep each ≤100 lines), add a row here.
