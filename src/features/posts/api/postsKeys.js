export const postsKeys = {
  all: ['posts'],
  list: () => [...postsKeys.all, 'list'],
  detail: (id) => [...postsKeys.all, 'detail', id],
}
