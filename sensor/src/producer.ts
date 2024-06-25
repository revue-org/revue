import RequestHelper, { deviceHost, devicePort } from '@common/utils/RequestHelper.js'
import KafkaProducer from '@common/infrastructure/events/KafkaProducer.js'
import { Measurement } from '@common/domain/core/Measurement.js'
import { MeasurementFactory } from '@common/domain/factories/MeasurementFactory.js'
import { MeasureFactory } from '@common/domain/factories/MeasureFactory.js'

import { KafkaOptions } from '@common/infrastructure/events/KafkaOptions.js'
import { MeasureUnit } from '@common/domain/core/MeasureUnit.js'

const SENSOR_CODE = process.env.SENSOR_CODE

if (SENSOR_CODE === undefined) {
  console.log('No sensor code provided')
  process.exit(1)
}

let sensor: any

export const getSensorInfo = async (): Promise<void> => {
  const deviceUrl: string = `http://${deviceHost}:${devicePort}`
  try {
    console.log(`${deviceUrl}/${SENSOR_CODE}`)
    const res = await RequestHelper.get(`${deviceUrl}/${SENSOR_CODE}`)
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
  await producer.start()
  setInterval(async (): Promise<void> => {
    const measurement: Measurement = MeasurementFactory.createNumericMeasurement(
      new Date(),
      sensor.deviceId.value,
      MeasureFactory.createTemperatureMeasure(MeasureUnit.CELSIUS),
      25
    )
    producer.produce(`measurements.${sensor.deviceId.value}`, measurement)
  }, 2000)
}

// const getMeasureUnit = (measure: Measure): MeasureUnit => {
//   switch (measure) {
//     case MeasureType.TEMPERATURE:
//       return MeasureUnit.CELSIUS
//     case MeasureType.HUMIDITY:
//       return MeasureUnit.PERCENTAGE
//     case MeasureType.PRESSURE:
//       return MeasureUnit.BAR
//     default:
//       throw new Error('Measure unit not found')
//   }
// }
//
// const generateRandomValue = (measure: Measure): number => {
//   switch (measure) {
//     case MeasureType.TEMPERATURE:
//       return parseFloat((Math.random() * (24.5 - 24) + 24).toFixed(2))
//     case MeasureType.HUMIDITY:
//       return parseFloat((Math.random() * (56 - 55) + 55).toFixed(2))
//     case MeasureType.PRESSURE:
//       return parseFloat((Math.random() * (1000 - 980) + 980).toFixed(2))
//     default:
//       throw new Error('Measure unit not found')
//   }
// }
