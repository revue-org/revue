plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.8.0"
    id("org.danilopianini.gradle-pre-commit-git-hooks") version "2.0.13"
}

rootProject.name = "revue"
val subprojects = listOf(
    "common",
    "alarm",
    "auth",
    "device",
    "location",
    "notification",
    "log",
    "user",
    "monitoring",
    "recognition",
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
