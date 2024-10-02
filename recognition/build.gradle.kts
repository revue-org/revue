class Task(
    val name: String,
    val command: List<String>
)

val setup by tasks.registering<Exec> {
    commandLine = listOf("pip", "install", "-r", "requirements.txt")
}

val install = tasks.register<Exec>("install") {
    dependsOn(setup)
    commandLine = listOf("poetry", "install", "--no-root")
}

val build = tasks.register<Exec>("build") {
    dependsOn(install)
    commandLine = listOf("poetry", "build")
}

listOf(
    Task("test", listOf("poetry", "run", "python", "run_tests.py")),
    Task("format", listOf("poetry", "run", "python", "-m", "black", ".", "--check")),
    Task("format-fix", listOf("poetry", "run", "python", "-m", "black", ".")),
).forEach { task ->
    tasks.register<Exec>(task.name) {
        dependsOn(build)
        commandLine = listOf(*task.command.toTypedArray())
    }
}
