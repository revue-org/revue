packageJson {
    name = "location"
    description = "Location microservice"
    main = "dist/src/main.js"
    scripts {
        script("test" runs "vitest --exclude \"test/tolerance/**\" --run")
        script("testToleranceLocation" runs "vitest --run tolerance.locatioon")
        script("coverage" runs "vitest --run --coverage")
    }
    devDependencies {
        "mongodb-memory-server" version "^10.0.0"
    }
}
