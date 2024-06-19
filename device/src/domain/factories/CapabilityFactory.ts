import { CapabilityType } from '@/domain/core/capabilities/CapabilityType'
import { Measure } from '@common/domain/core/Measure'
import { SensoringCapability } from '@/domain/core/capabilities/SensoringCapability'

export class CapabilityFactory {
  static sensoringCapabilityOf(capturingInterval: number, measure: Measure): SensoringCapability {
    return {
      type: CapabilityType.SENSOR,
      capturingInterval,
      measure
    }
  }

  static videoStreamingCapabilityOf(resolution: '720p' | '1080p' | '4k') {
    return {
      type: CapabilityType.VIDEO,
      resolution
    }
  }
}
