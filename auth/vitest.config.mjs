import { defineConfig } from 'vitest/config'
import path from "node:path";

export default  defineConfig({
  extensions: ['js', 'ts'],
  testFiles: 'test/**/*.test.ts',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@domain': path.resolve(__dirname, 'node_modules/domain/dist/domain/'),
      '@application': path.resolve(__dirname, 'node_modules/domain/dist/application/'),
      '@utils': path.resolve(__dirname, 'node_modules/domain/dist/utils/'),
      '@storage': path.resolve(__dirname, 'node_modules/domain/dist/storage/')
    }
  },
  test: {
    setupFiles: ['./test/setup.ts']
  }
})