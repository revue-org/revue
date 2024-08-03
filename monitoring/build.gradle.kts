packageJson {
    name = "monitoring"
    description = "Monitoring microservice"
    main = "dist/src/index.js"
    scripts {
        script("serve" runs "NODE_ENV=production node .")
        script("dev" runs "npm run build && NODE_ENV=develop node .")
        script("build" runs "tsc && tsc-alias")
        script("watch" runs "tsc -w & tsc-alias -w & nodemon .")
        script("lintFix" runs "eslint src/ --ext .js,.cjs,.mjs,.ts,.cts --fix")
        script("lint" runs "eslint src/ --ext .js,.cjs,.mjs,.ts,.cts")
        script("formatFix" runs "prettier --write src")
        script("format" runs "prettier --check src")
    }
    dependencies {
        "axios" version "^1.6.8"
        "cors" version "^2.8.5"
        "common" version "file:../common"
        "dotenv" version "^16.3.1"
        "express" version "^4.18.2"
        "jsonwebtoken" version "^9.0.2"
        "kafkajs" version "^2.2.4"
        "mongoose" version "^8.0.1"
        "socket.io" version "^4.7.4"
    }
    devDependencies {
        "@rushstack/eslint-patch" version "^1.3.3"
        "@types/cors" version "^2.8.17"
        "@types/express" version "^4.17.17"
        "@types/jsonwebtoken" version "^9.0.5"
        "@types/node" version "^20.0.0"
        "@typescript-eslint/eslint-plugin" version "^7.0.0"
        "eslint" version "^8.49.0"
        "nodemon" version "^3.0.1"
        "prettier" version "^3.0.3"
        "tsc-alias" version "^1.8.8"
        "typescript" version "5.5.4"
        "vite" version "^5.0.0"
    }
}