import { type Measurement } from 'common/dist/domain/core'
import { MeasureFactory, MeasurementFactory } from 'common/dist/domain/factories'

export const composeMeasurement = (measurement: any): Measurement => {
  return MeasurementFactory.numericMeasurementFrom(
    MeasurementFactory.idOf(measurement.id),
    new Date(measurement.timestamp),
    measurement.sourceDeviceId,
    MeasureFactory.createMeasure(measurement.measure.type, measurement.measure.unit),
    measurement.value
  )
}

/*
import { type EnvironmentData } from 'domain/dist/domain/device/core'
import {
  type DeviceIdFactory,
  DeviceIdFactoryImpl,
  type EnvironmentDataFactory,
  EnvironmentDataFactoryImpl
} from 'domain/dist/domain/device/factories'
import { MeasureConverter, MeasureUnitConverter } from 'domain/dist/utils'

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const environmentDataFactory: EnvironmentDataFactory = new EnvironmentDataFactoryImpl()

export const composeEnvironmentData = (environmentData: any): EnvironmentData => {
  return environmentDataFactory.createEnvironmentData(
    deviceIdFactory.createSensorId(environmentData.deviceId.code),
    environmentData.value,
    MeasureConverter.convertToMeasure(environmentData.measure),
    MeasureUnitConverter.convertToMeasureUnit(environmentData.measureUnit),
    new Date(environmentData.timestamp)
  )
}
*/
