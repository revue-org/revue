packageJson {
    name = "frontend"
    description = "Frontend microservice"
    main = "src/main.ts"
    scripts {
        val scriptDeps = listOf(npmScript("build") inProject "common")
        listOf(
            "serve" runs "serve -s dist -l 8080",
            "build" runs "vite build || rm -rf node_modules && rm -rf package-lock.json && npm install && vite build",
            "preview" runs "vite build && vite preview",
            "dev" runs "vite",
            "host" runs "vite --host",
            "test" runs "echo \"Error: no test specified\" && exit 1",
        ).forEach {
            script(it dependingOn scriptDeps) { task ->
                if (it.scriptName == "build") {
                    with(task) {
                        inputs.dir("src")
                        inputs.dir(fileTree("node_modules").exclude(".cache"))
                        outputs.dir("dist")
                    }
                }
            }
        }
    }
    dependencies {
        "@quasar/extras" version "^1.16.9"
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
        "@vitejs/plugin-vue" version "^5.0.0"
        "@vue/eslint-config-prettier" version "^9.0.0"
        "@vue/eslint-config-typescript" version "^13.0.0"
        "@vue/test-utils" version "^2.4.1"
        "@vue/tsconfig" version "^0.5.0"
        "eslint-plugin-vue" version "^9.18.1"
        "sass" version "^1.69.7"
        "vite" version "^5.0.11"
        "vite-plugin-node-polyfills" version "^0.22.0"
        "vue-tsc" version "^2.0.0"
    }
}
