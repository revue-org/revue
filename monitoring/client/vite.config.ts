import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'client',
  base: './',
  // publicDir: 'client/public',
  build: {
    rollupOptions: {
      input: {
        main: 'client/index.html'
      }
    },
    outDir: '../dist/client',
    target: 'es2020'
  },
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

