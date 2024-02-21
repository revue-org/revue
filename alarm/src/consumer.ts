import { Consumer } from 'kafkajs'
import { AxiosResponse } from 'axios'
import { securityRuleManager } from '@/controller/securityRule.js'
import { DeviceIdFactory } from 'domain/dist/domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceFactory } from 'domain/dist/domain/device/factories/DeviceFactory.js'
import { DeviceFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceFactoryImpl.js'
import { ResolutionFactory } from 'domain/dist/domain/device/factories/ResolutionFactory.js'
import { ResolutionFactoryImpl } from 'domain/dist/domain/device/factories/impl/ResolutionFactoryImpl.js'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper.js'
import { ExceedingRule } from 'domain/dist/domain/security-rule/core/ExceedingRule.js'
import { IntrusionRule } from 'domain/dist/domain/security-rule/core/IntrusionRule.js'
import { Device } from 'domain/dist/domain/device/core/Device.js'
import { SecurityRuleService } from 'domain/dist/application/security-rule/SecurityRuleService.js'
import { SecurityRuleServiceImpl } from 'domain/dist/application/security-rule/impl/SecurityRuleServiceImpl.js'
import { DeviceType } from 'domain/dist/domain/device/core/impl/enum/DeviceType.js'
import { DeviceTypeConverter } from 'domain/dist/utils/DeviceTypeConverter.js'
import { EnvironmentDataFactory } from 'domain/dist/domain/device/factories/EnvironmentDataFactory.js'
import { EnvironmentDataFactoryImpl } from 'domain/dist/domain/device/factories/impl/EnvironmentDataFactoryImpl.js'
import kafkaManager from './utils/KafkaManager.js'
import { afterEach } from "vitest";

const consumer: Consumer = kafkaManager.createConsumer('alarmConsumer')
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()
const securityRuleService: SecurityRuleService = new SecurityRuleServiceImpl()
const environmentDataFactory: EnvironmentDataFactory = new EnvironmentDataFactoryImpl()

export const setupConsumer = async (): Promise<void> => {
  await consumer.connect()
  await consumer.subscribe({ topics: await getTopics(), fromBeginning: false })

  // TODO: andranno aggiunte anche le regole inerenti alle camere
  console.log(await getSensorRules())
  securityRuleService.addSecurityRules(await getSensorRules())

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
          for (const rawValue of rawValues) {
            if (
              securityRuleService.checkExceedingDetection(
                environmentDataFactory.createEnvironmentData(
                  deviceIdFactory.createSensorId(rawValue._sourceDeviceId._code),
                  rawValue._value,
                  rawValue._measure,
                  rawValue._measureUnit,
                  new Date(rawValue._timestamp)
                )
              )
            ) {
              console.log("E' stata rilevata un'eccezione")
            } else {
              console.log('Non è stata rilevata nessuna eccezione')
            }
          }
        }
      }
    })
    .then(() => console.log('Consumer running'))
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
