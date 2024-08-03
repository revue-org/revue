packageJson {
    name = "frontend"
    description = "Frontend microservice"
    main = "src/main.ts"
    scripts {
        script("serve" runs "serve -s dist -l 8080")
        script("build" runs "vite build || rm -rf node_modules && rm -rf package-lock.json && npm install && vite build")
        script("preview" runs "vite build && vite preview")
        script("dev" runs "vite")
        script("host" runs "vite --host")
        script("test" runs "echo \"Error: no test specified\" && exit 1")
        script("lintFix" runs "eslint src/ --ext .vue,.js,.cjs,.mjs,.ts,.cts --fix")
        script("lint" runs "eslint src/ --ext .vue,.js,.cjs,.mjs,.ts,.cts")
        script("formatFix" runs "prettier --write src")
        script("format" runs "prettier --check src")
    }
    dependencies {
        "@quasar/extras" version "^1.16.9"
        "axios" version "^1.6.5"
        "common" version "file:../common"
        "chart.js" version "^4.4.1"
        "pinia" version "^2.1.7"
        "pinia-plugin-persistedstate" version "^3.2.1"
        "quasar" version "^2.14.2"
        "serve" version "^14.2.1"
        "socket.io" version "^4.7.4"
        "socket.io-client" version "^4.7.4"
        "vite-tsconfig-paths" version "^4.2.3"
        "vue" version "^3.3.4"
        "vue-chartjs" version "^5.3.0"
        "vue-router" version "^4.2.5"
    }
    devDependencies {
        "@quasar/vite-plugin" version "^1.6.0"
        "@rushstack/eslint-patch" version "^1.3.3"
        "@typescript-eslint/eslint-plugin" version "^7.0.0"
        "@vitejs/plugin-vue" version "^5.0.0"
        "@vue/eslint-config-prettier" version "^9.0.0"
        "@vue/eslint-config-typescript" version "^13.0.0"
        "@vue/test-utils" version "^2.4.1"
        "@vue/tsconfig" version "^0.5.0"
        "eslint" version "^8.49.0"
        "eslint-plugin-vue" version "^9.18.1"
        "prettier" version "^3.0.3"
        "sass" version "^1.69.7"
        "tsc-alias" version "^1.8.8"
        "typescript" version "5.5.4"
        "vite" version "^5.0.11"
        "vite-plugin-node-polyfills" version "^0.22.0"
        "vitest" version "^2.0.0"
        "vue-tsc" version "^2.0.0"
    }
}