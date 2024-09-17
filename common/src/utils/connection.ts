import type { Mongoose } from 'mongoose'

export type DatabaseCredentials = {
  username: string
  password: string
}

export type DatabaseConfig = {
  host: string
  port: string
  name: string
}

const getDatabaseCredentials = (serviceName: string): DatabaseCredentials => {
  const username: string = process.env[`${serviceName.toUpperCase()}_DB_USERNAME`]!
  const password: string = process.env[`${serviceName.toUpperCase()}_DB_PASSWORD`]!
  return { username, password }
}

const getDatabaseConfig = (serviceName: string): DatabaseConfig => {
  const host: string =
    process.env.NODE_ENV === 'develop' ? 'localhost' : process.env[`${serviceName.toUpperCase()}_DB_HOST`]!
  const port: string =
    process.env.NODE_ENV === 'develop' || process.env.KUBERNETES_SERVICE_HOST
      ? process.env[`${serviceName.toUpperCase()}_DB_PORT`]!
      : process.env.DEFAULT_DB_PORT!
  const name: string = process.env[`${serviceName.toUpperCase()}_DB_NAME`]!
  return { host, port, name }
}

export const mongoConnect = async (mongoose: Mongoose, serviceName: string): Promise<void> => {
  const { host, port, name } = getDatabaseConfig(serviceName)
  const { username, password } = getDatabaseCredentials(serviceName)
  let connectionString: string =
    process.env.NODE_ENV === 'develop'
      ? `mongodb://${username}:${password}@${host}:${port}/${name}?authSource=admin`
      : `mongodb://${username}:${password}@${host}/${name}?authSource=admin`
  console.log(connectionString)
  await mongoose
    .connect(connectionString)
    .then(async (): Promise<void> => {
      console.log(`Connected to MongoDB database ${name} at ${host}:${port}`)
    })
    .catch(e => console.log(e))
}
