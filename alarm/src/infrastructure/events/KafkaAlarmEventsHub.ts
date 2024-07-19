import { AlarmEventsHub } from '@/application/services/AlarmEventsHub'
import { Anomaly, Detection, DeviceEvent, Measurement } from '@common/domain/core'
import { KafkaMessage } from 'kafkajs'
import KafkaConsumer from '@common/infrastructure/events/KafkaConsumer.js'
import KafkaProducer from '@common/infrastructure/events/KafkaProducer.js'
import { KafkaOptions } from '@common/infrastructure/events/KafkaOptions.js'
import RequestHelper, { deviceHost, devicePort } from '@utils/RequestHelper.js'
import { AnomalyPresenter } from '@presentation/AnomalyPresenter.js'
import { DetectionPresenter } from '@presentation/DetectionPresenter.js'
import { MeasurementPresenter } from '@presentation/MeasurementPresenter.js'
import { DevicePresenter } from '@presentation/DevicePresenter.js'
import { AnomalySchema } from '@common/presentation/schemas/AnomalySchema'

export class KafkaAlarmEventsHub implements AlarmEventsHub {
  private measurementsConsumer: KafkaConsumer
  private detectionsConsumer: KafkaConsumer
  private deviceConsumer: KafkaConsumer
  private anomalyProducer: KafkaProducer

  constructor(kafkaOptions: KafkaOptions) {
    const measurementsOptions = { ...kafkaOptions, groupId: 'alarm-measurements' }
    const detectionsOptions = { ...kafkaOptions, groupId: 'alarm-detections' }
    const deviceOptions = { ...kafkaOptions, groupId: 'alarm-devices' }
    this.measurementsConsumer = new KafkaConsumer(measurementsOptions)
    this.detectionsConsumer = new KafkaConsumer(detectionsOptions)
    this.deviceConsumer = new KafkaConsumer(deviceOptions)
    this.anomalyProducer = new KafkaProducer(kafkaOptions)
  }

  private async getMeasurementTopics(): Promise<string[]> {
    return await RequestHelper.get(`http://${deviceHost}:${devicePort}/devices?capabilities=sensor`)
      .then((res: any): string[] => res.data.map((device: any): string => `measurements.${device.id}`))
      .catch((): string[] => {
        console.log('Error getting measurement topics')
        return []
      })
  }

  private async getDetectionsTopics(): Promise<string[]> {
    return await RequestHelper.get(`http://${deviceHost}:${devicePort}/devices?capabilities=video`)
      .then((res: any): string[] => res.data.map((device: any): string => `detections.${device.id}`))
      .catch((): string[] => {
        console.log('Error getting detection topics')
        return []
      })
  }

  publishAnomaly(anomaly: Anomaly): void {
    const anomalyMessage: AnomalySchema = AnomalyPresenter.asMessage(anomaly)
    this.anomalyProducer.produce('anomalies', anomalyMessage)
  }

  subscribeToMeasurements(handler: (_measurement: Measurement) => void): void {
    this.getMeasurementTopics().then((topics: string[]): void => {
      this.measurementsConsumer
        .startConsuming(topics, false, (message: KafkaMessage): void => {
          if (message.value) {
            try {
              const messageValue = JSON.parse(message.value?.toString())
              messageValue.timestamp = new Date(messageValue.timestamp)
              const measurement: Measurement = MeasurementPresenter.asDomainEvent(messageValue)
              handler(measurement)
            } catch (e) {
              console.log('Error parsing measurement, message ignored because is not compliant to the schema')
            }
          }
        })
        .then((): void => console.log('Measurements consumer started'))
    })
  }

  public addMeasurementTopics(topics: string[]): void {
    this.measurementsConsumer.addTopics(topics)
  }

  public removeMeasurementTopics(topics: string[]): void {
    this.measurementsConsumer.removeTopics(topics)
  }

  subscribeToDetections(handler: (_detection: Detection) => void): void {
    this.getDetectionsTopics().then((topics: string[]): void => {
      this.detectionsConsumer
        .startConsuming(topics, false, (message: KafkaMessage): void => {
          if (message.value) {
            try {
              const messageValue = JSON.parse(message.value?.toString())
              messageValue.timestamp = new Date(messageValue.timestamp)
              const detection: Detection = DetectionPresenter.asDomainEvent(messageValue)
              handler(detection)
            } catch (e) {
              console.log('Error parsing detections, message ignored because is not compliant to the schema')
            }
          }
        })
        .then((): void => console.log('Detection consumer started'))
    })
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
      .then((): void => console.log('Device consumer started'))
  }
}
