import { Consumer, Kafka } from 'kafkajs'
import { environmentDataController } from '@/controller/environmentData.js'
import { DeviceIdFactory } from 'domain/dist/domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { MeasureConverter } from 'domain/dist/utils/MeasureConverter.js'
import { MeasureUnitConverter } from 'domain/dist/utils/MeasureUnitConverter.js'

const kafkaContainer: string = process.env.KAFKA_CONTAINER || 'revue-kafka'
const kafkaPort: string = process.env.KAFKA_PORT || '9092'

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

const consumers: { id: string; consumer: Consumer }[] = []

// a quali mi devo sottoscrivere? a tutti quelli attivi in questo momento
//gli attivi in questo momento posso ottenerli attraverso monitoring che ha l'elenco dei devices.

const getConsumerById = (id: string): Consumer | undefined => {
  return consumers.find((c): boolean => c.id === id)?.consumer
}

export const setupConsumers = async (): Promise<void> => {
  console.log('Setting up consumers')

  const kafka: Kafka = new Kafka({
    clientId: 'log',
    brokers: [`${kafkaContainer}:${kafkaPort}`]
  })

  let topics: string[] = ['SENSOR_sen-01'] // da riempire tramite monitoring
  console.log('Subscribing to topics', topics)
  console.log('Consumers:', consumers)

  let consumer: Consumer | undefined = getConsumerById('idconsumer') // TODO TO CHANGE
  if (consumer === undefined) {
    consumer = kafka.consumer({ groupId: 'idconsumer' }) // TODO TO CHANGE
    console.log('New consumer created')
  }
  await consumer.connect()
  await consumer.subscribe({ topics: topics, fromBeginning: false })
  consumers.push({ id: 'idconsumer', consumer }) // TODO TO CHANGE AND TO UNDERSTAND

  consumer
    .run({
      eachMessage: async ({ topic, message }): Promise<void> => {
        if (message.key === null || message.value === null) return
        const messageKey: Buffer = message.key
        const messageValue: Buffer = message.value

        console.log('Arrivo messaggio num: ' + JSON.parse(messageKey.toString()))
        const rawValues = JSON.parse(messageValue.toString())

        if (topic.startsWith('CAMERA')) {
          console.log('Devo salvare su detection')
          //TODO SALVATAGGIO SU TABELLA DETECTION, SEMPRE CON KAFKA E CI ARRIVANO ATTRAVERSO IL RECOGNIZING NODE
        } else if (topic.startsWith('SENSOR')) {
          console.log('Sto salvando su environmentData')
          for (const rawValue of rawValues) {
            environmentDataController.createEnvironmentData(
              deviceIdFactory.createSensorId(rawValue._sourceDeviceId._code),
              rawValue._value,
              rawValue._measure,
              rawValue._measureUnit,
              new Date(rawValue._timestamp)
            )
          }
        }
      }
    })
    .then(() => console.log('Consumer running'))
}
