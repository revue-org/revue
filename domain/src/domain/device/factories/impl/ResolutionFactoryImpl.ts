import { DeviceFactory } from '../DeviceFactory.js'
import { Sensor } from '../../core/Sensor.js'
import { Camera } from '../../core/Camera.js'
import { CameraImpl } from '../../core/impl/CameraImpl.js'
import { DeviceId } from '../../core/DeviceId.js'
import { Resolution } from '../../core/Resolution.js'
import { Measure } from '../../core/impl/enum/Measure.js'
import { SensorImpl } from '../../core/impl/SensorImpl.js'
import { ResolutionImpl } from '../../core/impl/ResolutionImpl'
import { EnvironmentDataImpl } from '../../core/impl/EnvironmentDataImpl'
import { EnvironmentData } from '../../core/EnvironmentData'
import { ResolutionFactory } from "../ResolutionFactory";

export class ResolutionFactoryImpl implements ResolutionFactory {
  createResolution(height: number, width: number): Resolution {
    return new ResolutionImpl(height, width)
  }
}