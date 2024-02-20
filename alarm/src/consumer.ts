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
import { SecurityRuleService } from 'domain/dist/application/security-rule/SecurityRuleService.js'
import { SecurityRuleServiceImpl } from 'domain/dist/application/security-rule/impl/SecurityRuleServiceImpl.js'
import { DeviceType } from 'domain/dist/domain/device/core/impl/enum/DeviceType.js'
import { DeviceTypeConverter } from 'domain/dist/utils/DeviceTypeConverter.js'
import { EnvironmentDataFactory } from 'domain/dist/domain/device/factories/EnvironmentDataFactory.js'
import { EnvironmentDataFactoryImpl } from 'domain/dist/domain/device/factories/impl/EnvironmentDataFactoryImpl.js'
import { MeasureUnitConverter } from 'domain/dist/utils/MeasureUnitConverter.js' //in questo caso devo solo controllare i topic per i quali sono interessato ovvero i devices che sono attivi in questo momento e che

//in questo caso devo solo controllare i topic per i quali sono interessato ovvero i devices che sono attivi in questo momento e che
//hanno delle regole attive. Quindi devo creare dei controllori che per ogni dato che arriva ccontrolla la regola.

const consumers: { id: string; consumer: Consumer }[] = []
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()
const securityRuleService: SecurityRuleService = new SecurityRuleServiceImpl()
const environmentDataFactory: EnvironmentDataFactory = new EnvironmentDataFactoryImpl()

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

  //TODO to add an 'addAll' on the service for the rules
  await getSensorRules().then((rules: ExceedingRule[]): void => {
    rules.forEach((rule: ExceedingRule): void => {
      securityRuleService.addSecurityRule(rule)
      console.log("RULE")
      console.log(rule)
    })
  });

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
         // console.log(topic)
          ///console.log(sensorCode)
          for (const rawValue of rawValues) {
           // console.log(rawValue)
            if(
            securityRuleService.checkExceedingDetection(
              environmentDataFactory.createEnvironmentData(
                deviceIdFactory.createSensorId(rawValue._sourceDeviceId._code),
                rawValue._value,
                rawValue._measure,
                rawValue._measureUnit,
                new Date(rawValue._timestamp)
              )
            )) {
              console.log("E' stata rilevata un'eccezione")
            } else {
              console.log(environmentDataFactory.createEnvironmentData(
                deviceIdFactory.createSensorId(rawValue._sourceDeviceId._code),
                rawValue._value,
                rawValue._measure,
                rawValue._measureUnit,
                new Date(rawValue._timestamp)
              ))
              console.log("Non è stata rilevata nessuna eccezione")
            }
          }
        }
      }
    })
    .then(() => console.log('Consumer running'))
}
