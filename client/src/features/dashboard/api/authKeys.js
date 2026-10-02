// Query key for the signed-in staff member. Sign in / out reset it.
export const authKeys = {
  all: ['auth'],
  me: () => [...authKeys.all, 'me'],
}
