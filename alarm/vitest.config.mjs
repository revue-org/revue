import { defineConfig } from 'vitest/config'
import path from "node:path";

export default  defineConfig({
  optimizeDeps: {
    entries: []
  },
  extensions: ['js', 'ts'],
  // Specify the test files pattern
  testFiles: 'test/**/*.test.ts',
  resolve: {
    alias: {
      '@domain': path.resolve(__dirname, 'node_modules/domain/dist/domain/'),
      '@application': path.resolve(__dirname, 'node_modules/domain/dist/application/'),
      '@utils': path.resolve(__dirname, 'node_modules/domain/dist/utils/'),
      '@storage': path.resolve(__dirname, 'node_modules/domain/dist/storage/')
    }
  },
  test: {
    testTimeout: 80000,
    hookTimeout: 80000,
    setupFiles: ['./test/setup.ts']
  }
})