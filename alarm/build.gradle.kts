packageJson {
    name = "alarm"
    description = "Alarm microservice"
    main = "dist/src/index.js"
    scripts {
        script("test" runs "vitest --exclude \"test/tolerance/**\" --run")
        script("testToleranceNotification" runs "vitest --run tolerance.notification")
        script("coverage" runs "vitest --run --coverage")
    }
    devDependencies {
        "mongodb-memory-server" version "^10.0.0"
    }
}
