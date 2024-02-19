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
import { IntrusionRule  } from 'domain/dist/domain/security-rule/core/IntrusionRule.js'
import { Camera} from "domain/dist/domain/device/core/Camera.js";
import { Device } from "domain/dist/domain/device/core/Device.js";
import { DeviceId } from "domain/dist/domain/device/core/DeviceId.js";
import { DeviceType } from "domain/dist/domain/device/core/impl/enum/DeviceType.js";
import {  Sensor } from "domain/dist/domain/device/core/Sensor.js";
import { DeviceTypeConverter } from "domain/dist/utils/DeviceTypeConverter.js"; //in questo caso devo solo controllare i topic per i quali sono interessato ovvero i devices che sono attivi in questo momento e che

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
  const monitoringUrl: string = `http://${monitoringHost}:${monitoringPort}`
  const topics: string[] = []
/*  const getCapturingSensors = async (): Promise<Sensor[]> => {
    const capturingSensors: Sensor[] = []
    try {
      const res: AxiosResponse = await RequestHelper.get(`${monitoringUrl}/devices/sensors`)
      for (const sensor of res.data) {
        if (sensor.isCapturing) {

        }
      }
      return capturingSensors
    } catch (e) {
      throw new Error('Error while getting devices infos')
    }
  }

  const getCapturingCameras = async (): Promise<Camera[]> => {
    const capturingCameras: Camera[] = []
    try {
      const res: AxiosResponse = await RequestHelper.get(`${monitoringUrl}/devices/cameras`)
      for (const camera of res.data) {
        if (camera.isCapturing) {
          capturingCameras.push(
            deviceFactory.createCamera(
              deviceIdFactory.createCameraId(camera._id.code),
              camera.isCapturing,
              camera.ipAddress,
              resolutionFactory.createResolution(camera.resolution.width, camera.resolution.height)
            )
          )
        }
      }
      return capturingCameras
    } catch (e) {
      throw new Error('Error while getting cameras infos')
    }
  }*/

  const getCapturingDevices = async (): Promise<Device[]> => {
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
            break;
          case DeviceType.CAMERA:
            capturingDevices.push(
              deviceFactory.createCamera(
                deviceIdFactory.createCameraId(device._id.code),
                device.isCapturing,
                device.ipAddress,
                resolutionFactory.createResolution(device.resolution.width, device.resolution.height)
              )
            )
            break;
        }
      }
      return capturingDevices
    } catch (e) {
      throw new Error('Error while getting devices infos')
    }
  }

  const capturingDevices: Device[] = await getCapturingDevices()

  const getSensorRules = async (): Promise<ExceedingRule[]> => {
    return securityRuleManager.getExceedingRules()
  }
  const sensorRules: ExceedingRule[] = await getSensorRules()

  const getCameraRules = async (): Promise<IntrusionRule[]> => {
    return securityRuleManager.getIntrusionRules()
  }

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
