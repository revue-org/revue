plugins {
    id("configure-npm")
}

packageJson {
    name = "log"
    description = "Log microservice"
    main = "dist/src/index.js"
    scripts {
        script("test" runs "vitest --run" dependingOn listOf(npmScript("build", "common")))
    }
    dependencies {
        "mongodb-memory-server" version "^10.0.0"
        "socket.io" version "^4.7.4"
        "supertest" version "^7.0.0"
    }
}
