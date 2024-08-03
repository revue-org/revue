packageJson {
    name = "device"
    description = "Device microservice"
    main = "dist/src/index.js"
    scripts {
        script("test" runs "vitest --exclude \"test/tolerance/**\" --run")
        script("testToleranceNotification" runs "vitest --run tolerance.notification")
        script("coverage" runs "vitest --run --coverage")
    }
    dependencies {
        "@node-wot/binding-http" version "^0.8.14"
        "@node-wot/core" version "^0.8.14"
    }
    devDependencies {
        "mongodb-memory-server" version "^10.0.0"
    }
}
