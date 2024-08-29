import { CapabilityType } from '@/domain/core/capabilities/CapabilityType.js'
import { Measure } from '@common/domain/core/Measure.js'
import { SensoringCapability } from '@/domain/core/capabilities/SensoringCapability.js'
import { VideoStreamingCapability } from "@/domain/core/capabilities/VideoStreamingCapability.js";

export class CapabilityFactory {
  static sensoringCapabilityOf(capturingInterval: number, measure: Measure): SensoringCapability {
    return {
      type: CapabilityType.SENSOR,
      capturingInterval,
      measure
    }
  }

  static videoStreamingCapabilityOf(resolution: '576p' | '720p' | '1080p' | '4k'): VideoStreamingCapability {
    return {
      type: CapabilityType.VIDEO,
      resolution
    }
  }
}
