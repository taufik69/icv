import { hashPassword } from '../src/modules/auth/auth.crypto.js'
import { User } from '../src/modules/auth/auth.model.js'

export const TEST_USER = { email: 'staff.test@example.com', password: 'Test-Password-123', name: 'Test Staff' }

// Creates a staff account in the test database, signs in over HTTP and returns the session cookie
// ("icv_session=…") for the `cookie` header.
export async function signIn(base, user = TEST_USER) {
  await User.deleteMany({ email: user.email })
  await User.create({ email: user.email, name: user.name, role: 'admin', passwordHash: await hashPassword(user.password) })
  const res = await fetch(`${base}/api/v1/auth/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: user.email, password: user.password }) })
  return res.headers.get('set-cookie').split(';')[0]
}
signIn.cleanUp = () => User.deleteMany({ email: TEST_USER.email }).catch(() => {})
