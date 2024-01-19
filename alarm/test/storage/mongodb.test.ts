import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../../src/index'
import * as console from 'console'
import { DatabaseSimulator } from '../../src/utils/storage/DatabaseSimulator.js'
import { intrusionModel } from "@/controller/anomaly"; /*const exceedingModel: Model<Exceeding> = model<Exceeding>('Exceeding', exceedingSchema, 'anomaly')
const intrusionModel: Model<Intrusion> = model<Intrusion>('Intrusion', intrusionSchema, 'anomaly')*/

/*const exceedingModel: Model<Exceeding> = model<Exceeding>('Exceeding', exceedingSchema, 'anomaly')
const intrusionModel: Model<Intrusion> = model<Intrusion>('Intrusion', intrusionSchema, 'anomaly')*/

//qui da collegare il db fake, di la nei test invece nei before all mettere creazione database fake con populare e POI collegament oa supertest
let alarmService;

describe('MongoDB connection test', async (): Promise<void> => {
  beforeAll(async (): Promise<void> => {
    console.log('Sono nel before all e sto creando la simulazione del database mongo')
    await DatabaseSimulator.simulate()
    await DatabaseSimulator.createCollections()
    await DatabaseSimulator.populate()
    //alarmService = supertest(app)
  }, 30000)
  it('MongoDB connection test', async (): Promise<void> => {
    await mongoose
      .connect(DatabaseSimulator.connectionString(), { directConnection: true })
      .then(async (): Promise<void> => {
        expect(mongoose.connection.readyState).toBe(1)
      })
  }, 30000)

  afterAll(async (): Promise<void> => {
    console.log('Sono nell after all e dovrei distruggere la simulazione del database mongo')
  })
})

/*intrusionModel.createCollection().then(async function (collection): Promise<void> {
  console.log('Collection intrusion created!')
  await intrusionModel
    .create({
      deviceId: {
        type: 'CAMERA',
        code: 'poro'
      },
      timestamp: new Date(),
      intrusionObject: 'PERSON'
    })
    .catch((err): void => {
      throw err
    })

  console.log(await intrusionModel.find().orFail())
})*/


/*    const container: StartedMongoDBContainer = await new MongoDBContainer('mongo:6.0.1')
      .withEnvironment({ MONGO_INITDB_DATABASE: 'alarm' })
      .withExposedPorts(27017)
      .start()

    await mongoose
      .connect(container.getConnectionString(), { directConnection: true })
      .then(async (): Promise<void> => {
        console.log(`Connected to MongoDB test instance`)
      })*/
//container.
/*  setTimeout(async () => {
    console.log('ho aspettato 30 secondi')
    //await alarmService.get('/anomalies').expect(200)

    try {
      await mongoose.connect(connStri)
      console.log('Connesso? ' + mongoose.connection.readyState)
      console.log(mongoose.connection.collections)
      console.log('Connected successfully to db')

      await mongoose.disconnect()
      //await DatabaseSimulator.mongoDestroy()
    } catch (error) {
      console.error('Error in test:', error)
    }
  }, 30000)*/
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