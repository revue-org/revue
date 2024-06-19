/*
import { Consumer } from 'kafkajs'
import { environmentDataController } from '@/controller/environmentData.js'
import { DeviceIdFactory } from 'domain/dist/domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceIdFactoryImpl.js'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper.js'
import { AxiosResponse } from 'axios'
import kafkaManager from './utils/KafkaManager.js'

const consumer: Consumer = kafkaManager.createConsumer('logConsumer')
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()

export const setupConsumers = async (): Promise<void> => {
  await consumer.connect()
  await consumer.subscribe({ topics: await getTopics(), fromBeginning: false })

  consumer
    .run({
      eachMessage: async ({ topic, message }): Promise<void> => {
        if (message.value === null) return
        const messageValue: Buffer = message.value

        console.log('Message arrived ', messageValue.toString())
        const rawValues = JSON.parse(messageValue.toString())

        if (topic.startsWith('SENSOR')) {
          for (const rawValue of rawValues) {
            await environmentDataController.createEnvironmentData(
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

export const getTopics = async (): Promise<string[]> => {
  const monitoringUrl: string = `http://${monitoringHost}:${monitoringPort}`
  const topics: string[] = []
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
  }
}
*/
