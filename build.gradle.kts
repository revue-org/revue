import com.github.gradle.node.npm.task.NpmTask

group = "it.ldt"
version = "0.1.0"

repositories {
    mavenCentral()
}

plugins {
    id("com.github.node-gradle.node") version "7.0.1"
}

class Task(val name: String, val args: List<String>, val dependencies: List<String> = listOf())


subprojects {

    if (project.file("package.json").exists()) {
        apply(plugin = "com.github.node-gradle.node")

        node {
            download = false
        }

        listOf(
            Task("install", listOf("install")),
            Task("build", listOf("run", "build")),
            Task("start", listOf("start")),
            Task("test", listOf("run", "test")),
            Task("testArchitecture", listOf("run", "test:architecture")),
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

        tasks.register("clean", Delete::class) {
            delete("dist", "node_modules/domain", "tsconfig.tsbuildinfo")
        }
    } else if (project.file(".python-version").exists()) {
        listOf(
            Task("install", listOf("pip", "install", "-r", "requirements.txt")),
            Task("build", listOf("echo", "ciao"), listOf(":${project.name}:install")),
            Task("test", listOf("python", "-m", "unittest", "discover", "-s", "test")),
            Task("format", listOf("python", "-m", "black", ".")),
            Task("format-fix", listOf("python", "-m", "black", ".", "--check")),
        ).forEach { task ->
            tasks.register(task.name, Exec::class) {
                if (task.name != "install") dependsOn(":${project.name}:install")
                commandLine = listOf(*task.args.toTypedArray())
                if (task.dependencies.isNotEmpty()) dependsOn(task.dependencies)
            }
        }
    }


}
