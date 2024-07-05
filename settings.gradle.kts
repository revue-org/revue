plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.7.0"
    id("org.danilopianini.gradle-pre-commit-git-hooks") version "2.0.3"
}

rootProject.name = "revue"
val subprojects = listOf(
    "common",
    "alarm",
    "auth",
    "camera",
    "device",
    "location",
    "notification",
    "log",
    "user",
    "monitoring",
    "recognition",
    "sensor",
    "frontend",
)
subprojects.forEach { include(":$it") }

if (File(System.getProperty("user.dir") + "/.git").exists()) {
    gitHooks {
        commitMsg {
            conventionalCommits {
                defaultTypes()
                types("wip", "other", "deps")
            }
        }
        preCommit {
            from {
                ""//./gradlew format-fix
            }
            appendScript {
                ""// && git add .
            }
        }
        createHooks(overwriteExisting = true)
    }
}
