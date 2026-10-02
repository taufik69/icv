import { apiClient } from '@/shared/lib/apiClient'

// Staff sign-in and password reset (server/src/modules/auth). The session is an httpOnly cookie the
// browser keeps; these calls never see the token.
export const authApi = {
  me: () => apiClient.get('/auth/me').then((r) => r.data),
  login: (body) => apiClient.post('/auth/login', body).then((r) => r.data),
  logout: () => apiClient.post('/auth/logout'),
  forgot: (email) => apiClient.post('/auth/forgot-password', { email }).then((r) => r.data), // { expiresAt, message }
  verifyCode: (email, code) => apiClient.post('/auth/verify-code', { email, code }).then((r) => r.data), // { resetToken }
  resetPassword: (resetToken, password) => apiClient.post('/auth/reset-password', { resetToken, password }).then((r) => r.data),
}
