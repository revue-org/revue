import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { MeasureUnit } from '@domain/device/core/impl/enum/MeasureUnit.js'
import type { Sensor } from '@domain/device/core/Sensor.js'
import type { EnvironmentData } from '@domain/device/core/EnvironmentData.js'
import { DeviceFactoryImpl } from '@domain/device/factories/impl/DeviceFactoryImpl.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { EnvironmentDataFactoryImpl } from '@domain/device/factories/impl/EnvironmentDataFactoryImpl.js'
import { MeasureConverter } from '@utils/MeasureConverter.js'
import RequestHelper, { monitoringHost, monitoringPort } from './utils/RequestHelper.js'
import { Kafka, Partitioners, Producer } from 'kafkajs'
import { AxiosResponse, HttpStatusCode } from 'axios'

if (process.env.SENSOR_CODE === undefined && process.env.NODE_ENV !== 'develop') {
  console.log('No sensor code provided')
  process.exit(1)
}
const SENSOR_CODE: string = process.env.SENSOR_CODE || 'sen-01'

let sourceDevice: Sensor

export const getSensorInfo = async (): Promise<void> => {
  const monitoringUrl: string = `http://${monitoringHost}:${monitoringPort}`

  const res: AxiosResponse = await RequestHelper.get(`${monitoringUrl}/devices/sensors/${SENSOR_CODE}`)
  console.log('Response:', res.data)
  if (res.status !== HttpStatusCode.Ok) throw new Error('Error while getting sensor info')
  sourceDevice = new DeviceFactoryImpl().createSensor(
    new DeviceIdFactoryImpl().createSensorId(res.data._id.code),
    false,
    res.data.ipAddress,
    res.data.intervalMillis,
    res.data.measures.map((measure: any) => {
      return MeasureConverter.convertToMeasure(measure)
    })
  )
  console.log(sourceDevice)
}

const kafkaContainer: string = process.env.KAFKA_CONTAINER || 'revue-kafka'
const kafkaPort: string = process.env.KAFKA_PORT || '9092'

const kafka: Kafka = new Kafka({
  clientId: `SENSOR_${SENSOR_CODE}`,
  brokers: [`${kafkaContainer}:${kafkaPort}`]
})

const environmentDataFactory = new EnvironmentDataFactoryImpl()

export const produce = async (): Promise<void> => {
  const producer: Producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
  await producer.connect()
  let index: number = 0
  let values: EnvironmentData[] = []
  setInterval(async (): Promise<void> => {
    values = []
    for (const measure of sourceDevice.measures) {
      values.push(
        environmentDataFactory.createEnvironmentData(
          sourceDevice.deviceId,
          generateRandomValue(measure),
          measure,
          getMeasureUnit(measure),
          new Date()
        )
      )
    }
    await producer.send({
      topic: `SENSOR_${sourceDevice.deviceId.code}`,
      messages: [
        {
          value: JSON.stringify(values),
          key: String(index)
        }
      ]
    })
    console.log(`Message ${index} sent`)
    index++
  }, sourceDevice.intervalMillis)
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
      return parseFloat((Math.random() * (25 - 20) + 20).toFixed(2))
    case Measure.HUMIDITY:
      return parseFloat((Math.random() * (60 - 40) + 40).toFixed(2))
    case Measure.PRESSURE:
      return parseFloat((Math.random() * (1000 - 900) + 900).toFixed(2))
    default:
      throw new Error('Measure unit not found')
  }
}
