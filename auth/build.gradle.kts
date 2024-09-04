plugins {
    id("configure-npm")
}

packageJson {
    type = "module"
    name = "auth"
    description = "Authentication microservice"
    main = "dist/src/index.js"
    scripts {
        val commonBuild = npmScript("build", "common")
        script("test" runs "vitest --run" dependingOn listOf(commonBuild))
    }
    dependencies {
        "@rollup/plugin-commonjs" version "^26.0.1"
        "@rollup/plugin-node-resolve" version "^15.2.3"
        "bcryptjs" version "^2.4.3"
        "rollup" version "^4.18.1"
    }
    devDependencies {
        "@types/bcryptjs" version "^2.4.6"
    }
}
