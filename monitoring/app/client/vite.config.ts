import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'app',
  base: './',
  // publicDir: 'client/public',
  build: {
    rollupOptions: {
      input: {
        main: 'app/client/index.html'
      }
    },
    outDir: '../dist/app',
    target: 'es2020'
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
