import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig(({ mode }) => {
  return {
    extensions: ["js", "ts"],
    testFiles: "test/**/*.test.ts",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
        "@common": path.resolve(__dirname, "node_modules/common/dist/"),
        "@application": path.resolve(__dirname, "node_modules/common/dist/application/"),
        "@infrastructure": path.resolve(__dirname, "node_modules/common/dist/infrastructure/"),
        "@utils": path.resolve(__dirname, "node_modules/common/dist/utils/"),
        "@presentation": path.resolve(__dirname, "node_modules/common/dist/presentation/"),
        "@storage": path.resolve(__dirname, "node_modules/common/dist/storage/")
      }
    },
    test: {
      setupFiles: ["./test/setup.ts"],
      testTimeout: 30000
    }
  }
});