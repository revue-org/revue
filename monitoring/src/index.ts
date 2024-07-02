import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { jwtManager } from '@utils/JWTManager.js'
import http, { Server as HttpServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { KafkaMonitoringEventsHub } from '@/infrastructure/events/kafka/KafkaMonitoringEventsHub.js'
import { SocketMonitoringEventsHub } from '@/infrastructure/events/socket/SocketMonitoringEventsHub.js'
import { MonitoringEventsHub } from '@/application/services/MonitoringEventsHub'
import { MonitoringEventsHubImpl } from '@/infrastructure/events/MonitoringEventsHubImpl.js'
import { getBrokersFromEnv, KafkaBroker, KafkaOptions } from '@common/infrastructure/events/KafkaOptions.js'
import { MonitoringService } from '@/application/services/MonitoringService'
import { MonitoringServiceImpl } from '@/application/services/impl/MonitoringServiceImpl.js'

config({ path: process.cwd() + '/../.env' })

export const app: Express = express()
app.use(cors())

const server: HttpServer = http.createServer(app)

const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: '*'
  }
})

/*io.use(async function (socket, next): Promise<void> {
  //TODO NB, to test
  if (socket.handshake.query && socket.handshake.query.token) {
    console.log('middleware socket validation: ' + socket.handshake.query.token)
    if (
      await jwtManager.verify(socket.handshake.query.token as string, async (err: any): Promise<boolean> => {
        return !err
      })
    )
      next()
  } else {
    next(new Error('Authentication error'))
  }
})*/

app.use(express.json())

const PORT: number = Number(process.env.MONITORING_PORT) || 4000

app.use((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token: string = (authHeader && authHeader.split(' ')[1]) || ''
  if (token === process.env.DEV_API_KEY) return next()
  if (token === undefined || token === '') return res.status(403).send({ error: 'No authentication token' })
  else {
    console.log('Authentication token: ' + token)
    jwtManager.authenticate(req, res, next)
  }
})

const brokers: KafkaBroker[] = getBrokersFromEnv()

const kafkaOptions: KafkaOptions = {
  clientId: 'monitoring',
  brokers: brokers,
  groupId: 'monitoringConsumer'
}

const kafkaMonitoring: KafkaMonitoringEventsHub = new KafkaMonitoringEventsHub(kafkaOptions)
const socketMonitoring: SocketMonitoringEventsHub = new SocketMonitoringEventsHub(io)
const monitoringEventsHub: MonitoringEventsHub = new MonitoringEventsHubImpl(
  kafkaMonitoring,
  socketMonitoring
)
const monitoringService: MonitoringService = new MonitoringServiceImpl(monitoringEventsHub)

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, async (): Promise<void> => {
    console.log(`Monitoring server listening on ${process.env.MONITORING_PORT}`)
    // monitoringEventsHub.subscribeToMeasurements((measurement: Measurement): void => {
    //   console.log('Measurement received: ' + JSON.stringify(measurement))
    //   monitoringService.sendMeasurementToUser(measurement)
    // })
    // monitoringEventsHub.subscribeToDevices((event): void => {
    // })
    //TODO: here or where we want we have to trigger the broker client to start consuming and sending to the user the measurements
  })
}
