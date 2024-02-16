import { Consumer, Kafka } from 'kafkajs'
import { securityRuleManager } from '@/controller/securityRule.js'
import { DeviceIdFactory } from 'domain/dist/domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceIdFactoryImpl.js'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper.js'
import { AxiosResponse } from 'axios'
import { ExceedingRule, IntrusionRule } from "domain/dist/domain/security-rule/core";

//in questo caso devo solo controllare i topic per i quali sono interessato ovvero i devices che sono attivi in questo momento e che
//hanno delle regole attive. Quindi devo creare dei controllori che per ogni dato che arriva ccontrolla la regola.

const consumers: { id: string; consumer: Consumer }[] = []

const getConsumerById = (id: string): Consumer | undefined => {
  return consumers.find((c): boolean => c.id === id)?.consumer
}



export const getTopics = async (): Promise<string[]> => {
  const monitoringUrl: string = `http://${monitoringHost}:${monitoringPort}`
  const topics: string[] = []
  const getCapturingDevices = async (): Promise<string[]> => {
    const capturingDevices = [];
    try {
      const res: AxiosResponse = await RequestHelper.get(`${monitoringUrl}/devices/`)
      for (const device of res.data) {
        if (device.isCapturing === true) {
          capturingDevices.push(device)
        }
      }
      return capturingDevices;
    } catch (e) {
      throw new Error('Error while getting devices infos')
    }
  }

  const capturingDevices = await getCapturingDevices()
  console.log(capturingDevices)

  const getSensorTopics = async (): Promise<ExceedingRule[]> => {
    return securityRuleManager.getExceedingRules()
  }

  console.log(await getSensorTopics())

  const getCameraTopics = async (): Promise<IntrusionRule[]> => {
    return securityRuleManager.getIntrusionRules()
  }

  console.log(await getCameraTopics())
  /*
  * [
  {
    _id: new ObjectId('65b527590fa38e9a5422537c'),
    deviceId: { type: 'SENSOR', code: 'sen-01' },
    creatorId: new ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'),
    description: 'Exceeding rule description',
    minValue: 0,
    maxValue: 25,
    measure: 'TEMPERATURE',
    contacts: [ [Object], [Object] ],
    from: 2020-01-01T01:00:00.000Z,
    to: 2030-01-01T05:00:00.000Z,
    __v: 0
  }
]
* */

  return [""]

/*  const monitoringUrl: string = `http://${monitoringHost}:${monitoringPort}`

  try {
    const res: AxiosResponse = await RequestHelper.get(`${monitoringUrl}/devices/`)
    for (const device of res.data) {
      if (device._id.type === 'SENSOR' && device.isCapturing === true) {
        topics.push(`SENSOR_${device._id.code}`)
      }
    }
    return topics
  } catch (e) {
    throw new Error('Error while getting devices infos')
  }*/
}
console.log(await getTopics())


let kafkaContainer: string = process.env.KAFKA_CONTAINER || 'revue-kafka'
let kafkaPort: string = process.env.KAFKA_PORT || '9092'

if (process.env.NODE_ENV == 'develop') {
  console.log('INFO: SETTING UP KAFKA FOR DEVELOPMENT')
  kafkaContainer = process.env.KAFKA_EXTERNAL_HOST || 'localhost'
  kafkaPort = process.env.KAFKA_EXTERNAL_PORT || '9094'
}

export const setupConsumers = async (): Promise<void> => {
  const kafka: Kafka = new Kafka({
    clientId: 'alarm',
    brokers: [`${kafkaContainer}:${kafkaPort}`]
  })

  let topics: string[] = await getTopics()
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
/*          for (const rawValue of rawValues) {
            await environmentDataController.createEnvironmentData(
              deviceIdFactory.createSensorId(rawValue._sourceDeviceId._code),
              rawValue._value,
              rawValue._measure,
              rawValue._measureUnit,
              new Date(rawValue._timestamp)
            )
          }*/
        }
      }
    })
    .then(() => console.log('Consumer running'))
}
