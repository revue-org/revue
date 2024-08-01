import com.github.gradle.node.npm.task.NpmTask
import org.gradle.internal.extensions.stdlib.capitalized
import java.io.BufferedInputStream
import java.io.ByteArrayInputStream
import java.io.FileOutputStream
import java.net.URI
import java.util.zip.ZipInputStream

group = "it.ldt"
version = "0.1.0"

repositories {
    mavenCentral()
}

plugins {
    id("com.github.node-gradle.node") version "7.0.2"
}

class Task(
    val name: String,
    val command: List<String>
)

val Project.isNodeProject get() = file("package.json").exists()

val microservices = listOf(
    "alarm",
    "auth",
    "device",
    "location",
    "log",
    "monitoring",
    "recognition",
    "notification",
    "user"
)
val images = microservices + listOf("frontend", "kafka", "media-server")

val swaggerUI = "swagger-ui"
val openAPI = "openapi"

tasks.register<DefaultTask>("download-swagger-ui") {
    val releaseUrl = "https://github.com/swagger-api/swagger-ui/archive/refs/tags/v5.17.14.zip"
    doLast {
        ByteArrayInputStream(URI(releaseUrl).toURL().readBytes()).use { inputStream ->
            BufferedInputStream(inputStream).use { bufferedInputStream ->
                ZipInputStream(bufferedInputStream).use { zip ->
                    var currentEntry = zip.nextEntry
                    while(currentEntry != null) {
                        if (currentEntry.name.matches(Regex("swagger-ui-[0-9\\.]+/dist/.+"))) {
                            println("Extracting ${currentEntry.name}")
                            project.layout.buildDirectory.asFile.get().also {
                                val destination = it.resolve(swaggerUI)
                                currentEntry?.name?.split("/")?.last()?.let { fileName ->
                                    val outFile = File(destination, fileName)
                                    outFile.parentFile.mkdirs()
                                    FileOutputStream(outFile).use { fileOutputStream ->
                                        zip.copyTo(fileOutputStream)
                                    }
                                }
                            }
                        }
                        currentEntry = zip.nextEntry
                    }
                }
            }
        }
    }
    outputs.dir(project.layout.buildDirectory.dir(swaggerUI))
}

val openApiPath = rootProject.layout.buildDirectory.dir("openapi")

tasks.register<Copy>("generate-openapi-index-page") {
    from(project.layout.projectDirectory.dir("src").dir("resources"))
    into(openApiPath.get())
    expand("microservices" to microservices.joinToString(separator = "\n") {
        "<li><a href=\"$it\">${it.capitalized()}</a></li>"
    })
}

data class K8sConfiguration (
    val scriptName: String = "kompose",
) {
    val kompose: RegularFile = project.layout.buildDirectory.file(scriptName).get()
    val komposeFile = kompose.asFile
    val compose: RegularFile = rootProject.layout.buildDirectory.file("all-docker-compose.yml").get()
    val composeFile = compose.asFile
    val directory: Directory = rootProject.layout.buildDirectory.dir("k8s").get()
    val directoryFile = directory.asFile
}

val k8sConfig = K8sConfiguration()

fun osIs(os: String) = System.getProperty("os.name").startsWith(os)

val downloadKompose = tasks.register<Exec>("download-kompose") {
    val archs = mapOf(
        "amd64" to setOf("x86_64", "amd64", "x64", "i386"),
        "arm64" to setOf("aarch64", "arm64", "armv8", "armv8l"),
    ).flatMap { it.value.map { a -> a to it.key } }.toMap()
    val releaseFile = when {
        osIs("Linux") -> "linux"
        osIs("Mac") -> "darwin"
        else -> throw IllegalStateException("Unsupported OS")
    }.let { "kompose-$it-${archs[System.getProperty("os.arch")]}" }
    val releaseUrl = "https://github.com/kubernetes/kompose/releases/download/v1.34.0/$releaseFile"
    commandLine("curl", "-L", releaseUrl, "-o", k8sConfig.komposeFile.absolutePath)
    outputs.file(k8sConfig.kompose)
    doLast {
        k8sConfig.komposeFile.setExecutable(true)
    }
}

val generateOverallComposeFile = tasks.register<Exec>("generate-overall-compose-file") {
    commandLine(
        "docker", "compose",
        "--project-name", "revue",
        "--project-directory", rootProject.layout.projectDirectory.asFile.absoluteFile,
        *images.flatMap {
            listOf("-f", rootProject.layout.projectDirectory.dir(it).file("docker-compose.yml").asFile.absoluteFile)
        }.toTypedArray(),
        "config",
        "-o", k8sConfig.composeFile.absolutePath
    )
    outputs.file(k8sConfig.compose)
}

tasks.register<Exec>("generate-k8s-specifications") {
    dependsOn(downloadKompose, generateOverallComposeFile)
    mustRunAfter(generateOverallComposeFile)
    commandLine(k8sConfig.kompose.asFile.absolutePath, "convert",
        "--with-kompose-annotation=false",
        "--volumes", "persistentVolumeClaim",
        "-f", k8sConfig.composeFile.absolutePath,
        "-o", k8sConfig.directoryFile.absolutePath
    )
    outputs.dir(k8sConfig.directory)
    for (i in 1 .. 2) {
        doLast {
            val sourceFile = k8sConfig.directory.file("revue-kafka-$i-tcp-service.yaml").asFile
            val destinationFile = k8sConfig.directory.file("revue-kafka-$i-service.yaml").asFile
            sourceFile.renameTo(destinationFile)
            exec {
                commandLine("sed", "-i", *listOf("''").filter { osIs("Mac") }.toTypedArray(),
                    "s/-tcp//g", k8sConfig.directory.file("revue-kafka-$i-service.yaml")
                        .asFile.absoluteFile)
            }
        }
    }
}

allprojects {
    tasks.register<Delete>("clean") {
        delete("dist", "node_modules/", "tsconfig.tsbuildinfo", "build")
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

    if (project.name in microservices) {
        tasks.register<Copy>("generate-openapi-website") {
            dependsOn(":download-swagger-ui")
            from(
                rootProject.layout.projectDirectory
                    .dir("docs")
                    .dir("api")
                    .dir(openAPI)
                    .dir(project.name)
                    .files("schemas.yml", "specification.yml"),
                rootProject.layout.buildDirectory.dir(swaggerUI).get()
            )
            into(openApiPath.get().dir(project.name))
            doLast {
                rootProject.layout.buildDirectory
                    .dir(openAPI)
                    .get()
                    .dir(project.name)
                    .file("swagger-initializer.js").asFile.also {
                        it.writeText(
                            it.readText()
                                .replace(
                                    "https://petstore.swagger.io/v2/swagger.json",
                                    "specification.yml"
                                )
                        )
                }

            }
        }
    }
}
