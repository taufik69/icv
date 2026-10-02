import { ApiError } from '../../shared/utils/ApiError.js'
import { readCookie } from './auth.cookies.js'
import { User } from './auth.model.js'
import { readSession, tokenMatchesUser } from './auth.token.js'

// Guards staff routes: a valid session cookie for an account whose password hasn't changed since.
// Sets req.user. Anything else is a 401 the dashboard turns into "sign in again".
export async function requireAuth(req, res, next) {
  const data = readSession(readCookie(req))
  const user = data && (await User.findById(data.sub).lean())
  if (!user || !tokenMatchesUser(data, user)) return next(new ApiError(401, 'Please sign in.'))
  req.user = user
  next()
}
