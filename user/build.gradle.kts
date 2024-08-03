packageJson {
    name = "user"
    description = "User microservice"
    main = "dist/src/index.js"
    scripts {
        script("test" runs "vitest --run")
    }
    dependencies {
        "@rollup/plugin-commonjs" version "^26.0.1"
        "@rollup/plugin-node-resolve" version "^15.2.3"
        "mongodb-memory-server" version "^10.0.0"
        "rollup" version "^4.18.1"
        "supertest" version "^7.0.0"
    }
    devDependencies {
        "@types/bcryptjs" version "^2.4.6"
    }
}