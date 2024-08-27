plugins {
    id("configure-npm")
}

packageJson {
    type = "module"
    name = "common"
    description = "Common module"
    main = "src/index.ts"
    scripts {
        script("testArchitecture" runs "npx depcruise src" dependingOn listOf(npmScript("build")))
    }
    devDependencies {
        "dependency-cruiser" version "^16.3.3"
        "mongodb-memory-server" version "^10.0.0"
    }
}
