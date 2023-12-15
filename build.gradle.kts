group = "it.ldt"
version = "1.0"

repositories {
    mavenCentral()
}

plugins {
    id("com.github.node-gradle.node") version "7.0.1"
//    id("co.uzzu.dotenv.gradle") version "3.0.0"
}

subprojects {


    apply(plugin = "com.github.node-gradle.node")

    node {
        // versions useful only if download = true
        download = true
        version = "20.10.0"   // env.NODE_VERSION.value
        npmVersion = "10.2.3" // env.NPM_VERSION.value
    }

    tasks.register("install") {
        dependsOn(":npmInstall")
    }
    tasks.register("build") {
        dependsOn(":${project.name}:npm_run_build")
        dependsOn(":${project.name}:npmInstall")
        dependsOn(":domain:npm_run_build")
    }
    tasks.register("test") {
        dependsOn(":${project.name}:npm_run_build")
        dependsOn(":${project.name}:npm_run_test")
    }
    tasks.register("format") {
        dependsOn(":${project.name}:npm_run_format")
    }
    tasks.register("lint") {
        dependsOn(":${project.name}:npm_run_lint")
    }

    // ordering task execution
    if (project.name != "domain") {
        tasks.findByPath(":${project.name}:npmInstall")?.mustRunAfter(":domain:npm_run_build")
    }
    tasks.findByPath(":${project.name}:npm_run_build")?.mustRunAfter(":${project.name}:npmInstall")
    tasks.findByPath(":${project.name}:npmInstall")?.doNotTrackState("error in ci")
}
