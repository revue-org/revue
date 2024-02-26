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
    MeasureUnitConverter.convertToMeasureUnit(environmentData.unit),
    new Date(environmentData.timestamp)
  )
}
