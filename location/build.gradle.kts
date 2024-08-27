plugins {
    id("configure-npm")
}

packageJson {
    type = "module"
    name = "location"
    description = "Location microservice"
    main = "dist/src/main.js"
    scripts {
        val scriptDeps = listOf(npmScript("build") inProject "common")
        listOf(
            "test" runs "vitest --exclude \"test/tolerance/**\" --run",
            "testToleranceLocation" runs "vitest --run tolerance.locatioon",
            "coverage" runs "vitest --run --coverage",
        ).forEach { script(it dependingOn scriptDeps) }
    }
    devDependencies {
        "mongodb-memory-server" version "^10.0.0"
    }
}
