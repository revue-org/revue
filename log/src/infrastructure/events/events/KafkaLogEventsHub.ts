import { LogEventsHub } from '@/application/services/LogEventsHub'
import { Anomaly, DeviceEvent, Measurement } from '@common/domain/core'
import { KafkaMessage } from 'kafkajs'
import KafkaConsumer from '@common/infrastructure/events/KafkaConsumer.js'
import { KafkaOptions } from '@common/infrastructure/events/KafkaOptions'
import { MeasurementsAdapter } from '@presentation/events/adapters/MeasurementAdapter.js'
import RequestHelper, { deviceHost, devicePort } from '@utils/RequestHelper.js'
import { AnomaliesAdapter } from '@presentation/events/adapters/AnomalyAdapter.js'
import { DevicesAdapter } from '@presentation/events/adapters/DeviceAdapter.js'

export class KafkaLogEventsHub implements LogEventsHub {
  private measurementsConsumer: KafkaConsumer
  private anomaliesConsumer: KafkaConsumer
  private deviceConsumer: KafkaConsumer

  constructor(kafkaOptions: KafkaOptions) {
    this.measurementsConsumer = new KafkaConsumer(kafkaOptions)
    this.anomaliesConsumer = new KafkaConsumer(kafkaOptions)
    this.deviceConsumer = new KafkaConsumer(kafkaOptions)
  }

  private async getMeasurementTopics(): Promise<string[]> {
    return await RequestHelper.get(`http://${deviceHost}:${devicePort}?capabilities=sensor`).then(
      (res: any): string[] => res.data.map((device: any): string => `measurements.${device.id}`)
    )
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

  async addMeasurementTopics(topics: string[]): Promise<void> {
    this.measurementsConsumer.addTopics(topics)
  }

  async subscribeToAnomalies(handler: (anomaly: Anomaly) => void): Promise<void> {
    this.anomaliesConsumer
      .startConsuming(['anomalies'], false, (message: KafkaMessage): void => {
        if (message.value) {
          try {
            const anomaly: Anomaly = AnomaliesAdapter.asDomainEvent(message.value)
            handler(anomaly)
          } catch (e) {
            console.log('Error parsing anomaly, message ignored because is not compliant to the schema')
          }
        }
      })
      .then((): void => {
        console.log('Consumer started')
      })
  }

  async subscribeToDevices(handler: (event: DeviceEvent) => void): Promise<void> {
    this.deviceConsumer
      .startConsuming(['devices'], false, (message: KafkaMessage): void => {
        if (message.value) {
          try {
            const event: DeviceEvent = DevicesAdapter.asDomainEvent(message.value)
            handler(event)
          } catch (e) {
            console.log('Error parsing anomaly, message ignored because is not compliant to the schema')
          }
        }
      })
      .then((): void => {
        console.log('Consumer started')
      })
  }
}
