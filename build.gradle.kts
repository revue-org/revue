import com.github.gradle.node.npm.task.NpmTask

group = "it.ldt"
version = "1.0"

repositories {
    mavenCentral()
}

plugins {
    id("com.github.node-gradle.node") version "7.0.1"
    id("co.uzzu.dotenv.gradle") version "3.0.0"
}


subprojects {
    apply(plugin = "com.github.node-gradle.node")

    node {
        // versions useful only if download = true
        download = true
        version = env.NODE_VERSION.value
        npmVersion = env.NPM_VERSION.value
    }

    tasks.register("install") {
        dependsOn("npmInstall")
    }
    tasks.register("build") {
        dependsOn(":${project.name}:npm_run_build")
    }

}


fun Project.registerNpmTask(
    taskName: String,
    npmCommand: String,
    dependencies: List<String> = emptyList(),
    isScript: Boolean = true
) {
    tasks.register(taskName, Exec::class) {
        val deps = if (npmCommand != "install") dependencies + ":${project.name}:npmInstall" else dependencies
        dependsOn(deps)
        if (isScript) commandLine("npm", "run", npmCommand)
        else commandLine("npm", npmCommand)
    }
}

// Domain module
project(":domain") {
//    registerNpmTask("install", "install", emptyList(), false)
//    registerNpmTask("build", "build")
//    registerNpmTask("test", "test")
//    registerNpmTask("format", "format")
//    registerNpmTask("format-fix", "format:fix")
//    registerNpmTask("lint", "lint")
}

// Monitoring module
project(":monitoring") {
//    registerNpmTask("install", "install", emptyList(), false)
//    registerNpmTask("build", "build", listOf(":domain:build"))
//    registerNpmTask("start", "start")
////    registerNpmTask("test", "test", listOf(":domain:build"))
//    registerNpmTask("format", "format")
//    registerNpmTask("format-fix", "format:fix")
//    registerNpmTask("lint", "lint")
//    tasks.register("deploy", Exec::class) {
//        commandLine("docker", "compose", "up", "-d", "--build", "--force-recreate")
//    }
}

// Auth module
project(":auth") {
//    registerNpmTask("install", "install", emptyList(), false)
//    registerNpmTask("build", "build", listOf(":domain:build"))
////    registerNpmTask("test", "test", listOf(":domain:build"))
//    registerNpmTask("format", "format")
//    registerNpmTask("format-fix", "format:fix")
//    registerNpmTask("lint", "lint")
//    tasks.register("deploy", Exec::class) {
//        commandLine("docker", "compose", "up", "-d", "--build", "--force-recreate")
//    }
}


// Client module
project(":client") {
//    registerNpmTask("install", "install", emptyList(), false)
//    registerNpmTask("build", "build", listOf(":domain:build"))
//    registerNpmTask("format-fix", "format:fix")
//    registerNpmTask("start", "start")
//    registerNpmTask("test", "test", listOf(":domain:build"))
}
