group = "it.ldt" // Replace with your project's group
version = "1.0"       // Replace with your project's version

repositories {
    mavenCentral()
}

// Domain module
project(":domain") {
    tasks.register("build", Exec::class) {
        commandLine("npm", "run", "build")
    }
}

// Monitoring module
project(":monitoring") {
    tasks.register("build", Exec::class) {
        dependsOn(":domain:build")
        commandLine("npm", "run", "build")
    }
}

// Client module
project(":client") {
    tasks.register("build", Exec::class) {
        dependsOn(":domain:build")
        commandLine("npm", "run", "build")
    }

    tasks.register("runClient", Exec::class) {
        commandLine("npm", "start")
    }
}
