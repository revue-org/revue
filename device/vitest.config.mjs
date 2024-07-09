import { defineConfig } from 'vitest/config'
import path from "node:path";

export default  defineConfig({
  extensions: ['js', 'ts'],
  testFiles: 'test/**/*.test.ts',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@common": path.resolve(__dirname, "node_modules/common/dist/"),
      "@domain": path.resolve(__dirname, "node_modules/common/dist/domain/"),
      "@application": path.resolve(__dirname, "node_modules/common/dist/application/"),
      "@presentation": path.resolve(__dirname, "node_modules/common/dist/presentation/"),
      "@infrastructure": path.resolve(__dirname, "node_modules/common/dist/infrastructure/"),
      "@utils": path.resolve(__dirname, "node_modules/common/dist/utils/")
    }
  },
  test: {
    setupFiles: ['./test/setup.ts'],
    testTimeout: 30000
  }
})
