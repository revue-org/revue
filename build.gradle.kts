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

allprojects {
    tasks.register<Delete>("clean") {
        delete("dist", "node_modules/", "tsconfig.tsbuildinfo", "build")
    }
}

subprojects {
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
