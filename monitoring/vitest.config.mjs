import { defineConfig } from 'vitest/config'
import path from "node:path";

export default defineConfig({
  extensions: ['js', 'ts'],
  testFiles: 'test/**/*.test.ts',
  resolve: {
    alias: {}
  },
  test: {
    setupFiles: ['./test/setup.ts'],
    testTimeout: 30000
  }
})
