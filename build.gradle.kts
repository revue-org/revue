import com.github.gradle.node.npm.task.NpmTask

group = "it.ldt"
version = "0.1.0"

repositories {
    mavenCentral()
}

plugins {
    id("com.github.node-gradle.node") version "7.0.1"
}

subprojects {

    apply(plugin = "com.github.node-gradle.node")

    node {
        download = false
    }
    class Task(val name: String, val args: List<String>, val dependencies: List<String> = listOf())

    listOf(
        Task("install", listOf("install")),
        Task("build", listOf("run", "build")),
        Task("test", listOf("run", "test")),
        Task("format", listOf("run", "format")),
        Task("format-fix", listOf("run", "format:fix")),
        Task("lint", listOf("run", "lint"))
    ).forEach { task ->
        tasks.register<NpmTask>(task.name) {
            args = task.args
            if (task.name != "install") dependsOn(":${project.name}:install")
            if (project.name != "domain") dependsOn(":domain:build")
        }
    }

    // ordering task execution
    if (project.name != "domain") {
        tasks.findByPath(":${project.name}:install")?.mustRunAfter(":domain:build")
    }
    tasks.findByPath(":${project.name}:build")?.mustRunAfter(":${project.name}:install")
}
