import RequestHelper, { deviceHost, devicePort } from '@common/utils/RequestHelper.js'
import KafkaProducer from '@common/infrastructure/events/KafkaProducer.js'
import { Measurement } from '@common/domain/core/Measurement.js'
import { MeasurementFactory } from '@common/domain/factories/MeasurementFactory.js'
import { MeasureFactory } from '@common/domain/factories/MeasureFactory.js'

import { KafkaOptions } from '@common/infrastructure/events/KafkaOptions.js'
import { MeasureUnit } from '@common/domain/core/MeasureUnit.js'

const SENSOR_ID = process.env.SENSOR_ID_1

if (SENSOR_ID === undefined) {
  console.log('No device id provided')
  process.exit(1)
}

let sensor: any

export const getSensorInfo = async (): Promise<void> => {
  const deviceUrl: string = `http://${deviceHost}:${devicePort}`
  try {
    const res = await RequestHelper.get(`${deviceUrl}/${SENSOR_ID}`)
    console.log('INFO: SENSOR INFO RETRIEVED')
    console.log(res.data)
    sensor = res.data
    // console.log('INFO: SENSOR INFO RETRIEVED')
  } catch (e) {
    console.log(e)
    throw new Error('Error while getting sensor info')
  }
}

let kafkaHost: string = process.env.KAFKA_HOST!
let kafkaPort: string = process.env.KAFKA_PORT!

if (process.env.NODE_ENV == 'develop') {
  console.log('INFO: SETTING UP KAFKA FOR DEVELOPMENT')
  kafkaHost = process.env.KAFKA_EXTERNAL_HOST!
  kafkaPort = process.env.KAFKA_EXTERNAL_PORT!
}

const kafkaOptions: KafkaOptions = {
  clientId: 'sensor',
  brokers: [{ host: kafkaHost, port: kafkaPort }]
}

export const produce = async (): Promise<void> => {
  const producer: KafkaProducer = new KafkaProducer(kafkaOptions)
  setInterval(async (): Promise<void> => {
    const measurement: Measurement = MeasurementFactory.createNumericMeasurement(
      new Date(),
      sensor.deviceId.value,
      MeasureFactory.createTemperatureMeasure(MeasureUnit.CELSIUS),
      Math.floor(Math.random() * 30)
    )
    producer.produce(`measurements.${sensor.deviceId.value}`, measurement)
  }, 2000)

  setInterval(async (): Promise<void> => {
    const measurement: Measurement = MeasurementFactory.createNumericMeasurement(
      new Date(),
      sensor.deviceId.value,
      MeasureFactory.createHumidityMeasure(MeasureUnit.PERCENTAGE),
      Math.floor(Math.random() * 100)

    )
    producer.produce(`measurements.${sensor.deviceId.value}`, measurement)
  }, 2000)

  setInterval(async (): Promise<void> => {
    const measurement: Measurement = MeasurementFactory.createNumericMeasurement(
      new Date(),
      sensor.deviceId.value,
      MeasureFactory.createPressureMeasure(MeasureUnit.BAR),
      Math.floor(Math.random() * 20)

    )
    producer.produce(`measurements.${sensor.deviceId.value}`, measurement)
  }, 2000)
}

export const stopProduce = async (): Promise<void> => {
  console.log('INFO: STOPPING PRODUCER')
  process.exit(0)
}
