import { Consumer } from 'kafkajs'
import { AxiosResponse } from 'axios'
import { DeviceIdFactory } from 'domain/dist/domain/device/factories/DeviceIdFactory.js'
import { DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceFactory } from 'domain/dist/domain/device/factories/DeviceFactory.js'
import { DeviceFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceFactoryImpl.js'
import { ResolutionFactory } from 'domain/dist/domain/device/factories/ResolutionFactory.js'
import { ResolutionFactoryImpl } from 'domain/dist/domain/device/factories/impl/ResolutionFactoryImpl.js'
import { AnomalyFactory } from 'domain/dist/domain/alarm-system/factories/AnomalyFactory.js'
import { AnomalyFactoryImpl } from 'domain/dist/domain/alarm-system/factories/impl/AnomalyFactoryImpl.js'
import RequestHelper, {
  monitoringHost,
  monitoringPort,
  notificationHost,
  notificationPort
} from './utils/RequestHelper.js'
import { ExceedingRule } from 'domain/dist/domain/alarm-system/core/ExceedingRule.js'
import { IntrusionRule } from 'domain/dist/domain/alarm-system/core/IntrusionRule.js'
import { Device } from 'domain/dist/domain/device/core/Device.js'
import { DeviceType } from 'domain/dist/domain/device/core/impl/enum/DeviceType.js'
import { DeviceTypeConverter } from 'domain/dist/utils/DeviceTypeConverter.js'
import { EnvironmentDataFactory } from 'domain/dist/domain/device/factories/EnvironmentDataFactory.js'
import { EnvironmentDataFactoryImpl } from 'domain/dist/domain/device/factories/impl/EnvironmentDataFactoryImpl.js'
import kafkaManager from './utils/KafkaManager.js'
import { Exceeding } from 'domain/dist/domain/alarm-system/core/Exceeding.js'
import { anomalyService, securityRuleService } from './init.js'
import { DeviceId } from 'domain/dist/domain/device/core/DeviceId.js'
import { MeasureConverter } from 'domain/dist/utils/MeasureConverter.js'
import { ObjectClassConverter } from 'domain/dist/utils/ObjectClassConverter.js'
import { Anomaly } from 'domain/dist/domain/alarm-system/core/Anomaly.js'
import { Intrusion } from 'domain/dist/domain/alarm-system/core/Intrusion.js'
import { ObjectClass } from 'domain/dist/domain/alarm-system/core/impl/enum/ObjectClass.js'
import { Contact } from 'domain/dist/domain/monitoring/core/Contact.js'
import { ContactTypeConverter } from 'domain/dist/utils/ContactTypeConverter.js'

const consumer: Consumer = kafkaManager.createConsumer('alarmConsumer')
const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()
const environmentDataFactory: EnvironmentDataFactory = new EnvironmentDataFactoryImpl()
const anomalyFactory: AnomalyFactory = new AnomalyFactoryImpl()

export const setupConsumer = async (): Promise<void> => {
  await consumer.connect()
  await consumer.subscribe({ topics: await getTopics(), fromBeginning: false })

  await securityRuleService.getExceedingRules()
  await securityRuleService.getIntrusionRules()

  consumer
    .run({
      eachMessage: async ({ topic, message }): Promise<void> => {
        if (message.value === null) return
        const messageValue: Buffer = message.value

        console.log('Arrived message', messageValue.toString())
        const rawValues = JSON.parse(messageValue.toString())
        if (topic.startsWith('CAMERA')) {
          const objectClass: ObjectClass = ObjectClassConverter.convertToObjectClass(
            rawValues.objectClass.toUpperCase()
          )
          const timestamp: Date = new Date(rawValues.timestamp)
          const cameraId: DeviceId = deviceIdFactory.createCameraId(topic.split('_')[1])
          if (await securityRuleService.checkIntrusionDetection(cameraId, objectClass, timestamp)) {
            console.log('Intrusion detected!')
            const intrusion: Intrusion = anomalyFactory.createIntrusion(cameraId, timestamp, objectClass, '')
            intrusion.anomalyId = await anomalyService.insertIntrusion(intrusion)
            await sendNotification(intrusion, await securityRuleService.getContactsToNotify(intrusion))
          }
        } else if (topic.startsWith('SENSOR')) {
          for (const rawValue of rawValues) {
            if (
              await securityRuleService.checkExceedingDetection(
                environmentDataFactory.createEnvironmentData(
                  deviceIdFactory.createSensorId(rawValue._sourceDeviceId._code),
                  rawValue._value,
                  rawValue._measure,
                  rawValue._measureUnit,
                  new Date(rawValue._timestamp)
                )
              )
            ) {
              console.log('Exceeding value detected!')
              const exceeding: Exceeding = anomalyFactory.createExceeding(
                deviceIdFactory.createSensorId(rawValue._sourceDeviceId._code),
                new Date(rawValue._timestamp),
                rawValue._measure,
                rawValue._value,
                '' // TODO: check for the default value, it seems to not work
              )
              exceeding.anomalyId = await anomalyService.insertExceeding(exceeding)
              try {
                await sendNotification(exceeding, await securityRuleService.getContactsToNotify(exceeding))
              } catch (e) {
                console.log('Error while trying to send notification')
              }
            } else {
              console.log('No anomaly detected')
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
  const sensorRules: ExceedingRule[] = await securityRuleService.getExceedingRules()
  const cameraRules: IntrusionRule[] = await securityRuleService.getIntrusionRules()

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

const sendNotification = async (anomaly: Anomaly, contacts: Contact[]): Promise<void> => {
  let url: string = `http://${notificationHost}:${notificationPort}`
  let body: any = {}
  switch (anomaly.deviceId.type) {
    case DeviceType.SENSOR:
      url = url + '/notifications/exceedings'
      body = {
        anomalyId: anomaly.anomalyId,
        deviceId: {
          type: DeviceTypeConverter.convertToString(anomaly.deviceId.type),
          code: anomaly.deviceId.code
        },
        measure: MeasureConverter.convertToString((anomaly as Exceeding).measure),
        value: (anomaly as Exceeding).value,
        contacts: contacts.map((contact: Contact) => {
          return {
            type: ContactTypeConverter.convertToString(contact.type),
            value: contact.value
          }
        })
      }
      break
    case DeviceType.CAMERA:
      url = url + '/notifications/intrusions'
      body = {
        anomalyId: anomaly.anomalyId,
        deviceId: {
          type: DeviceTypeConverter.convertToString(anomaly.deviceId.type),
          code: anomaly.deviceId.code
        },
        intrusionObject: ObjectClassConverter.convertToString((anomaly as Intrusion).intrusionObject),
        contacts: contacts.map((contact: Contact) => {
          return {
            type: ContactTypeConverter.convertToString(contact.type),
            value: contact.value
          }
        })
      }
      break
  }
  try {
    await RequestHelper.post(url, body)
  } catch (e) {
    throw new Error('Error while posting notification')
  }
}
