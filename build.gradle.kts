import com.github.gradle.node.npm.task.NpmTask

group = "it.ldt"
version = "0.1.0"

repositories {
    mavenCentral()
}

plugins {
    id("com.github.node-gradle.node") version "7.0.1"
}

class Task(
    val name: String,
    val command: List<String>
)

val Project.isNodeProject get() = file("package.json").exists()

allprojects {
    tasks.register<Delete>("clean") {
        delete("dist", "node_modules/", "tsconfig.tsbuildinfo")
    }
}

subprojects {
    if (project.isNodeProject) {
        apply(plugin = "com.github.node-gradle.node")

        node {
            download = false
        }

        val install = tasks.register<NpmTask>("install") {
            args = listOf("install")
        }

        val build = tasks.register<NpmTask>("build") {
            dependsOn(install)
            mustRunAfter(install)
            args = listOf("run", "build")
            inputs.dir("src")
            inputs.dir(fileTree("node_modules").exclude(".cache"))
            outputs.dir("dist")
        }

        tasks.register<NpmTask>("test") {
            dependsOn(build)
            args = listOf("run", "test")
        }

        listOf(
            Task("testArchitecture", listOf("run", "test:architecture")),
            Task("format", listOf("run", "format")),
            Task("lint", listOf("run", "lint")),
            Task("format-fix", listOf("run", "format:fix")),
            Task("lint-fix", listOf("run", "lint:fix")),
        ).forEach { task ->
            tasks.register<NpmTask>(task.name) {
                args = task.command
                dependsOn(install)
            }
        }
    }

    if (project.name != "common") {
        tasks.forEach {
            it.dependsOn(":common:build")
            it.mustRunAfter(":common:build")
        }
    }
}
