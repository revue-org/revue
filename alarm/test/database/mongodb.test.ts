import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb'
import { Wait } from 'testcontainers'
import { it } from 'vitest'
import mongoose, { model, Model } from "mongoose";
import { Exceeding } from "@domain/anomaly/core/Exceeding";
import { Intrusion } from "@domain/anomaly/core/Intrusion";
import { exceedingSchema } from "@storage/anomaly/schemas/ExceedingSchema.js";
import { intrusionSchema } from "@storage/anomaly/schemas/IntrusionSchema.js";
import { DatabaseSimulator } from "../../src/utils/storage/DatabaseSimulator.js";
import supertest from "supertest";
import { app } from "../../src/index";
import * as console from "console";

//${process.env.DB_NAME}?authSource=admin
const connectionString: string = `mongodb://root:example@localhost:27017/?authSource=admin`
const connStri = `mongodb://localhost:27017/`

/*const exceedingModel: Model<Exceeding> = model<Exceeding>('Exceeding', exceedingSchema, 'anomaly')
const intrusionModel: Model<Intrusion> = model<Intrusion>('Intrusion', intrusionSchema, 'anomaly')*/
it('MongoDB connection test', async (): Promise<void> => {
  const alarmService = supertest(app)

  try {

    await mongoose.connect(connStri)
    console.log('Connesso? ' + mongoose.connection.readyState)
    console.log(mongoose.connection.collections)
    console.log('Connected successfully to db')

    await mongoose.disconnect();
    //await DatabaseSimulator.mongoDestroy()
  } catch (error) {
    console.error('Error in test:', error)
  }


  // da vedere se usare mongoose o meno, io direi di si perche' e' piu' semplice

  // Connect to the MongoDB container
  /*    const database = mongoose.db('test')
      const collection = database.collection('example')
      await collection.insertOne({ key: 'value' })

      // Example assertion
      const result = await collection.findOne({ key: 'value' })
      console.log(result) // Should print the inserted document

      // Clean up: Close the connection
      await client.close()*/

}, 30000)
