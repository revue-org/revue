plugins {
    id("configure-npm")
}

packageJson {
    type = "module"
    name = "device"
    description = "Device microservice"
    main = "dist/src/index.js"
    scripts {
        val scriptDeps = listOf(npmScript("build") inProject "common")
        listOf(
            "test" runs "vitest --exclude \"test/tolerance/**\" --run",
            "testToleranceNotification" runs "vitest --run tolerance.notification",
            "coverage" runs "vitest --run --coverage",
        ).forEach { script(it dependingOn scriptDeps) }
    }
    dependencies {
        "@node-wot/binding-http" version "^0.8.14"
        "@node-wot/core" version "^0.8.14"
    }
    devDependencies {
        "mongodb-memory-server" version "^10.0.0"
    }
}
