import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import tsconfigPaths from 'vite-tsconfig-paths'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    // the resolving is in tsconfig.shared.json using this plugin
    tsconfigPaths(),
    nodePolyfills({
      exclude: [
        'domain' // Excludes the polyfill for `http` and `node:http`.
      ]
    }),

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
    port: 8080
  },
  preview: {
    port: 8080
  },
  envDir: (process.env.NODE_ENV === 'development') ? '../' : './'
})
