import { AlarmEventsHub } from '@/application/services/AlarmEventsHub'
import { Anomaly, Detection, Measurement } from '@common/domain/core'
import { KafkaMessage } from 'kafkajs'
import KafkaConsumer from '@common/infrastructure/events/KafkaConsumer.js'
import KafkaProducer from '@common/infrastructure/events/KafkaProducer.js'
import { KafkaOptions } from '@common/infrastructure/events/KafkaOptions'
import RequestHelper, { deviceHost, devicePort } from '@utils/RequestHelper.js'
import { AnomalyMessage } from '@presentation/events/schemas/AnomalySchema'
import { AnomaliesAdapter } from '@presentation/events/adapters/AnomalyAdapter'
import { DetectionsAdapter } from '@presentation/events/adapters/DetectionAdapter'
import { MeasurementsAdapter } from '@presentation/events/adapters/MeasurementAdapter'

export class KafkaAlarmEventsHub implements AlarmEventsHub {
  private measurementsConsumer: KafkaConsumer
  private detectionsConsumer: KafkaConsumer
  private anomalyProducer: KafkaProducer

  constructor(kafkaOptions: KafkaOptions) {
    this.measurementsConsumer = new KafkaConsumer(kafkaOptions)
    this.detectionsConsumer = new KafkaConsumer(kafkaOptions)
    this.anomalyProducer = new KafkaProducer(kafkaOptions)
  }

  private async getMeasurementTopics(): Promise<string[]> {
    return await RequestHelper.get(`http://${deviceHost}:${devicePort}?capabilities=sensor`).then(
      (res: any): string[] => res.data.map((device: any): string => `measurements.${device.id}`)
    )
  }

  private async getDetectionsTopics(): Promise<string[]> {
    return await RequestHelper.get(`http://${deviceHost}:${devicePort}?capabilities=video`).then(
      (res: any): string[] => res.data.map((device: any): string => `detections.${device.id}`)
    )
  }

  publishAnomaly(anomaly: Anomaly): void {
    const anomalyMessage: AnomalyMessage = AnomaliesAdapter.asMessage(anomaly)
    this.anomalyProducer.produce('anomalies', anomalyMessage)
  }

  async subscribeToMeasurements(handler: (_measurement: Measurement) => void): Promise<void> {
    this.measurementsConsumer
      .startConsuming(await this.getMeasurementTopics(), false, (message: KafkaMessage): void => {
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

  async subscribeToDetections(handler: (_detection: Detection) => void): Promise<void> {
    this.detectionsConsumer
      .startConsuming(await this.getDetectionsTopics(), false, (message: KafkaMessage): void => {
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
