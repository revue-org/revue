import { Consumer, Kafka } from 'kafkajs'
import { securityRuleManager } from '@/controller/securityRule.js'
import { DeviceIdFactory } from 'domain/dist/domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceFactory } from 'domain/dist/domain/device/factories/DeviceFactory.js'
import { DeviceFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceFactoryImpl.js'
import { ResolutionFactory } from 'domain/dist/domain/device/factories/ResolutionFactory.js'
import { ResolutionFactoryImpl } from 'domain/dist/domain/device/factories/impl/ResolutionFactoryImpl.js'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper.js'
import { AxiosResponse } from 'axios'
import { ExceedingRule } from 'domain/dist/domain/security-rule/core/ExceedingRule.js'
import { IntrusionRule } from 'domain/dist/domain/security-rule/core/IntrusionRule.js'
import { Device } from 'domain/dist/domain/device/core/Device.js'
import { DeviceType } from 'domain/dist/domain/device/core/impl/enum/DeviceType.js'
import { DeviceTypeConverter } from 'domain/dist/utils/DeviceTypeConverter.js'
import * as console from "console";

//in questo caso devo solo controllare i topic per i quali sono interessato ovvero i devices che sono attivi in questo momento e che
//hanno delle regole attive. Quindi devo creare dei controllori che per ogni dato che arriva ccontrolla la regola.

const consumers: { id: string; consumer: Consumer }[] = []
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()

const getConsumerById = (id: string): Consumer | undefined => {
  return consumers.find((c): boolean => c.id === id)?.consumer
}

export const getTopics = async (): Promise<string[]> => {
  const topics: string[] = []

  const capturingDevices: Device[] = await getCapturingDevices()
  const sensorRules: ExceedingRule[] = await getSensorRules()
  const cameraRules: IntrusionRule[] = await getCameraRules()

  capturingDevices.forEach((device: Device): void => {
    switch (device.deviceId.type) {
      case DeviceType.SENSOR:
        sensorRules.forEach((rule: ExceedingRule): void => {
          console.log(rule)
          if (rule.deviceId.code === device.deviceId.code) {
            topics.push(`SENSOR_${device.deviceId.code}`)
          }
        })
        break
      case DeviceType.CAMERA:
        cameraRules.forEach((rule: IntrusionRule): void => {
          if (rule.deviceId.code === device.deviceId.code) {
            topics.push(`CAMERA_${device.deviceId.code}`)
          }
        })
        break
    }
  })

  return topics
}

const getCapturingDevices = async (): Promise<Device[]> => {
  const monitoringUrl: string = `http://${monitoringHost}:${monitoringPort}`
  const capturingDevices: Device[] = []
  try {
    const res: AxiosResponse = await RequestHelper.get(`${monitoringUrl}/devices/capturing`)
    for (const device of res.data) {
      switch (DeviceTypeConverter.convertToDeviceType(device._id.type)) {
        case DeviceType.SENSOR:
          capturingDevices.push(
            deviceFactory.createSensor(
              deviceIdFactory.createSensorId(device._id.code),
              device.isCapturing,
              device.ipAddress,
              device.intervalMillis,
              device.measures
            )
          )
          break
        case DeviceType.CAMERA:
          capturingDevices.push(
            deviceFactory.createCamera(
              deviceIdFactory.createCameraId(device._id.code),
              device.isCapturing,
              device.ipAddress,
              resolutionFactory.createResolution(device.resolution.width, device.resolution.height)
            )
          )
          break
      }
    }
    return capturingDevices
  } catch (e) {
    throw new Error('Error while getting devices infos')
  }
}

const getSensorRules = async (): Promise<ExceedingRule[]> => {
  return securityRuleManager.getExceedingRules()
}

const getCameraRules = async (): Promise<IntrusionRule[]> => {
  return securityRuleManager.getIntrusionRules()
}

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

  const sensorRules = await getSensorRules()


  consumer
    .run({
      eachMessage: async ({ topic, message }): Promise<void> => {
        if (message.key === null || message.value === null) return
        const messageKey: Buffer = message.key
        const messageValue: Buffer = message.value

        console.log('Arrivo messaggio num: ' + JSON.parse(messageKey.toString()))
        const rawValues = JSON.parse(messageValue.toString())

        if (topic.startsWith('CAMERA')) {
          //TODO to check the intrusion object and to create the anomaly in case of intrusion
          console.log('Devo controllare sulle intrusioni')
        } else if (topic.startsWith('SENSOR')) {
          //TODO to check the measure and the value and to create the anomaly in case of exceeding
          console.log('Devo controllare sulle eccezioni')
          const sensorCode: string = topic.split('_')[1]
          console.log(topic)
          console.log(sensorCode)
          for (const rawValue of rawValues) {
            sensorRules.forEach((rule: ExceedingRule): void => {

              if(rule.deviceId.code === sensorCode){
                console.log('VALORE ARRIVATO:')
                console.log(rawValue._value)
                console.log(rawValue._measure)
                console.log(rawValue._timestamp)

                console.log('REGOLA DA CONTROLLARE:')
                console.log(rule.min)
                console.log(rule.max)
                console.log(rule.contactsToNotify)
                console.log(rule.measure)
                console.log(rule.from)
                console.log(rule.to)

                console.log('\n\n')
              }

            })

          }
        }
      }
    })
    .then(() => console.log('Consumer running'))
}
