import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // plugins: [react()],
    plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000
  }

})
