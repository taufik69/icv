import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    // Must run before react(): generates src/routeTree.gen.js from src/routes/
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      disableTypes: true,
      generatedRouteTree: './src/routeTree.gen.js',
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    // One React for the app and every library (a stray copy breaks hooks: "Invalid hook call").
    dedupe: ['react', 'react-dom'],
  },
  // Pre-bundle the lazy-loaded editor with React at startup, not in a later pass with its own React.
  optimizeDeps: {
    include: ['@tiptap/react', '@tiptap/starter-kit', '@tiptap/extensions'],
  },
})
