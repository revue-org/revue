packageJson {
    name = "notification"
    description = "Notification microservice"
    main = "dist/src/index.js"
    scripts {
        script("testToleranceAuth" runs "vitest --run tolerance.auth")
        script("test" runs "vitest --exclude \"test/tolerance/**\" --run")
        script("coverage" runs "vitest --run --coverage")
    }
    dependencies {
        "nodemailer" version "^6.9.13"
        "socket.io" version "^4.7.4"
    }
    devDependencies {
        "@types/nodemailer" version "^6.4.14"
        "mongodb-memory-server" version "^10.0.0"
    }
}
