import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Unit + component tests (npm test). Kept apart from vite.config.js so tests don't run the router
// code generator or Tailwind.
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.test.{js,jsx}'],
    env: { VITE_API_BASE_URL: 'http://api.test/api/v1' },
  },
})
