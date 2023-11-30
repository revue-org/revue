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
    registerNpmTask("test", "test")
    registerNpmTask("format", "format")
    registerNpmTask("format-fix", "format:fix")
    registerNpmTask("lint", "lint")
}

// Monitoring module
project(":monitoring") {
    registerNpmTask("build", "build", listOf(":domain:build"))
//    registerNpmTask("test", "test", listOf(":domain:build"))
    registerNpmTask("format", "format")
    registerNpmTask("format-fix", "format:fix")
    registerNpmTask("lint", "lint")
}

// Client module
project(":client") {
    registerNpmTask("build", "build", listOf(":domain:build"))
    registerNpmTask("format-fix", "format:fix")
    registerNpmTask("start", "start")
//    registerNpmTask("test", "test", listOf(":domain:build"))
}
