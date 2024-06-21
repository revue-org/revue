import { AlarmEventsHub } from '@/application/services/AlarmEventsHub'
import { Anomaly, Detection, Measurement } from '@common/domain/core'
import { KafkaMessage } from 'kafkajs'
import KafkaConsumer from '@common/infrastructure/events/KafkaConsumer.js'
import KafkaProducer from '@common/infrastructure/events/KafkaProducer.js'
import { KafkaOptions } from '@common/infrastructure/events/KafkaOptions'
import { AxiosResponse } from 'axios'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper.js'
import { AnomalyMessage } from '@presentation/events/schemas/AnomalySchema'
import { AnomaliesAdapter } from '@presentation/events/adapters/AnomalyAdapter'
import { DetectionsAdapter } from '@presentation/events/adapters/DetectionAdapter'
import { MeasurementsAdapter } from '@presentation/events/adapters/MeasurementAdapter'

export class KafkaAlarmEventsService implements AlarmEventsHub {
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
    const anomalyMessage: AnomalyMessage = AnomaliesAdapter.asMessage(anomaly)
    this.anomalyProducer.produce('anomalies', anomalyMessage)
  }

  subscribeToMeasurements(handler: (_measurement: Measurement) => void): void {
    const topics: string[] = this.devices
      .filter((device: any) => device.type === 'CAMERA')
      .map((device: any) => `measurements.${device.id.code}`)
    this.measurementsConsumer
      .startConsuming(topics, false, (message: KafkaMessage) => {
        if (message.value) {
          try {
            const measurement: Measurement = MeasurementsAdapter.asDomainEvent(message.value)
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
            const detection: Detection = DetectionsAdapter.asDomainEvent(message.value)
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
