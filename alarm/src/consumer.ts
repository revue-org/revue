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
import { ExceedingRule, IntrusionRule } from 'domain/dist/domain/security-rule/core'
import { Camera, Sensor } from 'domain/dist/domain/device/core' //in questo caso devo solo controllare i topic per i quali sono interessato ovvero i devices che sono attivi in questo momento e che

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
  const getCapturingSensors = async (): Promise<Sensor[]> => {
    const capturingSensors: Sensor[] = []
    try {
      const res: AxiosResponse = await RequestHelper.get(`${monitoringUrl}/devices/sensors`)
      for (const sensor of res.data) {
        if (sensor.isCapturing) {
          capturingSensors.push(
            deviceFactory.createSensor(
              deviceIdFactory.createSensorId(sensor._id.code),
              sensor.isCapturing,
              sensor.ipAddress,
              sensor.intervalMillis,
              sensor.measures
            )
          )
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
  }

  const capturingSensors: Sensor[] = await getCapturingSensors()
  const capturingCameras: Camera[] = await getCapturingCameras()

  const getSensorRules = async (): Promise<ExceedingRule[]> => {
    return securityRuleManager.getExceedingRules()
  }
  const sensorRules: ExceedingRule[] = await getSensorRules()

  const getCameraRules = async (): Promise<IntrusionRule[]> => {
    return securityRuleManager.getIntrusionRules()
  }

  const cameraRules: IntrusionRule[] = await getCameraRules()

  capturingCameras.forEach((camera) => {
    cameraRules.forEach((rule) => {
      if (rule.deviceId.code === camera.deviceId.code) {
        topics.push(`CAMERA_${camera.deviceId.code}`)
      }
    })
  });

  capturingSensors.forEach((sensor) => {
    sensorRules.forEach((rule) => {
      if (rule.deviceId.code === sensor.deviceId.code) {
        topics.push(`SENSOR_${sensor.deviceId.code}`)
      }
    })
  });
  return topics
  /*
    capturingDevices.forEach((device) => {
      //if the device is capturing and the rule is active add to topic
  
      //if (device.isCapturing){}
  
  
    })*/

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
