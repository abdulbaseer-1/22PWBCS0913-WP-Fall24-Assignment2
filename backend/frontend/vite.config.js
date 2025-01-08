import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../../dist',  // Build output will go to the root/dist
    emptyOutDir: true      // Ensures the output directory is cleaned before building
  }
})