import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    // the resolving is in tsconfig.shared.json using this plugin
    tsconfigPaths(),
    vue({
      template: { transformAssetUrls }
    }),
    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      sassVariables: 'src/assets/quasar-variables.sass'
    })
  ],
  server: {
    port: 3000
  },
  preview: {
    port: 3000,
  }
})
