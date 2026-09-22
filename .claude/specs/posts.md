# Spec: Posts

## Goal
Show a list of posts fetched from the API (reference feature for the project's patterns).

## Data / API
| Method | Endpoint | Request | Response |
|---|---|---|---|
| GET | `/posts?_limit=10` | — | `{ id, title, body }[]` |
| GET | `/posts/:id` | — | `{ id, title, body }` |

## UI
- `/posts` → `PostsPage` → `PostList` → `PostCard` (card links to detail)
- `/posts/$postId` → `PostDetailPage`
- Loading/error via route `pendingComponent` / `errorComponent`

## Acceptance criteria
- [x] Posts render as cards
- [x] Loading and error states handled
- [x] Detail page at `/posts/$postId` (route loader prefetch)
- [x] Every file ≤100 lines
