import { Measure } from 'domain/dist/domain/device/core/impl/enum/Measure.js'
import { MeasureUnit } from 'domain/dist/domain/device/core/impl/enum/MeasureUnit.js'
import type { Sensor } from 'domain/dist/domain/device/core/Sensor.js'
import type { EnvironmentData } from 'domain/dist/domain/device/core/EnvironmentData.js'
import { DeviceFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceFactoryImpl.js'
import { DeviceIdFactoryImpl } from 'domain/dist/domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { EnvironmentDataFactoryImpl } from 'domain/dist/domain/device/factories/impl/EnvironmentDataFactoryImpl.js'
import { MeasureConverter } from 'domain/dist/utils/MeasureConverter.js'
import RequestHelper, { monitoringHost, monitoringPort } from './utils/RequestHelper.js'
import { Kafka, Partitioners, Producer } from 'kafkajs'
import { AxiosResponse } from 'axios'

const SENSOR_CODE = process.env.SENSOR_CODE

if (SENSOR_CODE === undefined) {
  console.log('No sensor code provided')
  process.exit(1)
}

let sourceSensor: Sensor

export const getSensorInfo = async (): Promise<void> => {
  const monitoringUrl: string = `http://${monitoringHost}:${monitoringPort}`
  try {
    const res: AxiosResponse = await RequestHelper.get(`${monitoringUrl}/devices/sensors/${SENSOR_CODE}`)
    sourceSensor = new DeviceFactoryImpl().createSensor(
      new DeviceIdFactoryImpl().createSensorId(res.data._id.code),
      false,
      res.data.ipAddress,
      res.data.intervalMillis,
      res.data.measures.map((measure: any) => {
        return MeasureConverter.convertToMeasure(measure)
      })
    )
    console.log('INFO: SENSOR INFO RETRIEVED')
  } catch (e) {
    console.log(e)
    throw new Error('Error while getting sensor info')
  }
}

let kafkaHost: string = process.env.KAFKA_HOST || 'revue-kafka'
let kafkaPort: string = process.env.KAFKA_PORT || '9092'

if (process.env.NODE_ENV == 'develop') {
  console.log('INFO: SETTING UP KAFKA FOR DEVELOPMENT')
  kafkaHost = process.env.KAFKA_EXTERNAL_HOST || 'localhost'
  kafkaPort = process.env.KAFKA_EXTERNAL_PORT || '9094'
}

const kafka: Kafka = new Kafka({
  clientId: `SENSOR_${SENSOR_CODE}`,
  brokers: [`${kafkaHost}:${kafkaPort}`]
})

const environmentDataFactory = new EnvironmentDataFactoryImpl()

export const produce = async (): Promise<void> => {
  const producer: Producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
  await producer.connect()
  let values: EnvironmentData[] = []
  setInterval(async (): Promise<void> => {
    values = []
    for (const measure of sourceSensor.measures) {
      values.push(
        environmentDataFactory.createEnvironmentData(
          sourceSensor.deviceId,
          generateRandomValue(measure),
          measure,
          getMeasureUnit(measure),
          new Date()
        )
      )
    }
    await producer.send({
      topic: `SENSOR_${sourceSensor.deviceId.code}`,
      messages: [
        {
          value: JSON.stringify(values)
        }
      ]
    })
  }, sourceSensor.intervalMillis)
}

const getMeasureUnit = (measure: Measure): MeasureUnit => {
  switch (measure) {
    case Measure.TEMPERATURE:
      return MeasureUnit.CELSIUS
    case Measure.HUMIDITY:
      return MeasureUnit.PERCENTAGE
    case Measure.PRESSURE:
      return MeasureUnit.BAR
    default:
      throw new Error('Measure unit not found')
  }
}

const generateRandomValue = (measure: Measure): number => {
  switch (measure) {
    case Measure.TEMPERATURE:
      return parseFloat((Math.random() * (24.5 - 24) + 24).toFixed(2))
    case Measure.HUMIDITY:
      return parseFloat((Math.random() * (56 - 55) + 55).toFixed(2))
    case Measure.PRESSURE:
      return parseFloat((Math.random() * (1000 - 980) + 980).toFixed(2))
    default:
      throw new Error('Measure unit not found')
  }
}
