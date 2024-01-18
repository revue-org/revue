import { it } from 'vitest'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { app } from '../../src/index'
import * as console from 'console'
import { MongoDBContainer, StartedMongoDBContainer } from "@testcontainers/mongodb";

//${process.env.DB_NAME}?authSource=admin
const connectionString: string = `mongodb://root:example@localhost:27017/?authSource=admin`
const connStri = `mongodb://localhost:27017/`

/*const exceedingModel: Model<Exceeding> = model<Exceeding>('Exceeding', exceedingSchema, 'anomaly')
const intrusionModel: Model<Intrusion> = model<Intrusion>('Intrusion', intrusionSchema, 'anomaly')*/
it('MongoDB connection test', async (): Promise<void> => {
  const alarmService = supertest(app)

  const container: StartedMongoDBContainer = await new MongoDBContainer()
    .withExposedPorts(27017)

    //.withWaitStrategy(Wait.forLogMessage('waiting for connections on port 27017', 1))
    .start()

  container.h(Wait.forLogMessage('waiting for connections on port 27017', 1))

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
}, 50000)
