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
    id("io.github.kelvindev15.npm-gradle-plugin") version "3.0.0"
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
    apply(plugin = "io.github.kelvindev15.npm-gradle-plugin")
    if (project.isNodeProject) {
        packageJson {
            version = "0.1.0"
            repository = ("git" to "git+https://github.com/revue-org/revue.git")
            author = "Mattia Matteini, Kelvin Olaiya, Alberto Paganelli"
            license = "MIT"
            homepage = "https://github.com/revue-org/revue#readme"
            scripts {
                val scriptDeps = listOf(npmScript("build") inProject "common")
                val formatSourceSet = if (project.name !in setOf("common", "frontend", "monitoring")) "src test" else "src"
                if(project.name !in setOf("common", "frontend")) {
                    script("serve" runs "NODE_ENV=production node ." dependingOn scriptDeps)
                }
                if (project.name != "frontend") {
                    script("build" runs "tsc && tsc-alias" dependingOn scriptDeps.filter {
                        it.projectName != project.name
                    })
                    script("dev" runs "npm run build && NODE_ENV=develop node ." dependingOn scriptDeps)
                }
                listOf(
                    "watch" runs "tsc -w & tsc-alias -w & nodemon .",
                    "lintFix" runs "eslint src/ --ext .js,.cjs,.mjs,.ts,.cts --fix",
                    "lint" runs "eslint src/ --ext .js,.cjs,.mjs,.ts,.cts",
                    "formatFix" runs "prettier --write $formatSourceSet",
                    "format" runs "prettier --check $formatSourceSet"
                ).forEach {
                    script(it dependingOn scriptDeps)
                }
            }
            dependencies {
                if (project.name != "common") {
                    "common" version "file:../common"
                }
                "axios" version "^1.6.7"
                "cors" version "^2.8.5"
                "dotenv" version "^16.3.1"
                "express" version "^4.18.2"
                "jsonwebtoken" version "^9.0.2"
                "kafkajs" version "^2.2.4"
                "mongoose" version "^8.0.1"
                "zod" version "^3.23.8"
                "uuid" version "^10.0.0"
            }
            devDependencies {
                "@rushstack/eslint-patch" version "^1.3.3"
                "@types/cors" version "^2.8.17"
                "@types/express" version "^4.17.17"
                "@types/jsonwebtoken" version "^9.0.5"
                "@types/node" version "^20.0.0"
                "@types/supertest" version "^6.0.2"
                "@types/uuid" version "^10.0.0"
                "@typescript-eslint/eslint-plugin" version "^7.0.0"
                "eslint" version "^8.49.0"
                "nodemon" version "^3.0.1"
                "prettier" version "^3.0.3"
                "supertest" version "^7.0.0"
                "tsc-alias" version "^1.8.8"
                "typescript" version "5.5.4"
                "vite" version "^5.0.0"
                "vitest" version "^2.0.0"
            }
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
