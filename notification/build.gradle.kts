plugins {
    id("configure-npm")
}

packageJson {
    name = "notification"
    description = "Notification microservice"
    main = "dist/src/index.js"
    scripts {
        val scriptDeps = listOf(npmScript("build") inProject "common")
        listOf(
            "testToleranceAuth" runs "vitest --run tolerance.auth",
            "test" runs "vitest --exclude \"test/tolerance/**\" --run",
            "coverage" runs "vitest --run --coverage",
        ).forEach { script(it dependingOn scriptDeps) }
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
