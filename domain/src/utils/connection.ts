import type { Mongoose } from 'mongoose'

export const mongoConnect = async (
  mongoose: Mongoose,
  username: string,
  password: string,
  host: string,
  dbPort: string,
  dbName: string
): Promise<void> => {
  const connectionString: string = `mongodb://${username}:${password}@${host}:${dbPort}/${dbName}?authSource=admin`
  console.log(connectionString)
  await mongoose
    .connect(connectionString)
    .then(async (): Promise<void> => {
      console.log(`Connected to MongoDB database ${dbName} at ${host}:${dbPort}`)
    })
    .catch(e => console.log(e))
}
