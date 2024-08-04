plugins {
    id("configure-npm")
}

packageJson {
    name = "monitoring"
    description = "Monitoring microservice"
    main = "dist/src/index.js"
    dependencies {
        "socket.io" version "^4.7.4"
    }
}
