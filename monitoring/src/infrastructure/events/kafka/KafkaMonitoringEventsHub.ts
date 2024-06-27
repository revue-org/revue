import { DeviceEvent, Measurement } from '@common/domain/core'
import { KafkaMessage } from 'kafkajs'
import KafkaConsumer from '@common/infrastructure/events/KafkaConsumer.js'
import { KafkaOptions } from '@common/infrastructure/events/KafkaOptions'
import { MeasurementsAdapter } from '@presentation/events/adapters/MeasurementAdapter.js'
import RequestHelper, { deviceHost, devicePort } from '@utils/RequestHelper.js'
import { DevicesAdapter } from '@presentation/events/adapters/DeviceAdapter.js'

export class KafkaMonitoringEventsHub {
  private readonly measurementsConsumer: KafkaConsumer
  private readonly deviceConsumer: KafkaConsumer

  constructor(kafkaOptions: KafkaOptions) {
    const measurementsOptions = { ...kafkaOptions, groupId: 'monitoring-measurements' }
    const deviceOptions = { ...kafkaOptions, groupId: 'monitoring-devices' }
    this.measurementsConsumer = new KafkaConsumer(measurementsOptions)
    this.deviceConsumer = new KafkaConsumer(deviceOptions)
  }

  private async getTopics(): Promise<string[]> {
    return await RequestHelper.get(`http://${deviceHost}:${devicePort}?capabilities=sensor`)
      .then((res: any): string[] =>
        res.data.map((device: any): string => `measurements.${device.deviceId.value}`)
      )
      .catch((e: any): string[] => {
        console.log('Error getting topics from device service')
        setTimeout(() => this.getTopics(), 10000)
        return []
      })
  }

  subscribeToMeasurements(handler: (_measurement: Measurement) => void): void {
    this.getTopics().then((topics: string[]): void => {
      console.log(topics)
      this.measurementsConsumer
        .startConsuming(topics, false, (message: KafkaMessage): void => {
          if (message.value) {
            try {
              console.log('Message received')
              const messageValue = JSON.parse(message.value?.toString())
              messageValue.timestamp = new Date(messageValue.timestamp)
              const measurement: Measurement = MeasurementsAdapter.asDomainEvent(messageValue)
              handler(measurement)
            } catch (e) {
              console.log('Error parsing measurement, message ignored because is not compliant to the schema')
              console.log(e)
            }
          }
        })
        .then((): void => console.log('Measurements consumer started'))
    })
  }

  addMeasurementTopics(topics: string[]): void {
    this.measurementsConsumer.addTopics(topics)
  }

  subscribeToDevices(handler: (event: DeviceEvent) => void): void {
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
        console.log('Device event consumer started')
      })
  }
}
