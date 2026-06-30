import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Change 'the-pause' to match your GitHub repo name if different.
  base: '/the-pause/',
})
