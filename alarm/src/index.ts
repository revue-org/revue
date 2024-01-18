import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import { anomalyRouter } from './routes/anomaly.js'
import { notificationRouter } from './routes/notification.js'
import { recognizingNodeRouter } from './routes/recognizingNode.js'
import { securityRuleRouter } from './routes/securityRule.js'
import { jwtManager } from './utils/JWTManager.js'
import { DatabaseSimulator } from './utils/storage/DatabaseSimulator.js'
import { MongoDBContainer } from '@testcontainers/mongodb'
import { intrusionModel } from './controller/anomaly.js'
import { ObjectClassConverter } from 'domain/dist/utils/ObjectClassConverter'
import { ObjectClass } from 'domain/dist/domain/security-rule/core/impl/enum/ObjectClass'
import { intrusionSchema } from "domain/dist/storage/anomaly/schemas/IntrusionSchema";

config()

export const app: Express = express()

app.use(express.json())

const PORT: number = Number(process.env.PORT) || 4000

app.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token === process.env.DEV_API_KEY) return next()
  if (token === undefined) return res.status(403).send({ error: 'No authentication token' })
  else {
    console.log('Authentication token: ' + token)
    jwtManager.authenticate(req, res, next)
  }
})

//app.use(indexRouter)
app.use('/notifications', notificationRouter)
app.use('/anomalies', anomalyRouter)
app.use('/recognizing-nodes', recognizingNodeRouter)
app.use('/security-rules', securityRuleRouter)

const mongoConnect = async (): Promise<void> => {
  const connectionString: string = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
  await mongoose.connect(connectionString)
}

if (process.env.NODE_ENV === 'test') {
  console.log('CI PASSO')
  DatabaseSimulator.mongoSimulation().then(async (): Promise<void> => {
    console.log(`Connected to MongoDB test instance`)
    /* await mongoConnect();
     await DatabaseSimulator.mongoPopulate();*/
    //qui da collegare il db fake, di la nei test invece nei before all mettere creazione database fake con populare e POI collegament oa supertest
  })
} else {
  app.listen(PORT, async (): Promise<void> => {
    console.log(`Alarm server listening on http://${process.env.DB_HOST}:${PORT}`)
    /*    mongoConnect().then(async (): Promise<void> => {
          console.log(
            `Connected to MongoDB database ${process.env.DB_NAME} at ${process.env.DB_HOST}:${process.env.DB_PORT}`
          )
        })*/
    //.catch((e) => console.log(e))

    const container = await new MongoDBContainer('mongo:6.0.1')
      .withEnvironment({ MONGO_INITDB_DATABASE: 'alarm' })
      // .withEnvironment({ MONGO_INITDB_DISABLE_AUTH: 'yes' })
      .withExposedPorts(27017)
      //.withWaitStrategy(Wait.forLogMessage('waiting for connections on port 27017', 1))
      .start()

    await mongoose
      .connect(container.getConnectionString(), { directConnection: true })
      .then(async (): Promise<void> => {
        console.log(`Connected to MongoDB test instance`)
      })

    intrusionModel.createCollection().then(async function (collection): Promise<void> {
      console.log('Collection intrusion created!')
      await intrusionModel
        .create({
          deviceId: {
            type: "CAMERA",
            code: "poro"
          },
          timestamp: new Date(),
          intrusionObject: "PERSON"
        })
        .catch((err): void => {
          throw err
        })

      console.log(await intrusionModel.find().orFail())
    })
  })
}
