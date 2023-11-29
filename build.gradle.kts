group = "it.ldt" // Replace with your project's group
version = "1.0"       // Replace with your project's version

repositories {
    mavenCentral()
}

fun Project.registerNpmTask(taskName: String, npmScript: String, dependencies: List<String> = emptyList()) {
    tasks.register(taskName, Exec::class) {
        if (dependencies.isNotEmpty()) dependsOn(dependencies)
        commandLine("npm", "run", npmScript)
    }
}

// Domain module
project(":domain") {
    registerNpmTask("build", "build")
    registerNpmTask("lint", "lint:check")
}

// Monitoring module
project(":monitoring") {
    registerNpmTask("build", "build", listOf(":domain:build"))
}

// Client module
project(":client") {
    registerNpmTask("build", "build", listOf(":domain:build"))
    registerNpmTask("start", "start")
}
