// Module resolve hook: lets Node import the client's extensionless relative imports ('./units' → './units.js').
export async function resolve(specifier, context, next) {
  try {
    return await next(specifier, context)
  } catch (err) {
    if (err?.code !== 'ERR_MODULE_NOT_FOUND' || !specifier.startsWith('.') || specifier.endsWith('.js')) throw err
    return next(`${specifier}.js`, context)
  }
}
