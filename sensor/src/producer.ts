import { Kafka, Partitioners, Producer } from 'kafkajs'

import type { EnvironmentDataFactory } from '@domain/device/factories/EnvironmentDataFactory.js'
import type { EnvironmentData } from '@domain/device/core/EnvironmentData.js'
import { EnvironmentDataFactoryImpl } from '@domain/device/factories/impl/EnvironmentDataFactoryImpl.js'
import { DeviceIdFactoryImpl } from '@domain/device/factories/impl/DeviceIdFactoryImpl.js'
import { DeviceFactoryImpl } from '@domain/device/factories/impl/DeviceFactoryImpl.js'
import { Measure } from '@domain/device/core/impl/enum/Measure.js'
import { MeasureUnit } from '@domain/device/core/impl/enum/MeasureUnit.js'
import { Sensor } from '@domain/device/core/Sensor.js'

if (process.env.SENSOR_CODE === undefined && process.env.NODE_ENV !== 'develop') {
  console.log('No sensor code provided')
  process.exit(1)
}
const SENSOR_CODE: string = process.env.SENSOR_CODE || 'sen-01'

const kafkaContainer: string = process.env.KAFKA_CONTAINER || 'revue-kafka'
const kafkaPort: string = process.env.KAFKA_PORT || '9092'

const kafka: Kafka = new Kafka({
  clientId: `SENSOR-${SENSOR_CODE}`,
  brokers: [`${kafkaContainer}:${kafkaPort}`]
})

const environmentDataFactory: EnvironmentDataFactory = new EnvironmentDataFactoryImpl()
const sourceDevice: Sensor = new DeviceFactoryImpl().createSensor(
  new DeviceIdFactoryImpl().createSensorId(SENSOR_CODE),
  '192.168.1.90',
  1000,
  [Measure.TEMPERATURE, Measure.HUMIDITY]
)

export const produce = async (): Promise<void> => {
  const producer: Producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })
  await producer.connect()
  let index: number = 0

  setInterval(async (): Promise<void> => {
    for (const measure of sourceDevice.measures) {
      const data: EnvironmentData = environmentDataFactory.createEnvironmentData(
        sourceDevice.deviceId,
        generateRandomValue(measure),
        measure,
        getMeasureUnit(measure),
        new Date()
      )
      console.log(`Sending ${data.measure} ${data.value} ${data.measureUnit}`)
      await producer.send({
        topic: `SENSOR_${sourceDevice.deviceId.code}`,
        messages: [
          {
            value: JSON.stringify(data),
            key: String(index)
          }
        ]
      })
      index++
    }
  }, sourceDevice.intervalMillis)
  console.log('Sending image ' + index)
  console.log(`SENSOR_${SENSOR_CODE}`)
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
