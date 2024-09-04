plugins {
    id("configure-npm")
}

packageJson {
    type = "module"
    name = "alarm"
    description = "Alarm microservice"
    main = "dist/src/index.js"
    scripts {
        val scriptDeps = listOf(npmScript("build") inProject "common")
        listOf(
            "test" runs "vitest --exclude \"test/tolerance/**\" --run",
            "testToleranceNotification" runs "vitest --run tolerance.notification",
            "coverage" runs "vitest --run --coverage",
        ).forEach { script(it dependingOn scriptDeps) }
        script("acceptanceTest" runs "NODE_ENV=test npx cucumber-js test/features -f 'html':'build/bdd/cucumber-output.html'"
                dependingOn scriptDeps + npmScript("build")
        )
    }
    devDependencies {
        "mongodb-memory-server" version "^10.0.0"
    }
}
