import { LogEventsHub } from '@/application/services/LogEventsHub'
import { Anomaly, DeviceEvent, Measurement } from '@common/domain/core'
import { KafkaMessage } from 'kafkajs'
import KafkaConsumer from '@common/infrastructure/events/KafkaConsumer.js'
import { KafkaOptions } from '@common/infrastructure/events/KafkaOptions'
import { MeasurementPresenter } from '@common/presentation/MeasurementPresenter.js'
import RequestHelper, { deviceHost, devicePort } from '@common/utils/RequestHelper.js'
import { AnomalyPresenter } from '@common/presentation/AnomalyPresenter.js'
import { DevicePresenter } from '@common/presentation/DevicePresenter.js'

export class KafkaLogEventsHub implements LogEventsHub {
  private measurementsConsumer: KafkaConsumer
  private anomaliesConsumer: KafkaConsumer
  private deviceConsumer: KafkaConsumer

  constructor(kafkaOptions: KafkaOptions) {
    const measurementsOptions = { ...kafkaOptions, groupId: 'log-measurements' }
    const anomaliesOptions = { ...kafkaOptions, groupId: 'log-anomalies' }
    const deviceOptions = { ...kafkaOptions, groupId: 'log-devices' }
    this.measurementsConsumer = new KafkaConsumer(measurementsOptions)
    this.anomaliesConsumer = new KafkaConsumer(anomaliesOptions)
    this.deviceConsumer = new KafkaConsumer(deviceOptions)
  }

  private async getMeasurementTopics(): Promise<string[]> {
    return await RequestHelper.get(`http://${deviceHost}:${devicePort}?capabilities=sensor`).then(
      (res: any): string[] => res.data.map((device: any): string => `measurements.${device.id}`)
    )
  }

  subscribeToMeasurements(handler: (_measurement: Measurement) => void): void {
    this.getMeasurementTopics().then((topics: string[]): void => {
      this.measurementsConsumer
        .startConsuming(topics, false, (message: KafkaMessage): void => {
          if (message.value) {
            try {
              const measurement: Measurement = MeasurementPresenter.asDomainEvent(message.value)
              handler(measurement)
            } catch (e) {
              console.log('Error parsing measurement, message ignored because is not compliant to the schema')
            }
          }
        })
        .then((): void => console.log('Consumer started'))
    })
  }

  addMeasurementTopics(topics: string[]): void {
    this.measurementsConsumer.addTopics(topics)
  }

  subscribeToAnomalies(handler: (anomaly: Anomaly) => void): void {
    this.anomaliesConsumer
      .startConsuming(['anomalies'], false, (message: KafkaMessage): void => {
        if (message.value) {
          try {
            const anomaly: Anomaly = AnomalyPresenter.asDomainEvent(message.value)
            handler(anomaly)
          } catch (e) {
            console.log('Error parsing anomaly, message ignored because is not compliant to the schema')
          }
        }
      })
      .then((): void => console.log('Consumer started'))
  }

  subscribeToDevices(handler: (event: DeviceEvent) => void): void {
    this.deviceConsumer
      .startConsuming(['devices'], false, (message: KafkaMessage): void => {
        if (message.value) {
          try {
            const event: DeviceEvent = DevicePresenter.asDomainEvent(message.value)
            handler(event)
          } catch (e) {
            console.log('Error parsing anomaly, message ignored because is not compliant to the schema')
          }
        }
      })
      .then((): void => console.log('Consumer started'))
  }
}
