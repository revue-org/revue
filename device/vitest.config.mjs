import { defineConfig } from 'vitest/config'
import path from "node:path";

export default  defineConfig({
  extensions: ['js', 'ts'],
  testFiles: 'test/**/*.test.ts',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      "@common": path.resolve(__dirname, 'node_modules/common/dist/')
    }
  },
  test: {
    setupFiles: ['./test/setup.ts'],
    testTimeout: 30000
  }
})
