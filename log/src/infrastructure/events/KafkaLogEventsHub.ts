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
    return await RequestHelper.get(`http://${deviceHost}:${devicePort}/devices?capabilities=sensor`)
      .then((res: any): string[] =>
        res.data.map((device: any): string => `measurements.${device.deviceId.value}`)
      )
      .catch((e: any): string[] => {
        console.log('Error fetching devices, error: ' + e)
        return []
      })
  }

  subscribeToMeasurements(handler: (_measurement: Measurement) => void): void {
    this.getMeasurementTopics()
      .then((topics: string[]): void => {
        this.measurementsConsumer
          .startConsuming(topics, false, (message: KafkaMessage): void => {
            if (message.value) {
              try {
                const messageValue = JSON.parse(message.value?.toString())
                messageValue.timestamp = new Date(messageValue.timestamp)
                const measurement: Measurement = MeasurementPresenter.asDomainEvent(messageValue)
                handler(measurement)
              } catch (e) {
                console.log(
                  'Error parsing measurement, message ignored because is not compliant to the schema'
                )
              }
            }
          })
          .then((): void => console.log('Measurements consumer started', topics))
      })
      .catch((_e: any): void => {
        console.log('Error getting measurements topics, retrying in 10 seconds')
        setTimeout((): void => this.subscribeToMeasurements(handler), 10000)
      })
  }

  addMeasurementTopics(topics: string[]): void {
    this.measurementsConsumer.addTopics(topics)
  }

  removeMeasurementTopics(topics: string[]): void {
    this.measurementsConsumer.removeTopics(topics)
  }

  subscribeToAnomalies(handler: (anomaly: Anomaly) => void): void {
    this.anomaliesConsumer
      .startConsuming(['anomalies'], false, (message: KafkaMessage): void => {
        if (message.value) {
          try {
            const messageValue = JSON.parse(message.value?.toString())
            messageValue.timestamp = new Date(messageValue.timestamp)
            messageValue.data.timestamp = new Date(messageValue.data.timestamp)
            const anomaly: Anomaly = AnomalyPresenter.asDomainEvent(messageValue)
            handler(anomaly)
          } catch (e) {
            console.log('Error parsing anomaly, message ignored because is not compliant to the schema')
          }
        }
      })
      .then((): void => console.log('Anomalies consumer started'))
  }

  subscribeToDevices(handler: (event: DeviceEvent) => void): void {
    this.deviceConsumer
      .startConsuming(['devices'], false, (message: KafkaMessage): void => {
        if (message.value) {
          try {
            const messageValue = JSON.parse(message.value?.toString())
            messageValue.timestamp = new Date(messageValue.timestamp)
            const event: DeviceEvent = DevicePresenter.asDomainEvent(messageValue)
            handler(event)
          } catch (e) {
            console.log('Error parsing device event, message ignored because is not compliant to the schema')
          }
        }
      })
      .then((): void => console.log('Devices event consumer started'))
  }
}
