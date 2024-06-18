import { EventsService } from '@/application/services/EventsService'
import { Anomaly } from '@common/domain/core/Anomaly'
import { Detection } from '@common/domain/core/Detection'
import { Measurement } from '@common/domain/core/Measurement'
import { KafkaMessage } from 'kafkajs'
import KafkaConsumer from '@common/infrastructure/events/KafkaConsumer'
import KafkaProducer from '@common/infrastructure/events/KafkaProducer'
import { KafkaOptions } from '@common/infrastructure/events/KafkaOptions'
import { AxiosResponse } from 'axios'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper'
import { detectionSchema, measurementSchema } from '@/presentation/events/schemas/MessageSchemas'

export class KafkaEventsService implements EventsService {
  private measurementsConsumer: KafkaConsumer
  private detectionsConsumer: KafkaConsumer
  private anomalyProducer: KafkaProducer
  private devices: any[] = []

  constructor(kafkaOptions: KafkaOptions) {
    this.measurementsConsumer = new KafkaConsumer(kafkaOptions)
    this.detectionsConsumer = new KafkaConsumer(kafkaOptions)
    this.anomalyProducer = new KafkaProducer(kafkaOptions)
    this.getDevices()
  }

  private getDevices(): void {
    RequestHelper.get(`${monitoringHost}:${monitoringPort}/devices`).then((res: AxiosResponse) => {
      this.devices = res.data
    })
  }

  publishAnomaly(anomaly: Anomaly): void {
    this.anomalyProducer.produce('anomalies', anomaly)
  }

  subscribeToMeasurements(handler: (_measurement: Measurement) => void): void {
    const topics: string[] = this.devices
      .filter((device: any) => device.type === 'CAMERA')
      .map((device: any) => `measurements.${device.id.code}`)
    this.measurementsConsumer
      .startConsuming(topics, false, (message: KafkaMessage) => {
        if (message.value) {
          try {
            const measurement: Measurement = measurementSchema.parse(message.value)
            handler(measurement)
          } catch (e) {
            console.log('Error parsing measurement, message ignored because is not compliant to the schema')
          }
        }
      })
      .then((): void => {
        console.log('Consumer started')
      })
  }

  subscribeToDetections(handler: (_detection: Detection) => void): void {
    const topics: string[] = this.devices
      .filter((device: any) => device.type === 'SENSOR')
      .map((device: any) => `detections.${device.id.code}`)
    this.detectionsConsumer
      .startConsuming(topics, false, (message: KafkaMessage) => {
        if (message.value) {
          try {
            const detection: Detection = detectionSchema.parse(message.value)
            handler(detection)
          } catch (e) {
            console.log('Error parsing measurement, message ignored because is not compliant to the schema')
          }
        }
      })
      .then((): void => {
        console.log('Consumer started')
      })
  }
}
