import KafkaConsumer from '@common/infrastructure/events/KafkaConsumer'
import { KafkaOptions } from '@common/infrastructure/events/KafkaOptions'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper'
import { AxiosResponse } from 'axios'
import { KafkaMessage } from 'kafkajs'
import { alarmService } from '@/init'
import { measurementSchema } from '@/presentation/events/schemas/MeasurementSchema'

let kafkaHost: string = process.env.KAFKA_HOST!
let kafkaPort: string = process.env.KAFKA_PORT!

if (process.env.NODE_ENV == 'develop') {
  console.log('INFO: KAFKA DEVELOPMENT MODE')
  kafkaHost = process.env.KAFKA_EXTERNAL_HOST!
  kafkaPort = process.env.KAFKA_EXTERNAL_PORT!
}
const kafkaOptions: KafkaOptions = {
  clientId: 'alarmConsumer',
  brokers: [{ host: kafkaHost, port: kafkaPort }],
  groupId: 'alarmConsumer'
}

const consumer: KafkaConsumer = new KafkaConsumer(kafkaOptions)

// TODO: polling to update devices?
const res: AxiosResponse = await RequestHelper.get(`${monitoringHost}:${monitoringPort}/devices`)
if (res.status !== 200) {
  console.log('Error getting devices')
  process.exit(1)
}
const devices: any[] = res.data
const cameraIds = devices
  .filter((device: any) => device.type === 'CAMERA')
  .map((device: any) => device.id.code)
const sensorIds = devices
  .filter((device: any) => device.type === 'SENSOR')
  .map((device: any) => device.id.code)
const topics: string[] = [
  ...cameraIds.map((id: string) => `detections.${id}`),
  ...sensorIds.map((id: string) => `measurements.${id}`)
]

consumer
  .startConsumer(topics, false, (message: KafkaMessage) => {
    console.log('Message received: ', message)
    if (message.value) {
      if ('measurementId' in message.value) {
        console.log('Measurement received')
        const measurement = measurementSchema.parse(message.value)
        alarmService.isOutlier(measurement.sourceDeviceId.code, message.value)
      } else {
        console.log('Detection received')
      }
    }
  })
  .then((): void => {
    console.log('Consumer started')
  })
