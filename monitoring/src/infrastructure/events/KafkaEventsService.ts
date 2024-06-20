import { EventsHub } from '@/application/services/EventsHub'
import { Measurement } from '@common/domain/core'
import { KafkaMessage } from 'kafkajs'
import KafkaConsumer from '@common/infrastructure/events/KafkaConsumer.js'
import { KafkaOptions } from '@common/infrastructure/events/KafkaOptions'
import { MeasurementsAdapter } from '@presentation/events/MessageAdapters.js'

export class KafkaEventsService implements EventsHub {
  private measurementsConsumer: KafkaConsumer

  constructor(kafkaOptions: KafkaOptions) {
    this.measurementsConsumer = new KafkaConsumer(kafkaOptions)
  }

  private async getTopics(): Promise<string[]> {
    //TODO: Pass from the device microservice to ask which are the devices
    // with certain capabilities, in this case the SENSING capability (grafico nel quaderno)

    //.map(device => `measurements.${device.id.value}`)
    return [];
  }

  async subscribeToMeasurements(handler: (_measurement: Measurement) => void): Promise<void> {
    this.measurementsConsumer
      .startConsuming(await this.getTopics(), false, (message: KafkaMessage): void => {
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
}
