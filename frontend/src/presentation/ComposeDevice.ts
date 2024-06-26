import type { Sensor } from '@/domain/core/Sensor'

export const composeSensor = (sensor: any): Sensor => {
  return {
    deviceId: sensor.deviceId.value,
    description: sensor.description,
    endpoint: sensor.endpoint.ipAddress + ':' + sensor.endpoint.port,
    isEnabled: sensor.isEnabled,
    locationId: sensor.locationId
  }
}


/*
import { type Camera, Measure, type Sensor } from 'domain/dist/domain/device/core'
import { MeasureConverter } from 'domain/dist/utils'
import {
  type DeviceFactory,
  DeviceFactoryImpl,
  type DeviceIdFactory,
  DeviceIdFactoryImpl,
  type ResolutionFactory,
  ResolutionFactoryImpl
} from 'domain/dist/domain/device/factories'

const deviceIdFactory: DeviceIdFactory = new DeviceIdFactoryImpl()
const deviceFactory: DeviceFactory = new DeviceFactoryImpl()
const resolutionFactory: ResolutionFactory = new ResolutionFactoryImpl()

export const composeSensor = (sensor: any): Sensor => {
  return deviceFactory.createSensor(
    deviceIdFactory.createSensorId(sensor._id.code),
    sensor.isCapturing,
    sensor.ipAddress,
    sensor.intervalMillis,
    composeMeasure(sensor.measures)
  )
}

export const composeCamera = (camera: any): Camera => {
  return deviceFactory.createCamera(
    deviceIdFactory.createCameraId(camera._id.code),
    camera.isCapturing,
    camera.ipAddress,
    resolutionFactory.createResolution(camera.resolution.width, camera.resolution.height)
  )
}

export function composeMeasure(measures: any): Measure[] {
  return measures.map((measure: any) => {
    return MeasureConverter.convertToMeasure(measure)
  })
}
*/
