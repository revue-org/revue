import { Consumer, Kafka } from 'kafkajs'
import { environmentDataController } from '@/controller/environmentData.js'
import { DeviceIdFactory } from 'domain/dist/domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceIdFactoryImpl.js'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper.js'
import { AxiosResponse } from 'axios'

const kafkaContainer: string = process.env.KAFKA_CONTAINER || 'revue-kafka'
const kafkaPort: string = process.env.KAFKA_PORT || '9092'

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

const consumers: { id: string; consumer: Consumer }[] = []

const getConsumerById = (id: string): Consumer | undefined => {
  return consumers.find((c): boolean => c.id === id)?.consumer
}

/*export const getTopics = async (): Promise<string[]> => {
  const monitoringUrl: string = `http://${monitoringHost}:${monitoringPort}`
  const topics: string[] = []
  try {
    const res: AxiosResponse = await RequestHelper.get(`${monitoringUrl}/devices/`)
    for (const device of res.data) {
      if (device._type === 'SENSOR' && device._active === true) {
        topics.push(`SENSOR_${device._id._code}`)
      }
    }
    return topics
  } catch (e) {
    throw new Error('Error while getting devices infos')
  }
}*/

console.log(process.env.NODE_ENV == "develop" ? [`localhost:9092`] : [`${kafkaContainer}:${kafkaPort}`])
export const setupConsumers = async (): Promise<void> => {
  const kafka: Kafka = new Kafka({
    clientId: 'log',
    brokers: ['revue-kafka:9092']//process.env.NODE_ENV == "develop" ? [`localhost:9092`] : [`${kafkaContainer}:${kafkaPort}`]
  })

  let topics: string[] = ["SENSOR_sen-01"]//await getTopics()
  console.log(topics)
  console.log('Subscribing to topics', topics)

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
