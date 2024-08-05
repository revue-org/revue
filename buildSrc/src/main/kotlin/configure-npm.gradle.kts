import Microservices.FRONTEND
import Microservices.MONITORING

plugins {
    id("io.github.kelvindev15.npm-gradle-plugin")
}
val common = "common"

packageJson {
    version = "0.1.0"
    repository = "git" to "git+https://github.com/revue-org/revue.git"
    author = "Mattia Matteini, Kelvin Olaiya, Alberto Paganelli"
    license = "MIT"
    homepage = "https://github.com/revue-org/revue#readme"
    scripts {
        val scriptDeps = listOf(npmScript("build") inProject "common")
        val formatSourceSet = if (project.name !in setOf(common, FRONTEND, MONITORING)) "src test" else "src"
        if(project.name !in setOf(common, FRONTEND)) {
            script("serve" runs "NODE_ENV=production node ." dependingOn scriptDeps)
        }
        if (project.name != FRONTEND.path) {
            script("build" runs "tsc && tsc-alias" dependingOn scriptDeps.filter {
                it.projectName != project.name
            }) {
                with(it) {
                    inputs.dir("src")
                    inputs.dir(fileTree("node_modules").exclude(".cache"))
                    outputs.dir("dist")
                }
            }
            script("dev" runs "npm run build && NODE_ENV=develop node ." dependingOn scriptDeps)
        }
        listOf(
            "watch" runs "tsc -w & tsc-alias -w & nodemon .",
            "lintFix" runs "eslint src/ --ext .js,.cjs,.mjs,.ts,.cts --fix",
            "lint" runs "eslint src/ --ext .js,.cjs,.mjs,.ts,.cts",
            "formatFix" runs "prettier --write $formatSourceSet",
            "format" runs "prettier --check $formatSourceSet"
        ).forEach {
            script(it dependingOn scriptDeps)
        }
    }
    dependencies {
        if (project.name != common) {
            "common" version "file:../common"
        }
        "axios" version "^1.6.7"
        "cors" version "^2.8.5"
        "dotenv" version "^16.3.1"
        "express" version "^4.18.2"
        "jsonwebtoken" version "^9.0.2"
        "kafkajs" version "^2.2.4"
        "mongoose" version "^8.0.1"
        "zod" version "^3.23.8"
        "uuid" version "^10.0.0"
    }
    devDependencies {
        "@rushstack/eslint-patch" version "^1.3.3"
        "@types/cors" version "^2.8.17"
        "@types/express" version "^4.17.17"
        "@types/jsonwebtoken" version "^9.0.5"
        "@types/node" version "^20.0.0"
        "@types/supertest" version "^6.0.2"
        "@types/uuid" version "^10.0.0"
        "@typescript-eslint/eslint-plugin" version "^7.0.0"
        "eslint" version "^8.49.0"
        "nodemon" version "^3.0.1"
        "prettier" version "^3.0.3"
        "supertest" version "^7.0.0"
        "tsc-alias" version "^1.8.8"
        "typescript" version "5.5.4"
        "vite" version "^5.0.0"
        "vitest" version "^2.0.0"
    }
}
